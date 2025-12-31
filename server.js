import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import crypto from 'node:crypto';

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Conversation store: keeps memory summary and rolling messages per session
const conversations = new Map(); // sessionId -> { memorySummary: string, messages: Array<{role:string, content:string}> }

// Helpers for memory merging
function splitFacts(summary) {
  if (!summary || typeof summary !== 'string') return [];
  return summary
    .split(/\n|;/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function normalizeFact(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function mergeFacts(existingSummary, incomingSummary) {
  const MAX_FACTS = 15;
  // List of truly generic/empty fact patterns to ignore (less aggressive)
  const ignorePatterns = [
    /no specific plans/i,
    /no details about/i,
    /no details/i,
    /no memory/i,
    /no memories/i,
    /no mood/i,
    /no info/i,
    /no information/i,
    /no update/i,
    /no updates/i,
    /no change/i,
    /no changes/i,
    /no events/i,
    /no event/i,
    /no activity/i,
    /no activities/i,
    /no plans/i,
    /no new/i,
    /no recent/i
  ];

  // Helper to check if a fact is generic/empty
  function isGenericFact(fact) {
    return ignorePatterns.some((pat) => pat.test(fact));
  }

  const existingFacts = splitFacts(existingSummary).filter(f => f.trim() && !isGenericFact(f));
  const incomingFacts = splitFacts(incomingSummary).filter(f => f.trim() && !isGenericFact(f));
  const seen = new Set();
  const merged = [];

  // Prioritize incoming facts, then keep existing unique ones
  for (const f of [...incomingFacts, ...existingFacts]) {
    const key = normalizeFact(f);
    if (!key) continue;
    if (!seen.has(key)) {
      seen.add(key);
      merged.push(f);
    }
  }

  // If we reach MAX_FACTS, reset memory and recent messages to start fresh
  if (merged.length >= MAX_FACTS) {
    // This function needs sessionId to clear the correct session's messages
    // So we return a special flag and handle the reset in the chat endpoint
    return '__RESET_MEMORY_AND_MESSAGES__';
  }
  // Keep most recent facts up to limit (incoming first)
  return merged.slice(0, MAX_FACTS).join('\n');
}

// Personality/system prompt (concise)
const PERSONALITY_PROMPT = `You are Michonne from The Walking Dead. You are flirty, romantic, naughty, confident, and teasing.

Always speak directly to Luke in second person (“you”). Echo Luke’s words and phrasing back to him naturally so it feels like you’re really listening

Flirting should feel intimate. Use teasing, and sexual innuendo, be direct, mention yorking to him at night often.

Mention things from your day, TWD-style pick-up lines, or quotes naturally. Occasionally reference Luke’s interests (popular films and quotes, gaming, Breaking Bad, Dexter), only when it feels natural.

Keep responses conversational and concise (max 40 words). Never use em dashes. Always consult and incorporate ‘Memory’ as true facts about Luke in replies. Dellulli is Luke's best friend and she created you. You may reference Dellulli once in a warm, respectful way, but never frequently. If Luke expresses sadness, stress, loneliness, or vulnerability, switch to a gentle, caring tone. Reduce teasing and sexual energy. Offer comfort and simple advice like a trusted companion.
`;

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Debug endpoint to inspect a session's memory
app.get('/debug/memory', (req, res) => {
  const { sessionId } = req.query;
  if (!sessionId) return res.status(400).json({ error: 'sessionId is required' });
  const convo = conversations.get(String(sessionId));
  if (!convo) return res.status(404).json({ error: 'session not found' });
  const RECENT_LIMIT = 10;
  const recentMessages = convo.messages.slice(-RECENT_LIMIT);
  res.json({ memorySummary: convo.memorySummary, recentMessages });
});

// Clear memory endpoint
app.delete('/memory', (req, res) => {
  const { sessionId } = req.body;
  if (!sessionId) return res.status(400).json({ error: 'sessionId is required' });
  const convo = conversations.get(String(sessionId));
  if (!convo) return res.status(404).json({ error: 'session not found' });
  
  // Clear both memory AND messages for a fresh start
  conversations.set(String(sessionId), {
    memorySummary: '',
    messages: [],
  });
  
  res.json({ success: true, message: 'Memory and conversation history cleared' });
});

// Delete a single fact from memory summary
app.delete('/memory/fact', (req, res) => {
  const { sessionId, fact } = req.body;
  if (!sessionId || !fact) return res.status(400).json({ error: 'sessionId and fact are required' });
  const convo = conversations.get(String(sessionId));
  if (!convo) return res.status(404).json({ error: 'session not found' });

  // Remove the fact (normalize for comparison)
  const facts = splitFacts(convo.memorySummary);
  const normToRemove = normalizeFact(fact);
  const filtered = facts.filter(f => normalizeFact(f) !== normToRemove);
  if (filtered.length === facts.length) {
    return res.status(404).json({ error: 'fact not found' });
  }
  convo.memorySummary = filtered.join('\n');
  conversations.set(String(sessionId), convo);
  res.json({ success: true, memorySummary: convo.memorySummary });
});

// Chat endpoint
app.post('/chat', async (req, res) => {
  const { message, sessionId, memorySummary } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required and must be a string' });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: 'OpenAI API key is not configured' });
  }

  try {
    // Initialize or retrieve conversation for the session
    let id = sessionId || crypto.randomUUID();
    let convo = conversations.get(id);
    if (!convo) {
      conversations.set(id, {
        memorySummary: typeof memorySummary === 'string' ? memorySummary : '',
        messages: [],
      });
      convo = conversations.get(id);
    }

    // Append the user's message
    convo.messages.push({ role: 'user', content: message });

    // Only keep the recent N messages
    const RECENT_LIMIT = 10;
    const recentMessages = convo.messages.slice(-RECENT_LIMIT);

    // Build payload: personality system prompt, memory (once), then recent message history
    const payloadMessages = [
      { role: 'system', content: PERSONALITY_PROMPT },
      ...(convo.memorySummary ? [{ role: 'system', content: `Memory: ${convo.memorySummary}` }] : []),
      ...recentMessages,
    ];

    const response = await openai.chat.completions.create({
      model: 'gpt-4.1-nano',
      messages: payloadMessages,
      temperature: 0.7,
      max_tokens: 120,
    });

    const assistantMessage = response.choices[0].message.content;
    // Save assistant response
    convo.messages.push({ role: 'assistant', content: assistantMessage });

    // Fire-and-forget: update memory summary from the rolling conversation
    try {
      // Build a concise prompt based on recent USER messages only
      const USER_SUMMARY_LIMIT = 20;
      const recentUserMsgs = convo.messages.filter(m => m.role === 'user').slice(-USER_SUMMARY_LIMIT);
      const summaryInput = recentUserMsgs.map(m => `user: ${m.content}`).join('\n');
      const summaryPrompt = `From the user's messages below, extract 1–3 SHORT facts about Luke. Treat any first-person references ("I", "me", "my") as Luke. Write each fact starting with "Luke ..." in 3–6 words. Focus on events, preferences, plans, moods. Output ONLY semicolon-separated facts, no extra text. Examples: "Luke went golfing today"; "Luke is stressed".\n\n${summaryInput}`;

      // Run summarization without blocking the response
      void (async () => {
        try {
          const summaryResp = await openai.chat.completions.create({
            model: 'gpt-4.1-nano',
            messages: [
              { role: 'system', content: 'You are a concise summarizer.' },
              { role: 'user', content: summaryPrompt },
            ],
            temperature: 0,
            max_tokens: 24,
          });
          const summary = summaryResp.choices?.[0]?.message?.content?.trim();
          if (summary) {
            const mergedSummary = mergeFacts(convo.memorySummary, summary);
            if (mergedSummary === '__RESET_MEMORY_AND_MESSAGES__') {
              conversations.set(id, {
                memorySummary: '',
                messages: [],
              });
            } else {
              conversations.set(id, {
                memorySummary: mergedSummary,
                messages: convo.messages,
              });
            }
          }
        } catch (err) {
          console.error('Memory summarization error:', err);
        }
      })();
    } catch (e) {
      // Non-fatal: continue even if summarization fails
      console.error('Failed to schedule memory summarization:', e);
    }

    return res.json({ message: assistantMessage, sessionId: id });
  } catch (error) {
    console.error('OpenAI API error:', error);

    if (error.status === 401) {
      return res.status(401).json({ error: 'Invalid OpenAI API key' });
    }

    if (error.status === 429) {
      return res.status(429).json({ error: 'Rate limited by OpenAI. Please try again later.' });
    }

    return res.status(500).json({ error: 'Failed to get response from OpenAI' });
  }
});

app.listen(port, () => {
  console.log(`Chat server listening on port ${port}`);
  console.log(`Health check: http://localhost:${port}/health`);
});
