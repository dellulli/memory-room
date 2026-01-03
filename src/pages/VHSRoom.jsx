import React, { useRef, useState } from "react";

const bg = `${import.meta.env.BASE_URL}assets/VHS/light_room.png`;
const vhsClosed = `${import.meta.env.BASE_URL}assets/VHS/close_vhs.png`;
const vhsOpen = `${import.meta.env.BASE_URL}assets/VHS/open_vhs.png`;
const vhsTapeInside = `${import.meta.env.BASE_URL}assets/VHS/tape_inside.png`;
const vhsClosed2 = `${import.meta.env.BASE_URL}assets/VHS/close_vhs_2.png`;
const vhsSide = `${import.meta.env.BASE_URL}assets/VHS/vhs_tape.png`;
const puttingInAudio = `${import.meta.env.BASE_URL}assets/VHS/putting_in.mp3`;
const closingPortAudio = `${import.meta.env.BASE_URL}assets/VHS/closing_port.mp3`;

export default function VHSRoom() {
  const puttingInRef = useRef(null);
  const closingPortRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [tapeInserted, setTapeInserted] = useState(false);
  const [tapeInsideClicked, setTapeInsideClicked] = useState(false);
  const [tapePos, setTapePos] = useState({ x: 0, y: 0, dragging: false });
  const [hoveringPort, setHoveringPort] = useState(false);
  const tapeRef = useRef(null);
  const tapeInsideRef = useRef(null);
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

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      background: `url('${bg}') center center / cover no-repeat`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <audio ref={puttingInRef} src={puttingInAudio} preload="auto" />
      <audio ref={closingPortRef} src={closingPortAudio} preload="auto" />
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
    </div>
  );
}
