
import { useRef, useState, useEffect } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import Letterboxd from './pages/Letterboxd.jsx';
import Chatbot from './pages/Chatbot.jsx';
import BooksLibrary from './pages/Books.jsx';
// For controlling Chatbot music from MemoryRoom
const chatbotWindowRef = { current: null };
import lampImg from './assets/main-page/lamp.png';
import noLampImg from './assets/main-page/no_lamp.png';
import feetFrameImg from './assets/main-page/objects/feet_frame.png';
import thumbFrameImg from './assets/main-page/objects/thumb_frame.png';
import booksImg from './assets/main-page/objects/books.png';
import landlineImg from './assets/main-page/objects/landline.png';
import { landlineJiggleKeyframes } from './landlineJiggle.js';
// Add landline and hello audio refs
const landlineAudio = new window.Audio(`${import.meta.env.BASE_URL}assets/main-page/landline.mp3`);
const helloAudio = new window.Audio(`${import.meta.env.BASE_URL}assets/main-page/hello.mp3`);
import laptopImg from './assets/main-page/objects/laptop.png';
import letterImg from './assets/main-page/objects/letter.png';
import vhsTapeImg from './assets/main-page/objects/vhs_tape.png';
import lightSwitchSound from './assets/sounds/Light_Switch.mp3';

const LAMP_AREA = { x: 60, y: 140, width: 120, height: 130 };


function MemoryRoom() {
  const navigate = useNavigate();
    // Prevent scrolling on main page only
    useEffect(() => {
      document.body.classList.add('no-scroll');
      return () => {
        document.body.classList.remove('no-scroll');
      };
    }, []);
  const [lampOn, setLampOn] = useState(true);
  const audioRef = useRef(null);

  const handleImageClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (
      x >= LAMP_AREA.x &&
      x <= LAMP_AREA.x + LAMP_AREA.width &&
      y >= LAMP_AREA.y &&
      y <= LAMP_AREA.y + LAMP_AREA.height
    ) {
      setLampOn((prev) => !prev);
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    }
  };

  return (
    <div className="w-screen h-screen relative overflow-hidden">
      {/* Background lamp image, covers entire viewport */}
      <img
        src={lampOn ? lampImg : noLampImg}
        alt="Lamp"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          zIndex: 0,
          cursor: 'pointer',
        }}
        onClick={handleImageClick}
      />
      {/* Feet Frame: placeholder position, adjust as needed */}
      <img
        src={feetFrameImg}
        alt="Feet Frame"
        style={{
          position: 'absolute',
          left: '30%', // Adjust as needed
          top: '20%',  // Adjust as needed
          width: '7%',
          zIndex: 2,
          filter: 'brightness(0.8) drop-shadow(0 4px 16px rgba(0,0,0,0.5))',
        }}
      />
      {/* Thumb Frame: placeholder position, adjust as needed */}
      <img
        src={thumbFrameImg}
        alt="Thumb Frame"
        style={{
          position: 'absolute',
          left: '71.3%', // Adjust as needed
          top: '19%',  // Adjust as needed
          width: '7.5%',
          zIndex: 2,
          filter: 'brightness(0.65) drop-shadow(0 4px 16px rgba(0,0,0,0.5))',
        }}
      />
      {/* Books: under window on shelf (random for now) */}
      <img
        src={booksImg}
        alt="Books"
        style={{
          position: 'absolute',
          left: '50%',
          top: '28.5%',
          width: '7%',
          transform: 'scale(1.3)',
          zIndex: 1,
          filter: 'brightness(0.8) drop-shadow(0 10px 16px rgba(0,0,0,0.5))',
          cursor: 'pointer',
        }}
        onClick={() => window.open(`${import.meta.env.BASE_URL}books`, '_blank', 'noopener,noreferrer')}
      />
      {/* Landline: right of desk at bottom */}
      <style>{landlineJiggleKeyframes + `\n@keyframes wave-bounce { 0%, 100% { transform: scaleY(1); } 50% { transform: scaleY(2.2); } }`}</style>
      {/* Sound waves overlay (conditionally rendered) */}
      <div id="landline-waves" style={{
        position: 'absolute',
        left: '70%', // center above landline
        top: '81%', // moved up
        width: '40px',
        height: '32px',
        zIndex: 10,
        display: 'none',
        pointerEvents: 'none',
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: '6px',
      }}>
        {[0,1,2].map(i => (
          <div key={i} style={{
            width: 6,
            height: 24,
            background: '#65A65E',
            borderRadius: 4,
            transform: 'scaleY(1)',
            animation: `wave-bounce 0.7s ${i*0.18}s infinite cubic-bezier(.68,-0.55,.27,1.55)`,
            display: 'inline-block',
          }} />
        ))}
      </div>
      <img
        src={landlineImg}
        alt="Landline"
        id="landline-img"
        style={{
          position: 'absolute',
          left: '68.5%',
          top: '89%',
          width: '6%',
          transform: 'scale(3)',
          zIndex: 1,
          filter: 'brightness(0.57) drop-shadow(0 4px 16px rgba(0,0,0,0.5))',
          cursor: 'pointer',
        }}
        onClick={async () => {
          const landline = document.getElementById('landline-img');
          if (!landline) return;
          // Play audio 2x with pause, jiggle for each play
          for (let i = 0; i < 2; i++) {
            landlineAudio.currentTime = 0;
            landline.style.animation = 'none';
            void landline.offsetWidth;
            landline.style.animation = `landline-jiggle 1s linear 1`;
            await landlineAudio.play();
            await new Promise(res => landlineAudio.onended = () => setTimeout(res, 1200));
            landline.style.animation = '';
          }
          // Show sound waves, play hello.mp3, then hide and open chatbot
          const waves = document.getElementById('landline-waves');
          if (waves) waves.style.display = 'flex';
          helloAudio.currentTime = 0;
          await helloAudio.play();
          await new Promise(res => helloAudio.onended = res);
          if (waves) waves.style.display = 'none';
          window.open(`${import.meta.env.BASE_URL}chatbot`, '_blank');
        }}
      />
      {/* Laptop: right of desk at bottom */}
      <img
        src={laptopImg}
        alt="Laptop"
        style={{
          position: 'absolute',
          left: '26%',
          top: '85%',
          width: '7%',
          transform: 'scale(2.5)',
          zIndex: 1,
          filter: 'brightness(0.65) drop-shadow(0 4px 16px rgba(0,0,0,0.5))',
          cursor: 'pointer',
        }}
        onClick={() => window.open(`${import.meta.env.BASE_URL}letterboxd`, '_blank')}
      />
      {/* Letter: near bottom middle on coffee table to left */}
      <img
        src={letterImg}
        alt="Letter"
        style={{
          position: 'absolute',
          left: '39.6%',
          top: '60.6%',
          width: '6%',
          transform: 'scale(0.8)',
          zIndex: 1,
          filter: 'brightness(0.78) drop-shadow(0 4px 16px rgba(0,0,0,0.5))',
        }}
      />
      {/* VHS tape: right of coffee table */}
      <img
        src={vhsTapeImg}
        alt="VHS Tape"
        style={{
          position: 'absolute',
          left: '51%',
          top: '63%',
          width: '5%',
          transform: 'scale(1.2)',
          zIndex: 1,
          filter: 'brightness(0.7) drop-shadow(0 4px 16px rgba(0,0,0,0.5))',
        }}
      />
      <audio ref={audioRef} src={lightSwitchSound} preload="auto" />
    </div>
  );
}

export default function App() {
  // Expose a function for the new window to call to play music
  useEffect(() => {
    window.playMusicFromParent = () => {
      // Try to find the Chatbot component and call playMusic
      if (window.__chatbotRef && window.__chatbotRef.current && window.__chatbotRef.current.playMusic) {
        window.__chatbotRef.current.playMusic();
      }
    };
  }, []);
  // Attach ref to Chatbot in /chatbot route
  const chatbotRef = useRef();
  useEffect(() => {
    window.__chatbotRef = chatbotRef;
  }, []);
  return (
    <Routes>
      <Route path="/letterboxd" element={<Letterboxd />} />
      <Route path="/chatbot" element={<Chatbot ref={chatbotRef} />} />
      <Route path="/books" element={<BooksLibrary />} />
      <Route path="/*" element={<MemoryRoom />} />
    </Routes>
  );
}
