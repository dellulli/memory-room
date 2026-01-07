
import { useRef, useState, useEffect } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import Letterboxd from './pages/Letterboxd.jsx';
import Chatbot from './pages/Chatbot.jsx';
import BooksLibrary from './pages/Books.jsx';
import VHSRoom from './pages/VHSRoom.jsx';
// For controlling Chatbot music from MemoryRoom
const chatbotWindowRef = { current: null };
import lampImg from './assets/main-page/lamp.png';
import noLampImg from './assets/main-page/no_lamp.png';
import feetFrameImg from './assets/main-page/objects/feet_frame.png';
import feetFrameBiteImg from './assets/main-page/objects/feet_frame_bite.png';
import chairImg from './assets/main-page/objects/chair.png';
import chairPeachfuzzImg from './assets/main-page/objects/chair_peachfuzz.png';
import booksImg from './assets/main-page/objects/books.png';
import bookshelfImg from './assets/main-page/objects/bookshelf.png';
import bannerImg from './assets/main-page/objects/banner.png';
import bannerDarkImg from './assets/main-page/objects/banner_dark.png';
import landlineImg from './assets/main-page/objects/landline.png';
import landlineOffHookImg from './assets/main-page/objects/landline_off_hook.png';
import { landlineJiggleKeyframes } from './landlineJiggle.js';
// Add landline and hello audio refs
const landlineAudio = new window.Audio(`${import.meta.env.BASE_URL}assets/main-page/landline.mp3`);
const helloAudio = new window.Audio(`${import.meta.env.BASE_URL}assets/main-page/hello.mp3`);
import laptopImg from './assets/main-page/objects/laptop.png';
import redLaptopImg from './assets/main-page/objects/red_laptop.png';
import handImg from './assets/main-page/objects/hand.png';
import letterImg from './assets/main-page/objects/letter.png';
import letterHandprintImg from './assets/main-page/objects/letter_handprint.png';
import vhsTapeImg from './assets/main-page/objects/vhs_tape.png';
import vhsTapeOpenImg from './assets/main-page/objects/vhs_tape_open.png';
import lightSwitchSound from './assets/sounds/Light_Switch.mp3';

const LAMP_AREA = { x: 60, y: 140, width: 120, height: 130 };



function MemoryRoom() {
  const [landlineHovered, setLandlineHovered] = useState(false);
  const [laptopHovered, setLaptopHovered] = useState(false);
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
      {/* Banner: same position as books, behind bookshelf and books */}
      <img
        src={lampOn ? bannerImg : bannerDarkImg}
        alt="Banner"
        style={{
          position: 'absolute',
          left: '45%',
          top: '8%',
          width: '7%',
          transform: lampOn ? 'scale(6)' : 'scale(6)',
          zIndex: 3,
          filter: 'brightness(0.9) drop-shadow(0 10px 16px rgba(0,0,0,0.3))',
        }}
      />
      {/* Feet Frame: placeholder position, adjust as needed */}
      <img
        src={lampOn ? feetFrameImg : feetFrameBiteImg}
        alt={lampOn ? "Feet Frame" : "Feet Frame Bite"}
        style={{
          position: 'absolute',
          left: '30.45%', // Adjust as needed
          top: '21.3%',  // Adjust as needed
          width: '6%',
          zIndex: 2,
          filter: 'brightness(0.8) drop-shadow(0 4px 16px rgba(0,0,0,0.5))',
        }}
      />
      {/* Chair: always visible, above bookshelf and books */}
      <img
        src={chairImg}
        alt="Chair"
        style={{
          position: 'absolute',
          left: '73.4%',
          top: '54%',
          width: '7.5%',
          transform: 'scale(3)',
          zIndex: 4, // Higher than bookshelf (1) and books (2)
          filter: lampOn ? 'none' : 'brightness(0.5) drop-shadow(0 4px 16px rgba(0,0,0,0.5))',
          pointerEvents: 'none',
        }}
      />
      <img
        src={bookshelfImg}
        alt="Bookshelf"
        style={{
          position: 'absolute',
          left: '67.7%',
          top: '29%',
          width: '7%',
          transform: 'scale(2.3)',
          zIndex: 1,
          filter: 'brightness(0.7) drop-shadow(0 10px 16px rgba(0,0,0,0.5))',
        }}
      />
      <img
        src={booksImg}
        alt="Books"
        style={{
          position: 'absolute',
          left: '66.4%',
          top: '39%',
          width: '7%',
          transform: 'scale(1.5)',
          zIndex: 3,
          filter: 'brightness(0.7) drop-shadow(0 10px 16px rgba(0,0,0,0.5))',
          cursor: 'pointer',
        }}
        onClick={() => window.open(`${import.meta.env.BASE_URL}books`, '_blank', 'noopener,noreferrer')}
      />
      {/* Landline: right of desk at bottom */}
      <style>{`
        ${landlineJiggleKeyframes.replace(/scale\([^)]*\)/g, '')}
        @keyframes wave-bounce { 0%, 100% { transform: scaleY(1); } 50% { transform: scaleY(2.2); } }
      `}</style>
      {/* Sound waves overlay removed as requested */}
      <div
        id="landline-container"
        style={{
          position: 'absolute',
          left: lampOn ? '68.5%' : '68%', // Move right when lamp is off
          top: lampOn ? '89%' : '89%',    // Move down when lamp is off
          width: '6%',
          height: 'calc(6% * 1.1)',
          transform: 'scale(3)',
          zIndex: 1,
        }}
      >
        <div
          id="landline-jiggle-wrap"
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            animation: undefined,
          }}
        >
          <img
            src={lampOn ? landlineImg : landlineOffHookImg}
            alt={lampOn ? "Landline" : "Landline Off Hook"}
            id="landline-img"
            style={{
              width: '100%',
              height: '100%',
              filter: 'brightness(0.57) drop-shadow(0 4px 16px rgba(0,0,0,0.5))',
              cursor: 'pointer',
              position: 'absolute',
              left: 0,
              top: 0,
            }}
            onClick={async () => {
              const jiggleWrap = document.getElementById('landline-jiggle-wrap');
              if (!jiggleWrap) return;
              // Play audio 2x with pause, jiggle for each play
              for (let i = 0; i < 2; i++) {
                landlineAudio.currentTime = 0;
                jiggleWrap.style.animation = 'none';
                void jiggleWrap.offsetWidth;
                jiggleWrap.style.animation = `landline-jiggle 1s linear 1`;
                await landlineAudio.play();
                await new Promise(res => landlineAudio.onended = () => setTimeout(res, 1200));
                jiggleWrap.style.animation = '';
              }
              // After 2nd jiggle, open chatbot (no sound waves, no hello.mp3)
              window.open(`${import.meta.env.BASE_URL}chatbot`, '_blank');
            }}
            onMouseEnter={() => setLandlineHovered(true)}
            onMouseLeave={() => setLandlineHovered(false)}
          />
          {/* Flickering red dot overlay when lamp is off and hovered */}
          {!lampOn && landlineHovered && (
            <span
              style={{
                position: 'absolute',
                right: '10%',
                top: '18%',
                width: '5%',
                height: '8%',
                borderRadius: '100%',
                background: 'red',
                boxShadow: '0 0 8px 2px #dd1c1cff',
                animation: 'flicker-dot 1s infinite',
                zIndex: 2,
                pointerEvents: 'none',
              }}
            />
          )}
        </div>
        <style>{`
          @keyframes flicker-dot {
            0%, 100% { opacity: 1; }
            20% { opacity: 0.7; }
            40% { opacity: 0.2; }
            60% { opacity: 0.8; }
            80% { opacity: 0.4; }
          }
        `}</style>
      </div>
      {/* Laptop: right of desk at bottom, changes to red on hover when lamp is off */}
      <img
        src={!lampOn && laptopHovered ? redLaptopImg : laptopImg}
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
        onMouseEnter={() => setLaptopHovered(true)}
        onMouseLeave={() => setLaptopHovered(false)}
      />
      {/* Letter: near bottom middle on coffee table to left */}
      <img
        src={lampOn ? letterImg : letterHandprintImg}
        alt={lampOn ? "Letter" : "Letter with Handprint"}
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
        src={lampOn ? vhsTapeImg : vhsTapeOpenImg}
        alt={lampOn ? "VHS Tape" : "VHS Tape Open"}
        style={{
          position: 'absolute',
          left: '51%',
          top: '63%',
          width: '5%',
          transform: 'scale(1.2)',
          zIndex: 1,
          filter: 'brightness(0.7) drop-shadow(0 4px 16px rgba(0,0,0,0.5))',
          cursor: 'pointer',
        }}
        onClick={() => window.open(`${import.meta.env.BASE_URL}vhs`, '_blank', 'noopener,noreferrer')}
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
      <Route path="/vhs" element={<VHSRoom />} />
      <Route path="/*" element={<MemoryRoom />} />
    </Routes>
  );
}
