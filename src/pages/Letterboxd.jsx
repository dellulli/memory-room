  // Whiteboard gallery: fixed random order for photos/videos, house images grouped and ordered
  const whiteboardHouse = [
    'whiteboard_house1.webp',
    'whiteboard_house2.png',
    'whiteboard_house3.png'
  ];
  // All other photos (excluding house images)
  const whiteboardPhotos = [
    'whiteboard_1.png','whiteboard_2.png','whiteboard_3.webp','whiteboard_4.webp','whiteboard_5.webp','whiteboard_6.webp','whiteboard_7.webp','whiteboard_8.webp','whiteboard_9.webp','whiteboard_10.webp','whiteboard_11.webp','whiteboard_12.webp','whiteboard_13.webp','whiteboard_14.webp','whiteboard_15.webp','whiteboard_17.webp','whiteboard_18.webp','whiteboard_19.webp','whiteboard_20.webp','whiteboard_21.webp','whiteboard_22.webp','whiteboard_23.webp','whiteboard_24.webp','whiteboard_25.webp','whiteboard_26.webp','whiteboard_27.webp','whiteboard_28.webp','whiteboard_29.webp','whiteboard_30.webp','whiteboard_31.webp','whiteboard_32.webp','whiteboard_33.png','whiteboard_34.png','whiteboard_35.png','whiteboard_36.png','whiteboard_37.png'
  ];
  const whiteboardVideos = [
    'whiteboardvid_1.mov','whiteboardvid_2.mov','whiteboardvid_3.mov'
  ];
  // Fixed random order for photos/videos (not numbered order, but fixed in code)
  const whiteboardRandomOrder = [
    { type: 'image', name: 'whiteboard_8.webp' },
    { type: 'video', name: 'whiteboardvid_2.mov' },
    { type: 'image', name: 'whiteboard_19.webp' },
    { type: 'image', name: 'whiteboard_27.webp' },
    { type: 'video', name: 'whiteboardvid_1.mov' },
    { type: 'image', name: 'whiteboard_2.png' },
    { type: 'image', name: 'whiteboard_24.webp' },
    { type: 'image', name: 'whiteboard_36.png' },
    { type: 'image', name: 'whiteboard_10.webp' },
    { type: 'video', name: 'whiteboardvid_3.mov' },
    { type: 'image', name: 'whiteboard_31.webp' },
    { type: 'image', name: 'whiteboard_12.webp' },
    { type: 'image', name: 'whiteboard_22.webp' },
    { type: 'image', name: 'whiteboard_33.png' },
    { type: 'image', name: 'whiteboard_18.webp' },
    { type: 'image', name: 'whiteboard_7.webp' },
    { type: 'image', name: 'whiteboard_25.webp' },
    { type: 'image', name: 'whiteboard_13.webp' },
    { type: 'image', name: 'whiteboard_29.webp' },
    { type: 'image', name: 'whiteboard_3.webp' },
    { type: 'image', name: 'whiteboard_21.webp' },
    { type: 'image', name: 'whiteboard_32.webp' },
    { type: 'image', name: 'whiteboard_5.webp' },
    { type: 'image', name: 'whiteboard_14.webp' },
    { type: 'image', name: 'whiteboard_23.webp' },
    { type: 'image', name: 'whiteboard_28.webp' },
    { type: 'image', name: 'whiteboard_9.webp' },
    { type: 'image', name: 'whiteboard_20.webp' },
    { type: 'image', name: 'whiteboard_11.webp' },
    { type: 'image', name: 'whiteboard_26.webp' },
    { type: 'image', name: 'whiteboard_4.webp' },
    { type: 'image', name: 'whiteboard_15.webp' },
    { type: 'image', name: 'whiteboard_17.webp' },
    { type: 'image', name: 'whiteboard_30.webp' },
    { type: 'image', name: 'whiteboard_35.png' },
    { type: 'image', name: 'whiteboard_6.webp' },
    { type: 'image', name: 'whiteboard_34.png' },
    { type: 'image', name: 'whiteboard_37.png' },
    { type: 'image', name: 'whiteboard_1.png' },
  ];
  // Final whiteboard gallery: random order, then house images in order
  const whiteboardGallery = [
    ...whiteboardRandomOrder,
    ...whiteboardHouse.map(name => ({ type: 'image', name }))
  ];

import React, { useState, useRef } from 'react';
import { reviews } from '../data/reviews';

const ASSET_BASE = `${import.meta.env.BASE_URL}assets`;

function Reviews() {
  const [page, setPage] = useState(0);
  const [hovered, setHovered] = useState(-1);
  const [modalPoster, setModalPoster] = useState(null);

  // Scroll to top when page changes
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);
  const perPage = 5;
  const totalPages = Math.ceil(reviews.length / perPage);

  const handleNext = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (page > 0) {
      setPage(page - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const displayedReviews = reviews.slice(page * perPage, (page + 1) * perPage);

  return (
    <div>
      {/* Poster Modal */}
      {modalPoster && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.85)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
          onClick={() => setModalPoster(null)}
        >
          <img
            src={modalPoster}
            alt="Poster closeup"
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              borderRadius: 16,
              boxShadow: '0 4px 32px #000',
              border: '2px solid #566577',
            }}
            onClick={e => e.stopPropagation()}
          />
          <button
            onClick={() => setModalPoster(null)}
            style={{
              position: 'fixed',
              top: 32,
              right: 48,
              background: 'rgba(44,48,56,0.95)',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              fontSize: 28,
              padding: '6px 18px',
              cursor: 'pointer',
              zIndex: 1001,
              boxShadow: '0 2px 8px #000',
            }}
          >
            ×
          </button>
        </div>
      )}
      {displayedReviews.map((r, i) => (
        <div key={i}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 28 }}>
            <img
              src={`${ASSET_BASE}/Letterboxd/Review_Movie_Posters/${r.poster}`}
              alt={r.title}
              style={{ width: 80, borderRadius: 8, cursor: 'pointer', boxShadow: '0 2px 8px #232728' }}
              onClick={() => setModalPoster(`${ASSET_BASE}/Letterboxd/Review_Movie_Posters/${r.poster}`)}
            />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 20, color: '#fff', marginBottom: 2 }}>
                <a
                  href={r.movieUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#fff', textDecoration: 'none', fontWeight: 700 }}
                >
                  {r.title}
                </a>{' '}
                <span style={{ color: '#8f9ba6', fontWeight: 400, fontSize: 18 }}>({r.year})</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 4 }}>
                <span style={{ color: '#07c030', fontWeight: 700, fontSize: 18 }}>{'★'.repeat(r.stars)}</span>
                {r.heart && <span style={{ color: '#ff9210', fontSize: 20, marginLeft: 2 }}>♥</span>}
                <span style={{ color: '#8f9ba6', fontSize: 15, marginLeft: 2 }}>Quoted {r.quoted}</span>
              </div>
              <div
  style={{ color: '#8f9ba6', fontSize: 16, marginTop: 2 }}
  dangerouslySetInnerHTML={{ __html: r.quote }}
/>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                <img src={`${ASSET_BASE}/Letterboxd/${r.userPfp}`} alt={`${r.user} pfp`} style={{ width: 28, height: 28, borderRadius: '50%', border: '1px solid #888', objectFit: 'cover', background: '#232728' }} />
                <span style={{ color: '#abb7c2', fontSize: 15 }}>
                  by <a href={r.userUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#abb7c2', fontWeight: 700, textDecoration: 'none', cursor: 'pointer' }}>{r.user}</a>
                </span>
              </div>
            </div>
          </div>
          <div style={{ borderBottom: '0.5px solid #8f9ba6', width: '100%', margin: '22px 0 22px 0' }} />
        </div>
      ))}
      <div style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Previous button */}
        {page > 0 ? (
          <button
            onClick={handlePrev}
            style={{
              background: '#293038',
              color: '#97a8ba',
              border: 'none',
              borderRadius: 8,
              padding: '8px 24px',
              fontSize: 16,
              fontWeight: 400,
              cursor: 'pointer',
              outline: 'none',
              boxShadow: 'none',
              transition: 'background 0.2s',
              userSelect: 'none',
              marginRight: 8,
            }}
            onMouseDown={e => e.preventDefault()}
          >
            Previous
          </button>
        ) : <div style={{ width: 104 }} />}

        {/* Page numbers */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {(() => {
            const items = [];
            // For hover effect, use hovered state from component scope
            const makeBtn = (i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(-1)}
                style={{
                  background: hovered === i ? '#323840' : 'none',
                  border: 'none',
                  color: page === i ? '#566577' : '#9aacbd',
                  fontWeight: 400,
                  fontSize: 18,
                  padding: '2px 10px',
                  borderRadius: 6,
                  cursor: page === i ? 'default' : 'pointer',
                  outline: 'none',
                  boxShadow: 'none',
                  userSelect: 'none',
                  minWidth: 32,
                  transition: 'color 0.2s, background 0.2s',
                }}
                disabled={page === i}
              >
                {i + 1}
              </button>
            );
            if (totalPages <= 7) {
              for (let i = 0; i < totalPages; i++) {
                items.push(makeBtn(i));
              }
            } else {
              const show = (i) => (
                i === 0 ||
                i === totalPages - 1 ||
                Math.abs(i - page) <= 1 ||
                (page <= 2 && i <= 3) ||
                (page >= totalPages - 3 && i >= totalPages - 4)
              );
              let lastWasShown = false;
              for (let i = 0; i < totalPages; i++) {
                if (show(i)) {
                  items.push(makeBtn(i));
                  lastWasShown = true;
                } else if (lastWasShown) {
                  items.push(
                    <span key={"ellipsis-" + i} style={{ color: '#9aacbd', fontSize: 18, padding: '0 4px' }}>…</span>
                  );
                  lastWasShown = false;
                }
              }
            }
            return (
              <>
                {items}
              </>
            );
          })()}
        </div>

        {/* Next button */}
        {page < totalPages - 1 ? (
          <button
            onClick={handleNext}
            style={{
              background: '#293038',
              color: '#97a8ba',
              border: 'none',
              borderRadius: 8,
              padding: '8px 24px',
              fontSize: 16,
              fontWeight: 400,
              cursor: 'pointer',
              outline: 'none',
              boxShadow: 'none',
              transition: 'background 0.2s',
              userSelect: 'none',
              marginLeft: 8,
            }}
            onMouseDown={e => e.preventDefault()}
          >
            Next
          </button>
        ) : <div style={{ width: 88 }} />}
      </div>
    </div>
  );
}

const FAV_MOVIES = [
  { title: 'Poster1', poster: `${ASSET_BASE}/Letterboxd/poster_1.png` },
  { title: 'Poster2', poster: `${ASSET_BASE}/Letterboxd/poster_2.png` },
  { title: 'Poster3', poster: `${ASSET_BASE}/Letterboxd/poster_3.png` },
  { title: 'Poster4', poster: `${ASSET_BASE}/Letterboxd/poster_4.png` },
];

export default function Letterboxd() {
  const audioRef = useRef(null);
  const [tab, setTab] = useState('profile');
  const [activePosterIdx, setActivePosterIdx] = useState(null);
  const [liked, setLiked] = useState(false);
  const [reviewPage, setReviewPage] = useState(0); // 0: first review, 1: second review
  const [galleryMode, setGalleryMode] = useState(false);
  // For gallery popup modal
  const marianneImages = [
    'marianne_1.png',
    'marianne_3.png',
    'marianne_42.png',
    'marianne_9.png',
    'marianne_10.png',
    'marianne_11.png',
    'marianne_12.png',
    'marianne_13.webp',
    'marianne_14.webp',
    'marianne_15.webp',
    'marianne_16.webp',
    'marianne_17.webp',
    'marianne_18.webp',
    'marianne_19.webp',
    'marianne_20.webp',
    'marianne_21.webp',
    'marianne_22.webp',
    'marianne_23.webp',
    'marianne_24.webp',
    'marianne_25.webp',
    'marianne_26.webp',
    'marianne_28.webp',
    'marianne_29.webp',
    'marianne_30.webp',
    'marianne_32.webp',
    'marianne_33.webp',
    'marianne_34.webp',
    'marianne_37.webp',
    'marianne_38.webp',
    'marianne_39.webp',
    'marianne_40.webp',
    'marianne_41.webp',
    'marianne_8.png',
    'marianne_43.webp',
    'marianne_44.webp',
    'marianne_45.webp',
    'marianne_46.webp',
    'marianne_36.webp'
  ];
  // Roblox gallery: combine photos and videos, shuffle order
  const robloxPhotos = [
    'roblox_1.png','roblox_2.png','roblox_3.png','roblox_4.png','roblox_5.png','roblox_6.png','roblox_7.png','roblox_8.png','roblox_9.png','roblox_10.png','roblox_11.png','roblox_12.png','roblox_13.png','roblox_14.png','roblox_15.png','roblox_16.png','roblox_17.png','roblox_18.png','roblox_19.webp'
  ];
  const robloxVideos = [
    'robloxvid_1.mov','robloxvid_2.mov','robloxvid_3.mov','robloxvid_4.mov','robloxvid_5.mov','robloxvid_6.mov','robloxvid_7.mov','robloxvid_8.mov','robloxvid_9.mov','robloxvid_10.mov','robloxvid_11.mov'
  ];
  // Alternate between some photos and some videos, fixed order
  const robloxGallery = [];
  const maxLen = Math.max(robloxPhotos.length, robloxVideos.length);
  for (let i = 0; i < maxLen; i++) {
    if (i < robloxPhotos.length) robloxGallery.push({ type: 'image', name: robloxPhotos[i] });
    if (i < robloxVideos.length) robloxGallery.push({ type: 'video', name: robloxVideos[i] });
  }
  const [popupIdx, setPopupIdx] = useState(null); // null = no popup, else index in gallery
  const [galleryType, setGalleryType] = useState('marianne'); // 'marianne' or 'roblox' or 'whiteboard'

  // Keyboard navigation for popup
  React.useEffect(() => {
    if (popupIdx === null) return;
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft') setPopupIdx(idx => (idx > 0 ? idx - 1 : idx));
      if (e.key === 'ArrowRight') setPopupIdx(idx => (idx < marianneImages.length - 1 ? idx + 1 : idx));
      if (e.key === 'Escape') setPopupIdx(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [popupIdx, marianneImages.length]);

  // Stop any playing media when the popup closes
  React.useEffect(() => {
    if (popupIdx !== null) return;
    document.querySelectorAll('.lb-video').forEach(video => {
      try {
        video.pause();
        video.currentTime = 0;
      } catch (_) {
        // ignore if video is gone
      }
    });
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [popupIdx, galleryMode]);
  return (
    <>
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #2e3743 0%, #232a32 40%, #181c20 100%)',
        color: '#d8e0e5',
        fontFamily: 'Inter, Arial, sans-serif',
        boxSizing: 'border-box',
        overflowX: 'hidden',
        position: 'relative',
        paddingBottom: 64, // Add extra space at bottom
      }}>
        {/* Grainy texture overlay - improved for clarity */}
        {!galleryMode && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            pointerEvents: 'none',
            zIndex: 1,
            background: 'radial-gradient(circle at 50% 30%, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0) 100%), url("https://grainy-gradients.vercel.app/noise.svg")',
            backgroundRepeat: 'repeat',
            opacity: 0.22,
            mixBlendMode: 'screen',
          }} />
        )}
        {/* Header with logo and killbill image */}
        <div style={{ position: 'relative', height: 120, background: '#202425', display: 'flex', alignItems: 'center', padding: '0 2rem', borderBottom: '1px solid #222', width: '100vw', overflow: 'hidden' }}>
          <img src={`${ASSET_BASE}/Letterboxd/header.png`} alt="Header" style={{ position: 'absolute', left: 0, top: 0, height: 120, opacity: 0.18, zIndex: 0, objectFit: 'cover', width: '100vw', minWidth: '100vw', pointerEvents: 'none' }} />
          <img src={`${ASSET_BASE}/Letterboxd/Letterboxd_logo.png`} alt="Letterboxd Logo" style={{ height: 40, marginRight: 14, zIndex: 1 }} />
          <span style={{ fontFamily: 'Inter, Arial, sans-serif', fontWeight: 700, fontSize: 32, color: '#d8e0e5', letterSpacing: 1, zIndex: 1 }}>Letterboxd</span>
        </div>
        {/* Only render rest of content if not in gallery mode */}
        {!galleryMode && (
          <>
            {/* Profile row - hidden if poster view is not active */}
            {activePosterIdx === null && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 32, padding: '2rem 2rem 1.5rem 2rem', maxWidth: 1100, margin: '0 auto' }}>
                <img src={`${ASSET_BASE}/Letterboxd/letterboxd_pfp.jpg`} alt="Profile" style={{ width: 100, height: 100, borderRadius: '50%', border: '1.2px solid #888', objectFit: 'cover', background: '#232728' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 28, fontWeight: 700, marginBottom: 6 }}>P0op_Besties</div>
                  <div style={{ color: '#8f9ba6', fontSize: 16 }}>logging memories instead of movies</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 32, fontSize: 16 }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontWeight: 700, fontSize: 18 }}>690</div>
                    <div style={{ color: '#b0b8bb', fontSize: 11 }}>DAYS TOGETHER</div>
                  </div>
                  <span style={{
                    color: '#444',
                    fontSize: 22,
                    fontWeight: 100,
                    display: 'inline-block',
                    height: 62,
                    lineHeight: '62px',
                    verticalAlign: 'middle',
                    letterSpacing: '-2px',
                    borderLeft: '1px solid #444',
                    borderRight: 'none',
                    padding: '0 1px',
                    background: 'none',
                  }}></span>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontWeight: 700, fontSize: 18 }}>100k+</div>
                    <div style={{ color: '#b0b8bb', fontSize: 11 }}>MSGS SENT</div>
                  </div>
                  <span style={{
                    color: '#444',
                    fontSize: 22,
                    fontWeight: 100,
                    display: 'inline-block',
                    height: 62,
                    lineHeight: '62px',
                    verticalAlign: 'middle',
                    letterSpacing: '-2px',
                    borderLeft: '1px solid #444',
                    borderRight: 'none',
                    padding: '0 1px',
                    background: 'none',
                  }}></span>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontWeight: 700, fontSize: 18 }}>40</div>
                    <div style={{ color: '#b0b8bb', fontSize: 11 }}>COMBINED AGE</div>
                  </div>
                  <span style={{
                    color: '#444',
                    fontSize: 22,
                    fontWeight: 100,
                    display: 'inline-block',
                    height: 62,
                    lineHeight: '62px',
                    verticalAlign: 'middle',
                    letterSpacing: '-2px',
                    borderLeft: '1px solid #444',
                    borderRight: 'none',
                    padding: '0.001px',
                    background: 'none',
                  }}></span>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontWeight: 700, fontSize: 22 }}>1</div>
                    <div style={{ color: '#b0b8bb', fontSize: 13 }}>SHARED MOTHER (LEANNE)</div>
                  </div>
                </div>
              </div>
            )}
            {/* Outlined thin rectangle with tabs - hidden if poster view is not active */}
            {activePosterIdx === null && (
              <div style={{ maxWidth: 1100, margin: '0 auto', border: 'none', borderRadius: 0, background: '#2d3440', boxShadow: 'none', padding: 0, marginBottom: 0, position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', gap: 0, height: 48, alignItems: 'flex-end' }}>
                  <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                    <button
                      onClick={() => setTab('profile')}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#8f9ba6',
                        fontWeight: 'normal',
                        fontSize: 20,
                        cursor: 'pointer',
                        padding: '0 0 6px 0',
                        outline: 'none',
                        position: 'relative',
                        backgroundClip: 'padding-box',
                        transition: 'color 0.2s',
                      }}
                      onMouseOver={e => {
                        if (tab !== 'profile') e.target.style.color = '#4cc3ff';
                      }}
                      onMouseOut={e => {
                        e.target.style.color = '#8f9ba6';
                      }}
                    >
                      <span style={{ position: 'relative', display: 'inline-block' }}>
                        Profile
                        {tab === 'profile' && (
                          <span style={{
                            display: 'block',
                            height: 3,
                            width: '100%',
                            background: '#00e054',
                            borderRadius: 2,
                            margin: '4px auto 0 auto',
                          }} />
                        )}
                      </span>
                    </button>
                  </div>
                  <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                    <button
                      onClick={() => setTab('reviews')}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#8f9ba6',
                        fontWeight: 'normal',
                        fontSize: 20,
                        cursor: 'pointer',
                        padding: '0 0 6px 0',
                        outline: 'none',
                        position: 'relative',
                        backgroundClip: 'padding-box',
                        transition: 'color 0.2s',
                      }}
                      onMouseOver={e => {
                        if (tab !== 'reviews') e.target.style.color = '#4cc3ff';
                      }}
                      onMouseOut={e => {
                        e.target.style.color = '#8f9ba6';
                      }}
                    >
                      <span style={{ position: 'relative', display: 'inline-block' }}>
                        Quotes
                        {tab === 'reviews' && (
                          <span style={{
                            display: 'block',
                            height: 3,
                            width: '100%',
                            background: '#00e054',
                            borderRadius: 2,
                            margin: '4px auto 0 auto',
                          }} />
                        )}
                      </span>
                    </button>
                  </div>
                </div>
                <div style={{ padding: '0.2rem' }}>
                  {/* Only empty content in the rectangle for both tabs */}
                </div>
              </div>
            )}

          {/* Favorite Films Section - under profile/reviews rectangle, only show on profile tab and not when poster view is active */}
          {tab === 'profile' && activePosterIdx === null && (
            <div style={{ maxWidth: 1100, margin: '36px auto 0 auto', padding: 0 }}>
              <div style={{ color: '#8f9ba6', fontSize: 18, fontWeight: 400, marginBottom: 6, letterSpacing: 1 }}>FAVORITE MOMENTS</div>
              <div style={{ borderBottom: '1px solid #8f9ba6', width: 785, marginBottom: 22 }} />
              <div style={{ display: 'flex', gap: 28, justifyContent: 'flex-start', marginTop: 8 }}>
                {FAV_MOVIES.map((movie, idx) => (
                  <div
                    key={movie.title}
                    style={{ textAlign: 'center', borderRadius: 13, width: 160, padding: 9, background: 'none', cursor: 'pointer' }}
                    onClick={() => setActivePosterIdx(idx)}
                  >
                    <img src={movie.poster} alt={movie.title} style={{ borderRadius: 11, width: '100%', height: 225, objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Poster full view mode */}
          {activePosterIdx !== null && (
            <div style={{ maxWidth: 1100, margin: '48px auto 0 auto', padding: 0, display: 'flex', alignItems: 'flex-start', minHeight: 400, position: 'relative', gap: 48 }}>
              <div
                onClick={() => { setActivePosterIdx(null); setLiked(false); setReviewPage(0); }}
                style={{
                  position: 'absolute',
                  top: -5,
                  left: -150,
                  background: '#2d3440',
                  color: '#9aabbd',
                  borderRadius: 10,
                  padding: '7px 28px',
                  fontSize: 18,
                  fontWeight: 400,
                  cursor: 'pointer',
                  zIndex: 2,
                  margin: 0,
                  transition: 'background 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  border: 'none',
                  boxShadow: 'none',
                  userSelect: 'none',
                }}
                onMouseOver={e => e.currentTarget.style.background = '#293038'}
                onMouseOut={e => e.currentTarget.style.background = '#2d3440'}
              >
                Back
              </div>
              <img
                src={FAV_MOVIES[activePosterIdx].poster}
                alt={FAV_MOVIES[activePosterIdx].title}
                style={{ borderRadius: 16, width: 320, height: 450, objectFit: 'cover', boxShadow: '0 4px 32px #0008', marginLeft: 0 }}
              />
              {/* Review details */}
              <div style={{ flex: 1, marginLeft: 32, marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minWidth: 320 }}>
                {/* Poster 1: two reviews with navigation */}
                {activePosterIdx === 0 && (
                  reviewPage === 0 ? (
                    <>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8, justifyContent: 'space-between', width: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                          <img src={`${ASSET_BASE}/Letterboxd/dellulli_pfp.png`} alt="Profile" style={{ width: 48, height: 48, borderRadius: '50%', border: '1.2px solid #888', objectFit: 'cover', background: '#232728' }} />
                          <span style={{ color: '#abb7c2', fontSize: 18 }}>Rewatched by <span style={{ fontWeight: 700 }}>dellulli</span></span>
                        </div>
                        <button
                          style={{
                            background: '#23272e',
                            borderRadius: 10,
                            padding: '7px 28px',
                            color: '#9aabbd',
                            fontWeight: 400,
                            fontSize: 18,
                            border: 'none',
                            outline: 'none',
                            boxShadow: 'none',
                            cursor: 'pointer',
                            marginLeft: 16,
                            transition: 'background 0.2s',
                          }}
                          onMouseOver={e => e.currentTarget.style.background = '#293038'}
                          onMouseOut={e => e.currentTarget.style.background = '#23272e'}
                          onFocus={e => e.currentTarget.style.outline = 'none'}
                          onClick={() => { setGalleryType('marianne'); setGalleryMode(true); }}
                        >
                          Gallery
                        </button>
                      </div>
                      <div style={{ borderBottom: '1px solid #abb7c2', width: '100%', marginBottom: 18 }} />
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                        <span style={{ color: '#fff', fontWeight: 700, fontSize: 24 }}>Kill Marianne: Vol.1</span>
                        <span style={{ color: '#abb7c2', fontWeight: 400, fontSize: 22, marginLeft: 8 }}>2024</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                        {[...Array(5)].map((_, i) => (
                          <span key={i} style={{ color: '#30b432', fontSize: 22, fontWeight: 700 }}>★</span>
                        ))}
                        <span style={{ color: '#ff9210', fontSize: 24, marginLeft: 8 }}>♥</span>
                      </div>
                      <div style={{ fontFamily: 'Inter, Arial, sans-serif', color: '#abb7c2', fontSize: 20, marginBottom: 24, maxWidth: 600 }}>
                        From meeting marianne on msp, to then trolling her on instagram, suffering through her endless depression rants, making a fake ig account with marianne's face to bait that omgbubs girl to find out if she was getting groomed, and sending messages to each other through marianne, I've loved every single moment of annoying marianne with you.
                        <br />
                        <br />
                        10/10 would relive again. Same time next year? Deal
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8, cursor: 'pointer', userSelect: 'none' }} onClick={() => setLiked(l => !l)}>
                          <span style={{ color: liked ? '#ff9210' : '#abb7c2', fontSize: 28, transition: 'color 0.2s' }}>♥</span>
                          <span style={{ color: '#abb7c2', fontWeight: 700, fontSize: 18 }}>{liked ? 'Liked' : 'Like Review'}</span>
                        </div>
                        <div style={{ background: '#293038', borderRadius: 10, padding: '7px 28px', cursor: 'pointer', marginLeft: 16, display: 'flex', alignItems: 'center' }} onClick={() => { setReviewPage(1); setLiked(false); }}>
                          <span style={{ color: '#9aabbd', fontWeight: 400, fontSize: 18 }}>Next</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8, justifyContent: 'space-between', width: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                          <img src={`${ASSET_BASE}/Letterboxd/marianne_pfp.png`} alt="Profile" style={{ width: 48, height: 48, borderRadius: '50%', border: '1.2px solid #888', objectFit: 'cover', background: '#232728' }} />
                          <span style={{ color: '#abb7c2', fontSize: 18 }}>Rewatched by <span style={{ fontWeight: 700 }}>Maromaz12</span></span>
                        </div>
                        <button
                          style={{
                            background: '#23272e',
                            borderRadius: 10,
                            padding: '7px 28px',
                            color: '#9aabbd',
                            fontWeight: 400,
                            fontSize: 18,
                            border: 'none',
                            outline: 'none',
                            boxShadow: 'none',
                            cursor: 'pointer',
                            marginLeft: 16,
                            transition: 'background 0.2s',
                          }}
                          onMouseOver={e => e.currentTarget.style.background = '#293038'}
                          onMouseOut={e => e.currentTarget.style.background = '#23272e'}
                          onFocus={e => e.currentTarget.style.outline = 'none'}
                          onClick={() => setGalleryMode(true)}
                        >
                          Gallery
                        </button>
                      </div>
                      <div style={{ borderBottom: '1px solid #abb7c2', width: '100%', marginBottom: 18 }} />
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                        <span style={{ color: '#fff', fontWeight: 700, fontSize: 24 }}>Kill Marianne: Vol.1</span>
                        <span style={{ color: '#abb7c2', fontWeight: 400, fontSize: 22, marginLeft: 8 }}>2024</span>
                        <span
                          style={{ display: 'inline-flex', alignItems: 'center', marginLeft: 6, cursor: 'pointer' }}
                          onClick={() => { if (audioRef.current) { audioRef.current.currentTime = 0; audioRef.current.play(); } }}
                          title="Play audio"
                        >
                          {/* Speaker SVG icon */}
                          <svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ verticalAlign: 'middle' }}>
                            <path d="M3 8.5V11.5C3 12.0523 3.44772 12.5 4 12.5H6.58579C6.851 12.5 7.10536 12.6054 7.29289 12.7929L10.2929 15.7929C10.9229 16.4229 12 15.9776 12 15.0858V4.91421C12 4.02239 10.9229 3.57714 10.2929 4.20711L7.29289 7.20711C7.10536 7.39464 6.851 7.5 6.58579 7.5H4C3.44772 7.5 3 7.94772 3 8.5Z" fill="#92a1b4"/>
                            <path d="M15.5355 5.46447C17.4882 7.41713 17.4882 10.5829 15.5355 12.5355" stroke="#92a1b4" strokeWidth="1.5" strokeLinecap="round"/>
                            <path d="M13.4142 7.58579C14.1953 8.36684 14.1953 9.63317 13.4142 10.4142" stroke="#92a1b4" strokeWidth="1.5" strokeLinecap="round"/>
                          </svg>
                        </span>
                        <audio ref={audioRef} src={`${ASSET_BASE}/Letterboxd/marianne_killbill.mp3`} preload="auto" />
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                        {[...Array(5)].map((_, i) => (
                          <span key={i} style={{ color: '#30b432', fontSize: 22, fontWeight: 700 }}>★</span>
                        ))}
                        <span style={{ color: '#ff9210', fontSize: 24, marginLeft: 8 }}>♥</span>
                      </div>
                      <div style={{ fontFamily: 'Inter, Arial, sans-serif', color: '#abb7c2', fontSize: 20, marginBottom: 24, maxWidth: 600 }}>
                        Even though he never bought me my sandals or dress, I still appreciate str4hm very much, he is the rick to my michonne. 1000/10 would relive our first meeting again. 
                       <br />
                      <br />
                        Happy 42nd birthday str4hm! 
                        <br />
                        I Love you!
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8, cursor: 'pointer', userSelect: 'none' }} onClick={() => setLiked(l => !l)}>
                          <span style={{ color: liked ? '#ff9210' : '#abb7c2', fontSize: 28, transition: 'color 0.2s' }}>♥</span>
                          <span style={{ color: '#abb7c2', fontWeight: 700, fontSize: 18 }}>{liked ? 'Liked' : 'Like Review'}</span>
                        </div>
                        <div
                          style={{
                            background: '#293038',
                            borderRadius: 10,
                            padding: '7px 28px',
                            cursor: 'pointer',
                            marginLeft: 16,
                            display: 'flex',
                            alignItems: 'center',
                            border: 'none',
                            boxShadow: 'none',
                            userSelect: 'none',
                          }}
                          onClick={() => { setReviewPage(0); setLiked(false); }}
                          onMouseOver={e => e.currentTarget.style.background = '#2e3743'}
                          onMouseOut={e => e.currentTarget.style.background = '#293038'}
                        >
                          <span style={{ color: '#9aabbd', fontWeight: 400, fontSize: 18 }}>Back</span>
                        </div>
                      </div>
                    </>
                  )
                )}
                {/* Poster 2: dellulli_pfp, rewatched by dellulli, review 'Loved eternal sunshine', no next button */}
                {activePosterIdx === 1 && (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8, justifyContent: 'space-between', width: '100%' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <img src={`${ASSET_BASE}/Letterboxd/dellulli_pfp.png`} alt="Profile" style={{ width: 48, height: 48, borderRadius: '50%', border: '1.2px solid #888', objectFit: 'cover', background: '#232728' }} />
                        <span style={{ color: '#abb7c2', fontSize: 18 }}>Rewatched by <span style={{ fontWeight: 700 }}>dellulli</span></span>
                      </div>
                      <button
                        style={{
                          background: '#23272e',
                          borderRadius: 10,
                          padding: '7px 28px',
                          color: '#9aabbd',
                          fontWeight: 400,
                          fontSize: 18,
                          border: 'none',
                          outline: 'none',
                          boxShadow: 'none',
                          cursor: 'pointer',
                          marginLeft: 16,
                          transition: 'background 0.2s',
                        }}
                        onMouseOver={e => e.currentTarget.style.background = '#293038'}
                        onMouseOut={e => e.currentTarget.style.background = '#23272e'}
                        onFocus={e => e.currentTarget.style.outline = 'none'}
                        onClick={() => { setGalleryType('roblox'); setGalleryMode(true); }}
                      >
                        Gallery
                      </button>
                    </div>
                    <div style={{ borderBottom: '1px solid #abb7c2', width: '100%', marginBottom: 18 }} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                      <span style={{ color: '#fff', fontWeight: 700, fontSize: 24 }}>Eternal Roblox Of The Brainrot Mind</span>
                      <span style={{ color: '#abb7c2', fontWeight: 400, fontSize: 22, marginLeft: 8 }}>2024</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                      {[...Array(5)].map((_, i) => (
                        <span key={i} style={{ color: '#30b432', fontSize: 22, fontWeight: 700 }}>★</span>
                      ))}
                      <span style={{ color: '#ff9210', fontSize: 24, marginLeft: 8 }}>♥</span>
                    </div>
                    <div style={{ fontFamily: 'Inter, Arial, sans-serif', color: '#abb7c2', fontSize: 20, marginBottom: 24, maxWidth: 600 }}>
                      <span style={{ fontStyle: 'italic' }}>Meet me in Montauk.</span>
                      <br/>
                      <br/>Hanging out with you on Roblox has been one of my most favourite moments: from me dying constantly in obbies, shooting games, survival games (basically in every game) and you having to revive me everytime, to trolling kids and then adopting random ones too, and dancing as Walts. 
                      <br/>
                      <br/>
                      10/10 would pay robux to relive again.
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'flex-start' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8, cursor: 'pointer', userSelect: 'none' }} onClick={() => setLiked(l => !l)}>
                        <span style={{ color: liked ? '#ff9210' : '#abb7c2', fontSize: 28, transition: 'color 0.2s' }}>♥</span>
                        <span style={{ color: '#abb7c2', fontWeight: 700, fontSize: 18 }}>{liked ? 'Liked' : 'Like Review'}</span>
                      </div>
                    </div>
                  </>
                )}
                {/* Poster 3: dellulli_pfp, review 'loved godfather', with gallery */}
                {activePosterIdx === 2 && (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8, justifyContent: 'space-between', width: '100%' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <img src={`${ASSET_BASE}/Letterboxd/dellulli_pfp.png`} alt="Profile" style={{ width: 48, height: 48, borderRadius: '50%', border: '1.2px solid #888', objectFit: 'cover', background: '#232728' }} />
                        <span style={{ color: '#abb7c2', fontSize: 18 }}>Rewatched by <span style={{ fontWeight: 700 }}>dellulli</span></span>
                      </div>
                      <button
                        style={{
                          background: '#23272e',
                          borderRadius: 10,
                          padding: '7px 28px',
                          color: '#9aabbd',
                          fontWeight: 400,
                          fontSize: 18,
                          border: 'none',
                          outline: 'none',
                          boxShadow: 'none',
                          cursor: 'pointer',
                          marginLeft: 16,
                          transition: 'background 0.2s',
                        }}
                        onMouseOver={e => e.currentTarget.style.background = '#293038'}
                        onMouseOut={e => e.currentTarget.style.background = '#23272e'}
                        onFocus={e => e.currentTarget.style.outline = 'none'}
                        onClick={() => { setGalleryType('whiteboard'); setGalleryMode(true); }}
                      >
                        Gallery
                      </button>
                    </div>
                    <div style={{ borderBottom: '1px solid #abb7c2', width: '100%', marginBottom: 18 }} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                      <span style={{ color: '#fff', fontWeight: 700, fontSize: 24 }}>Donnie Darkboard</span>
                      <span style={{ color: '#abb7c2', fontWeight: 400, fontSize: 22, marginLeft: 8 }}>2024</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                      {[...Array(5)].map((_, i) => (
                        <span key={i} style={{ color: '#30b432', fontSize: 22, fontWeight: 700 }}>★</span>
                      ))}
                      <span style={{ color: '#ff9210', fontSize: 24, marginLeft: 8 }}>♥</span>
                    </div>
                    <div style={{ fontFamily: 'Inter, Arial, sans-serif', color: '#abb7c2', fontSize: 20, marginBottom: 24, maxWidth: 600 }}>
                      <span style={{ fontStyle: 'italic' }}>Hangout in Whiteboard again in 28 days, 6 hours, 42 minutes, 12 seconds?</span>
                      <br/>
                      <br/>
                      Whether it's doing silly tiktok trends, colouring, or just scribbling nonsense on Discord whiteboard, I have so much fun every time I do it with you. I love looking back and seeing the masterpieces we make.
                      <br/>
                      <br/>
                      10/10 would recommend.
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'flex-start' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8, cursor: 'pointer', userSelect: 'none' }} onClick={() => setLiked(l => !l)}>
                        <span style={{ color: liked ? '#ff9210' : '#abb7c2', fontSize: 28, transition: 'color 0.2s' }}>♥</span>
                        <span style={{ color: '#abb7c2', fontWeight: 700, fontSize: 18 }}>{liked ? 'Liked' : 'Like Review'}</span>
                      </div>
                    </div>
                  </>
                )}
                {/* Poster 4: dellulli_pfp, review 'loved parasite', with Quotes tab Gallery button */}
                {activePosterIdx === 3 && (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8, justifyContent: 'space-between', width: '100%' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <img src={`${ASSET_BASE}/Letterboxd/dellulli_pfp.png`} alt="Profile" style={{ width: 48, height: 48, borderRadius: '50%', border: '1.2px solid #888', objectFit: 'cover', background: '#232728' }} />
                        <span style={{ color: '#abb7c2', fontSize: 18 }}>Rewatched by <span style={{ fontWeight: 700 }}>dellulli</span></span>
                      </div>
                      <button
                        style={{
                          background: '#23272e',
                          borderRadius: 10,
                          padding: '7px 28px',
                          color: '#9aabbd',
                          fontWeight: 400,
                          fontSize: 18,
                          border: 'none',
                          outline: 'none',
                          boxShadow: 'none',
                          cursor: 'pointer',
                          marginLeft: 16,
                          transition: 'background 0.2s',
                        }}
                        onMouseOver={e => e.currentTarget.style.background = '#293038'}
                        onMouseOut={e => e.currentTarget.style.background = '#23272e'}
                        onFocus={e => e.currentTarget.style.outline = 'none'}
                        onClick={() => { setTab('reviews'); setActivePosterIdx(null); }}
                      >
                        Gallery
                      </button>
                    </div>
                    <div style={{ borderBottom: '1px solid #abb7c2', width: '100%', marginBottom: 18 }} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                      <span style={{ color: '#fff', fontWeight: 700, fontSize: 24 }}>La Talking</span>
                      <span style={{ color: '#abb7c2', fontWeight: 400, fontSize: 22, marginLeft: 8 }}>2024</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                      {[...Array(5)].map((_, i) => (
                        <span key={i} style={{ color: '#30b432', fontSize: 22, fontWeight: 700 }}>★</span>
                      ))}
                      <span style={{ color: '#ff9210', fontSize: 24, marginLeft: 8 }}>♥</span>
                    </div>
                    <div style={{ fontFamily: 'Inter, Arial, sans-serif', color: '#abb7c2', fontSize: 20, marginBottom: 24, maxWidth: 600 }}>
                      <span style={{ fontStyle: 'italic' }}>Jusqu’ici, tout va bien<br/>(So far, so good)</span>
                      <br/>
                      <br/>
                      And finally, my absolute favourite moments come from us just us talking. You're the one single person I can talk to where my social battery never runs out, and even though we are very different, our humours match and I love talking about random things with you whether it be about movies, making fun of your circumcision, getting fat shamed by you, or learning about your family members, I really do love hearing about the Papals.
                      <br/>
                      <br/>
                      10/10 let's keep talking.
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'flex-start' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8, cursor: 'pointer', userSelect: 'none' }} onClick={() => setLiked(l => !l)}>
                        <span style={{ color: liked ? '#ff9210' : '#abb7c2', fontSize: 28, transition: 'color 0.2s' }}>♥</span>
                        <span style={{ color: '#abb7c2', fontWeight: 700, fontSize: 18 }}>{liked ? 'Liked' : 'Like Review'}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Reviews Section Heading - under profile/reviews rectangle, only show on reviews tab */}
          {tab === 'reviews' && (
            <div style={{ maxWidth: 1100, margin: '36px auto 0 auto', padding: 0 }}>
              <div style={{ color: '#8f9ba6', fontSize: 18, fontWeight: 400, marginBottom: 6, letterSpacing: 1 }}>QUOTES</div>
              <div style={{ borderBottom: '1px solid #8f9ba6', width: 1100, marginBottom: 22 }} />
              <Reviews />
            </div>
          )}
        </>
        )}
      </div>

      {/* Gallery mode: fixed overlay above all content */}
      {galleryMode && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'linear-gradient(180deg, #2e3743 0%, #232a32 40%, #181c20 100%)',
            zIndex: 1000,
            overflowY: 'auto',
            overflowX: 'hidden',
            width: '100vw',
            minHeight: '100vh',
          }}
        >
          {/* Header inside gallery overlay */}
          <div style={{ position: 'relative', height: 120, background: '#202425', display: 'flex', alignItems: 'center', padding: '0 2rem', borderBottom: '1px solid #222', width: '100vw', overflow: 'hidden', zIndex: 1002 }}>
            <img src={`${ASSET_BASE}/Letterboxd/header.png`} alt="Header" style={{ position: 'absolute', left: 0, top: 0, height: 120, opacity: 0.18, zIndex: 0, objectFit: 'cover', width: '100vw', minWidth: '100vw', pointerEvents: 'none' }} />
            {/* Grain overlay on top of header only in gallery mode */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100vw',
              height: 120,
              pointerEvents: 'none',
              zIndex: 2,
              background: 'radial-gradient(circle at 50% 30%, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0) 100%), url("https://grainy-gradients.vercel.app/noise.svg")',
              backgroundRepeat: 'repeat',
              opacity: 0.22,
              mixBlendMode: 'screen',
            }} />
            <img src={`${ASSET_BASE}/Letterboxd/Letterboxd_logo.png`} alt="Letterboxd Logo" style={{ height: 40, marginRight: 14, zIndex: 3 }} />
            <span style={{ fontFamily: 'Inter, Arial, sans-serif', fontWeight: 700, fontSize: 32, color: '#d8e0e5', letterSpacing: 1, zIndex: 3 }}>Letterboxd</span>
          </div>
          {/* Grain overlay in gallery mode, covers header and background but not Back button */}
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            pointerEvents: 'none',
            zIndex: 1001,
            background: 'radial-gradient(circle at 50% 30%, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0) 100%), url("https://grainy-gradients.vercel.app/noise.svg")',
            backgroundRepeat: 'repeat',
            opacity: 0.22,
            mixBlendMode: 'screen',
          }} />
          {/* Top row: Back button (left) and MEMORY WALL (center) */}
          <div
            style={{
              width: '100vw',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              position: 'relative',
              marginTop: 24,
              marginBottom: 0,
              zIndex: 1001,
            }}
          >
            <div
              onClick={() => setGalleryMode(false)}
              style={{
                background: '#2d3440',
                color: '#9aabbd',
                borderRadius: 10,
                padding: '7px 28px',
                fontSize: 18,
                fontWeight: 400,
                cursor: 'pointer',
                transition: 'background 0.2s',
                userSelect: 'none',
                marginLeft: 56.5,
                marginTop: 18,
                boxShadow: 'none',
                border: 'none',
              }}
              onMouseOver={e => e.currentTarget.style.background = '#293038'}
              onMouseOut={e => e.currentTarget.style.background = '#2d3440'}
            >
              Back
            </div>
            <div
              style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                position: 'absolute',
                left: 0,
                right: 0,
                pointerEvents: 'none',
                zIndex: 1001,
              }}
            >
              <span style={{
                color: '#92a1b4',
                fontWeight: 400,
                fontSize: 22,
                letterSpacing: 2,
                fontFamily: 'Inter, Arial, sans-serif',
                pointerEvents: 'auto',
                background: 'none',
                borderRadius: 0,
                padding: 0,
                boxShadow: 'none',
              }}>
                MEMORY WALL
              </span>
            </div>
          </div>
          {/* Collage grid inside overlay, moved up by reducing paddingTop */}
          <div
            style={{
              margin: '0 auto',
              paddingTop: 5,
              maxWidth: 1100,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: 24,
              paddingLeft: 24,
              paddingRight: 24,
              paddingBottom: 48,
              zIndex: 1001,
              position: 'relative',
              justifyItems: 'center',
            }}
          >
            {(
              galleryType === 'marianne'
                ? marianneImages.map((name, idx) => ({ type: 'image', name, idx }))
                : galleryType === 'roblox'
                  ? robloxGallery.map((item, idx) => ({ ...item, idx }))
                  : whiteboardGallery.map((item, idx) => ({ ...item, idx }))
            ).map((item, idx) => (
              <div
                key={item.name}
                style={{
                  background: '#23272e',
                  borderRadius: 14,
                  boxShadow: '0 2px 12px #0006',
                  padding: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 170,
                  height: 240,
                  margin: '0 auto',
                  cursor: 'pointer',
                }}
                onClick={() => setPopupIdx(idx)}
                title="Click to enlarge"
              >
                {item.type === 'image' ? (
                  galleryType === 'marianne' ? (
                    <img
                      src={`${ASSET_BASE}/Letterboxd/marianne/${item.name}`}
                      alt={item.name}
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain',
                        borderRadius: 10,
                        background: '#181c20',
                        boxShadow: '0 1px 6px #0004',
                      }}
                    />
                  ) : galleryType === 'roblox' ? (
                    <img
                      src={`${ASSET_BASE}/Letterboxd/roblox/roblox_photos/${item.name}`}
                      alt={item.name}
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain',
                        borderRadius: 10,
                        background: '#181c20',
                        boxShadow: '0 1px 6px #0004',
                      }}
                    />
                  ) : (
                    <img
                      src={`${ASSET_BASE}/Letterboxd/whiteboard/whiteboard_photos/${item.name}`}
                      alt={item.name}
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain',
                        borderRadius: 10,
                        background: '#181c20',
                        boxShadow: '0 1px 6px #0004',
                      }}
                    />
                  )
                ) : (
                  galleryType === 'roblox' ? (
                    <video
                      className="lb-video"
                      src={`${ASSET_BASE}/Letterboxd/roblox/roblox_videos/${item.name}`}
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        borderRadius: 10,
                        background: '#181c20',
                        boxShadow: '0 1px 6px #0004',
                      }}
                      controls
                    />
                  ) : (
                    <video
                      className="lb-video"
                      src={`${ASSET_BASE}/Letterboxd/whiteboard/whiteboard_videos/${item.name}`}
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        borderRadius: 10,
                        background: '#181c20',
                        boxShadow: '0 1px 6px #0004',
                      }}
                      controls
                    />
                  )
                )}
              </div>
            ))}
          </div>

          {/* Popup modal for enlarged image view */}
          {popupIdx !== null && (
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                background: 'rgba(24,28,32,0.92)',
                zIndex: 20000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                transition: 'background 0.2s',
              }}
              onClick={e => { if (e.target === e.currentTarget) setPopupIdx(null); }}
            >
              {/* Close button */}
              <div
                onClick={() => setPopupIdx(null)}
                style={{
                  position: 'absolute',
                  top: 32,
                  right: 48,
                  fontSize: 36,
                  color: '#b0b8bb',
                  cursor: 'pointer',
                  zIndex: 20001,
                  fontWeight: 400,
                  background: 'rgba(44,51,62,0.7)',
                  borderRadius: 8,
                  width: 48,
                  height: 48,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.2s',
                  userSelect: 'none',
                }}
                title="Close"
                onMouseOver={e => e.currentTarget.style.background = '#232a32'}
                onMouseOut={e => e.currentTarget.style.background = 'rgba(44,51,62,0.7)'}
              >
                ×
              </div>
              {/* Left arrow */}
              {popupIdx > 0 && (
                <div
                  onClick={e => { e.stopPropagation(); setPopupIdx(idx => idx - 1); }}
                  style={{
                    position: 'absolute',
                    left: 32,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: 48,
                    color: '#b0b8bb',
                    cursor: 'pointer',
                    zIndex: 20001,
                    background: 'rgba(44,51,62,0.7)',
                    borderRadius: 8,
                    width: 56,
                    height: 56,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    userSelect: 'none',
                  }}
                  title="Previous"
                  onMouseOver={e => e.currentTarget.style.background = '#232a32'}
                  onMouseOut={e => e.currentTarget.style.background = 'rgba(44,51,62,0.7)'}
                >
                  &#8592;
                </div>
              )}
              {/* Right arrow */}
              {(() => {
                let galleryArr;
                if (galleryType === 'marianne') {
                  galleryArr = marianneImages;
                } else if (galleryType === 'roblox') {
                  galleryArr = robloxGallery;
                } else {
                  galleryArr = whiteboardGallery;
                }
                return popupIdx < galleryArr.length - 1;
              })() && (
                <div
                  onClick={e => { e.stopPropagation(); setPopupIdx(idx => idx + 1); }}
                  style={{
                    position: 'absolute',
                    right: 32,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: 48,
                    color: '#b0b8bb',
                    cursor: 'pointer',
                    zIndex: 20001,
                    background: 'rgba(44,51,62,0.7)',
                    borderRadius: 8,
                    width: 56,
                    height: 56,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    userSelect: 'none',
                  }}
                  title="Next"
                  onMouseOver={e => e.currentTarget.style.background = '#232a32'}
                  onMouseOut={e => e.currentTarget.style.background = 'rgba(44,51,62,0.7)'}
                >
                  &#8594;
                </div>
              )}
              {/* Enlarged image or video */}
              {galleryType === 'marianne' ? (
                <img
                  src={`${ASSET_BASE}/Letterboxd/marianne/${marianneImages[popupIdx]}`}
                  alt={marianneImages[popupIdx]}
                  style={{
                    maxWidth: 'min(90vw, 700px)',
                    maxHeight: '80vh',
                    objectFit: 'contain',
                    borderRadius: 16,
                    background: '#181c20',
                    boxShadow: '0 4px 32px #000a',
                    margin: '0 auto',
                    zIndex: 20002,
                    display: 'block',
                  }}
                />
              ) : galleryType === 'roblox' ? (
                (() => {
                  const item = robloxGallery[popupIdx];
                  if (item.type === 'image') {
                    return (
                      <img
                        src={`${ASSET_BASE}/Letterboxd/roblox/roblox_photos/${item.name}`}
                        alt={item.name}
                        style={{
                          maxWidth: 'min(90vw, 700px)',
                          maxHeight: '80vh',
                          objectFit: 'contain',
                          borderRadius: 16,
                          background: '#181c20',
                          boxShadow: '0 4px 32px #000a',
                          margin: '0 auto',
                          zIndex: 20002,
                          display: 'block',
                        }}
                      />
                    );
                  } else {
                    return (
                      <video
                        className="lb-video"
                        src={`${ASSET_BASE}/Letterboxd/roblox/roblox_videos/${item.name}`}
                        style={{
                          maxWidth: 'min(90vw, 700px)',
                          maxHeight: '80vh',
                          borderRadius: 16,
                          background: '#181c20',
                          boxShadow: '0 4px 32px #000a',
                          margin: '0 auto',
                          zIndex: 20002,
                          display: 'block',
                        }}
                        controls
                        autoPlay
                      />
                    );
                  }
                })()
              ) : (
                (() => {
                  const item = whiteboardGallery[popupIdx];
                  if (item.type === 'image') {
                    // If it's a house image, use whiteboard_photos, else use whiteboard_photos
                    const isHouse = item.name.startsWith('whiteboard_house');
                    const folder = isHouse ? 'whiteboard_photos' : 'whiteboard_photos';
                    return (
                      <img
                        src={`${ASSET_BASE}/Letterboxd/whiteboard/${folder}/${item.name}`}
                        alt={item.name}
                        style={{
                          maxWidth: 'min(90vw, 700px)',
                          maxHeight: '80vh',
                          objectFit: 'contain',
                          borderRadius: 16,
                          background: '#181c20',
                          boxShadow: '0 4px 32px #000a',
                          margin: '0 auto',
                          zIndex: 20002,
                          display: 'block',
                        }}
                      />
                    );
                  } else {
                    return (
                      <video
                        className="lb-video"
                        src={`${ASSET_BASE}/Letterboxd/whiteboard/whiteboard_videos/${item.name}`}
                        style={{
                          maxWidth: 'min(90vw, 700px)',
                          maxHeight: '80vh',
                          borderRadius: 16,
                          background: '#181c20',
                          boxShadow: '0 4px 32px #000a',
                          margin: '0 auto',
                          zIndex: 20002,
                          display: 'block',
                        }}
                        controls
                        autoPlay
                      />
                    );
                  }
                })()
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
