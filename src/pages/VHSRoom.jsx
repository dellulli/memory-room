import React, { useRef, useState } from "react";

const lightRoomBg = `${import.meta.env.BASE_URL}assets/VHS/light_room.png`;
const noLightRoomBg = `${import.meta.env.BASE_URL}assets/VHS/no_light_room.png`;
const lightSwitchSound = `${import.meta.env.BASE_URL}assets/sounds/Light_Switch.mp3`;
const scary1Audio = `${import.meta.env.BASE_URL}assets/VHS/scary1.mp3`;
const vhsClosed = `${import.meta.env.BASE_URL}assets/VHS/close_vhs.png`;
const vhsOpen = `${import.meta.env.BASE_URL}assets/VHS/open_vhs.png`;
const vhsTapeInside = `${import.meta.env.BASE_URL}assets/VHS/tape_inside.png`;
const vhsClosed2 = `${import.meta.env.BASE_URL}assets/VHS/close_vhs_2.png`;
const horsingAroundVideo = `${import.meta.env.BASE_URL}assets/VHS/Horsing Around.mov`;
const vhsSide = `${import.meta.env.BASE_URL}assets/VHS/vhs_tape.png`;
const puttingInAudio = `${import.meta.env.BASE_URL}assets/VHS/putting_in.mp3`;
const closingPortAudio = `${import.meta.env.BASE_URL}assets/VHS/closing_port.mp3`;
const scary2Audio = `${import.meta.env.BASE_URL}assets/VHS/scary2.mp3`;

export default function VHSRoom() {
  const [lightOn, setLightOn] = useState(true);
  const lightSwitchRef = useRef(null);
  const puttingInRef = useRef(null);
  const closingPortRef = useRef(null);
  const scaryRef = useRef(null);
  const scary2Ref = useRef(null);
  const [showClosePort, setShowClosePort] = useState(false);
  const [scaryStage, setScaryStage] = useState(0); // 0: none, 1: welcome, 2: age, 3: feed
  const [overlayActive, setOverlayActive] = useState(true);
  const [overlayFade, setOverlayFade] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [tapeInserted, setTapeInserted] = useState(false);
  const [tapeInsideClicked, setTapeInsideClicked] = useState(false);
  const [tapePos, setTapePos] = useState({ x: 0, y: 0, dragging: false });
  const [hoveringPort, setHoveringPort] = useState(false);
  const tapeRef = useRef(null);
  const tapeInsideRef = useRef(null);
  const horsingAroundRef = useRef(null);

  // Handle overlay click to start experience
  const handleOverlayClick = () => {
    setOverlayFade(true);
    setTimeout(() => {
      setOverlayActive(false);
      // Wait a tick to ensure overlay is gone, then start scary subtitle and sound
      setTimeout(() => {
        setScaryStage(1);
        if (scaryRef.current) {
          scaryRef.current.currentTime = 0;
          scaryRef.current.play();
          // Do not auto-hide scaryStage after 2 seconds; let UI logic handle hiding
        }
        setTimeout(() => setScaryStage(2), 1500);
        setTimeout(() => setScaryStage(3), 3500); // 1.5 seconds after stage 2
      }, 0);
    }, 400); // fade duration
  };
  // Default positions for tape and port
  const tapeStart = { left: '23%', top: '79%' };
  const port = { left: '50%', top: '77%' }; // near bottom edge of closed vhs

  // Calculate px from % for drag
  const getXY = (left, top) => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    return { x: parseFloat(left) * vw / 100, y: parseFloat(top) * vh / 100 };
  };

  // Drag handlers
  const onMouseDown = (e) => {
    e.preventDefault();
    // Get tape's current center position
    const tapeRect = tapeRef.current?.getBoundingClientRect();
    const offsetX = e.clientX - (tapeRect?.left + tapeRect?.width/2 || 0);
    const offsetY = e.clientY - (tapeRect?.top + tapeRect?.height/2 || 0);
    setTapePos(pos => ({
      ...pos,
      dragging: true,
      offsetX,
      offsetY,
      x: tapeRect ? tapeRect.left + tapeRect.width/2 : 0,
      y: tapeRect ? tapeRect.top + tapeRect.height/2 : 0,
    }));
    document.body.style.userSelect = 'none';
  };
  React.useEffect(() => {
    if (!tapePos.dragging) {
      setHoveringPort(false);
      return;
    }
    const onMove = (e) => {
      setTapePos(pos => {
        const newX = e.clientX - (pos.offsetX || 0);
        const newY = e.clientY - (pos.offsetY || 0);
        // Check if hovering port
        const tapeRect = tapeRef.current?.getBoundingClientRect();
        const portXY = getXY(port.left, port.top);
        let hovering = false;
        if (tapeRect) {
          const tapeCenter = { x: newX, y: newY };
          const dist = Math.hypot(tapeCenter.x - portXY.x, tapeCenter.y - portXY.y);
          hovering = dist < 80;
        }
        setHoveringPort(hovering);
        return { ...pos, x: newX, y: newY };
      });
    };
    const onUp = (e) => {
      setTapePos(pos => ({ ...pos, dragging: false }));
      document.body.style.userSelect = '';
      // Check if dropped near port
      const tapeRect = tapeRef.current?.getBoundingClientRect();
      const portXY = getXY(port.left, port.top);
      if (tapeRect) {
        const tapeCenter = { x: tapeRect.left + tapeRect.width/2, y: tapeRect.top + tapeRect.height/2 };
        const dist = Math.hypot(tapeCenter.x - portXY.x, tapeCenter.y - portXY.y);
        if (dist < 80) {
          setIsOpen(false);
          setTapeInserted(true);
          // Play putting_in.mp3
          if (puttingInRef.current) {
            puttingInRef.current.currentTime = 0;
            puttingInRef.current.play();
          }
        }
      }
      setHoveringPort(false);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [tapePos.dragging]);

  // Tape initial position
  const tapeStyle = tapePos.dragging
    ? {
        position: 'absolute',
        left: tapePos.x,
        top: tapePos.y,
        zIndex: 3,
        width: 120,
        maxWidth: '18vw',
        maxHeight: '40vh',
        transform: 'translate(-50%, -50%) scale(1.7)',
        cursor: 'grabbing',
        pointerEvents: 'auto',
      }
    : {
        position: 'absolute',
        left: tapeStart.left,
        top: tapeStart.top,
        zIndex: 3,
        width: 120,
        maxWidth: '18vw',
        maxHeight: '40vh',
        transform: 'translate(-50%, -50%) scale(1.7)',
        cursor: 'grab',
        pointerEvents: isOpen ? 'none' : 'auto',
      };

  let vhsImg = vhsClosed;
  if (tapeInsideClicked) vhsImg = vhsClosed2;
  else if (tapeInserted) vhsImg = vhsTapeInside;
  else if (hoveringPort) vhsImg = vhsOpen;

  // Handler for clicking tape_inside near port
  const handleTapeInsideClick = (e) => {
    // Use the actual click position instead of the image center
    const portXY = getXY(port.left, port.top);
    const clickX = e.clientX;
    const clickY = e.clientY;
    const dist = Math.hypot(clickX - portXY.x, clickY - portXY.y);
    if (dist < 80) {
      setTapeInsideClicked(true);
      // Play closing_port.mp3
      if (closingPortRef.current) {
        closingPortRef.current.currentTime = 0;
        closingPortRef.current.play();
      }
    }
  };

  // Play Horsing Around.mov when tapeInsideClicked becomes true
  React.useEffect(() => {
    if (tapeInsideClicked && horsingAroundRef.current) {
      horsingAroundRef.current.currentTime = 0;
      horsingAroundRef.current.play();
    } else if (!tapeInsideClicked && horsingAroundRef.current) {
      horsingAroundRef.current.pause();
      horsingAroundRef.current.currentTime = 0;
    }
  }, [tapeInsideClicked]);

  // Show 'Close the port' and play scary2.mp3 with 0.2s delay after tape_inside.png is displayed
  React.useEffect(() => {
    let closePortTimeout;
    if (tapeInserted && !tapeInsideClicked) {
      // Stop scary1.mp3 and remove its subtitle if still playing
      if (scaryRef.current) {
        scaryRef.current.pause();
        scaryRef.current.currentTime = 0;
      }
      setScaryStage(0);
      closePortTimeout = setTimeout(() => {
        setShowClosePort(true);
        if (scary2Ref.current) {
          scary2Ref.current.currentTime = 0;
          scary2Ref.current.play();
        }
      }, 1000);
    } else {
      setShowClosePort(false);
      if (scary2Ref.current) {
        scary2Ref.current.pause();
        scary2Ref.current.currentTime = 0;
      }
    }
    return () => {
      clearTimeout(closePortTimeout);
    };
  }, [tapeInserted, tapeInsideClicked]);

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      background: `url('${lightOn ? lightRoomBg : noLightRoomBg}') center center / cover no-repeat`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <audio ref={puttingInRef} src={puttingInAudio} preload="auto" />
      <audio ref={closingPortRef} src={closingPortAudio} preload="auto" />
      <audio ref={lightSwitchRef} src={lightSwitchSound} preload="auto" />
      <audio ref={scaryRef} src={scary1Audio} preload="auto" />
      <audio ref={scary2Ref} src={scary2Audio} preload="auto" />
      {/* Visible video for Horsing Around.mov, will play automatically when tapeInsideClicked is true */}
      <video
        ref={horsingAroundRef}
        src={horsingAroundVideo}
        style={{
          display: tapeInsideClicked ? 'block' : 'none',
          position: 'fixed',
          top: '50%',
          left: '48.5%',
          transform: 'translate(-50%, -50%) scale(0.4)',
          zIndex: 3000,
          maxWidth: '80vw',
          maxHeight: '80vh',
          background: '#000',
          cursor: 'pointer',
          boxShadow: '0 4px 32px #000',
        }}
        preload="auto"
        controls={false}
        autoPlay={false}
        onClick={() => {
          const vid = horsingAroundRef.current;
          if (vid) {
            if (vid.paused) {
              vid.play();
            } else {
              vid.pause();
            }
          }
        }}
        onEnded={() => {
          // Reset state so user can insert tape again
          setTapeInsideClicked(false);
          setTapeInserted(false);
        }}
      />
      {overlayActive && !overlayFade && (
        <div
          onClick={handleOverlayClick}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: overlayFade ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,0.7)',
            transition: 'background 0.4s',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            cursor: 'pointer',
            pointerEvents: 'auto',
          }}
        >
          <div
            style={{
              marginTop: '27vw',
              color: '#F5C842',
              fontFamily: 'Inter, Arial, Helvetica, Roboto, sans-serif',
              fontWeight: 500,
              fontSize: '2vw',
              letterSpacing: '0.02em',
              textAlign: 'center',
              maxWidth: '90vw',
              pointerEvents: 'none',
              background: 'none',
              border: 'none',
              boxShadow: 'none',
              padding: 0,
              textShadow: '0 2px 6px #000, 0 0.5px 0 #000',
              left: '8.5%',
              position: 'relative',
              transform: 'translateX(-50%)',
            }}
          >
            Tap to enter the room
          </div>
        </div>
      )}
      {/* Light area overlay, user will adjust width/height/position later */}
      <div
        style={{
          position: 'absolute',
          left: '39%',
          top: '1%',
          width: '19%', // Wider clickable area
          height: '11%',
          cursor: 'pointer',
          zIndex: 10,
          // background: 'rgba(255,255,0,0.1)', // Uncomment for debug
        }}
        onClick={() => {
          setLightOn((prev) => !prev);
          if (lightSwitchRef.current) {
            lightSwitchRef.current.currentTime = 0;
            lightSwitchRef.current.play();
          }
        }}
      />
      <img
        src={vhsImg}
        alt={tapeInsideClicked ? 'Closed VHS 2' : tapeInserted ? 'Tape Inserted' : hoveringPort ? 'Open VHS' : 'Closed VHS'}
        style={{
          position: 'absolute',
          left: '50%',
          top: '60%',
          zIndex: 2,
          width: 340,
          maxWidth: '60vw',
          maxHeight: '70vh',
          transform: 'translate(-50%, -50%) scale(1.8)',
          transition: '0.3s',
        }}
      />
      {!tapeInserted && (
        <img
          ref={tapeRef}
          src={vhsSide}
          alt="VHS Tape Side"
          style={tapeStyle}
          onMouseDown={onMouseDown}
          draggable={false}
        />
      )}
      {tapeInserted && !tapeInsideClicked && (
        <img
          ref={tapeInsideRef}
          src={vhsTapeInside}
          alt="Tape Inside VHS"
          style={{
            position: 'absolute',
            left: '50%',
            top: '60%',
            zIndex: 3,
            width: 340,
            maxWidth: '60vw',
            maxHeight: '70vh',
            transform: 'translate(-50%, -50%) scale(1.8)',
            transition: '0.3s',
            cursor: 'pointer',
          }}
          onClick={handleTapeInsideClick}
        />
      )}
      {tapeInserted && !tapeInsideClicked && showClosePort && (
        <div
          style={{
            position: 'fixed',
            top: '10vw', // moved down
            left: '50%',
            transform: 'translateX(-50%)',
            color: '#F5C842',
            fontFamily: 'Inter, Arial, Helvetica, Roboto, sans-serif',
            fontWeight: 500,
            fontSize: '2vw',
            letterSpacing: '0.02em',
            lineHeight: 1.1,
            textAlign: 'center',
            zIndex: 1000,
            maxWidth: '90vw',
            pointerEvents: 'none',
            background: 'none',
            border: 'none',
            boxShadow: 'none',
            padding: 0,
            textShadow: '0 2px 6px #000, 0 0.5px 0 #000',
          }}
        >
          Close the port
        </div>
      )}
      {!tapeInserted && !tapeInsideClicked && (
        (scaryStage === 1 || scaryStage === 2) && (
          <div
            style={{
              position: 'fixed',
              top: '10vw',
              left: '50%',
              transform: 'translateX(-50%)',
              color: '#F5C842',
              fontFamily: 'Inter, Arial, Helvetica, Roboto, sans-serif',
              fontWeight: 500,
              fontSize: '2vw',
              letterSpacing: '0.02em',
              lineHeight: 1.1,
              textAlign: 'center',
              zIndex: 1000,
              maxWidth: '90vw',
              pointerEvents: 'none',
              background: 'none',
              border: 'none',
              boxShadow: 'none',
              padding: 0,
              textShadow: '0 2px 6px #000, 0 0.5px 0 #000',
            }}
          >
            {scaryStage === 1 && 'Welcome Edward'}
            {scaryStage === 2 && 'you are the right age now'}
          </div>
        )
      )}
      {!tapeInserted && !tapeInsideClicked && scaryStage === 3 && (
        <div
          style={{
            position: 'fixed',
            top: '10vw',
            left: '50%',
            transform: 'translateX(-50%)',
            color: '#F5C842',
            fontFamily: 'Inter, Arial, Helvetica, Roboto, sans-serif',
            fontWeight: 500,
            fontSize: '2vw',
            letterSpacing: '0.02em',
            lineHeight: 1.1,
            textAlign: 'center',
            zIndex: 1000,
            maxWidth: '90vw',
            pointerEvents: 'none',
            background: 'none',
            border: 'none',
            boxShadow: 'none',
            padding: 0,
            textShadow: '0 2px 6px #000, 0 0.5px 0 #000',
          }}
        >
          feed the tape into the slot... slowly
        </div>
      )}
    </div>
  );
}
