import React from "react";

const base = import.meta.env.BASE_URL || '/';
const books = [
  {
    title: "Day In The Life Of Dellulli's Mom",
    pdf: `${base}assets/Books/The%20day%20in%20the%20life%20of%20Dellulli's%20Mum.pdf`
  },
  {
    title: "Bean's Secret",
    pdf: `${base}assets/Books/Bean's%20Secret.pdf`
  },
  {
    title: "Dellulli's Eulogy",
    pdf: `${base}assets/Books/Dellulli's%20Eulogy.pdf`
  },
  {
    title: "Mother's Day Poem",
    pdf: `${base}assets/Books/Mother's%20Day%20Edward's%20Mum%20poem.pdf`
  },
  {
    title: "USER GUIDE",
    pdf: `${base}assets/Books/User%20Guide.pdf`
  },
  {
    title: "Melon Child",
    pdf: `${base}assets/Books/Melon%20Child.pdf`
  },
  {
    title: "Melon Mother",
    pdf: `${base}assets/Books/Melon%20Mother.pdf`
  },
  {
    title: "The Happy Couple",
    pdf: `${base}assets/Books/The%20Happy%20Couple.pdf`
  }
];

const spineColors = [
  "#bfae9e", "#e6c7a6", "#c2d6b0", "#b0c4de", "#f7e7ce", "#e0b0ff", "#f4cccc", "#ffe599"
];

export default function BooksLibrary() {
  // Add keyframes for row movement
  const styleAnim = `
    @keyframes shoe-row-move {
      0% { transform: translateX(0); }
      50% { transform: translateX(40px); }
      100% { transform: translateX(0); }
    }
    @keyframes shoe-row-move-reverse {
      0% { transform: translateX(0); }
      50% { transform: translateX(-40px); }
      100% { transform: translateX(0); }
    }
  `;
  // Shoe image paths
  const shoeImgs = Array.from({length: 9}, (_, i) => `${base}assets/Books/shoe/shoe_${i+1}.png`);
  // Scatter shoes evenly in rows and columns
  const rows = 3;
  const cols = 6;
  const shoeBg = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = 5 + c * ((90) / (cols - 1));
      const y = 8 + r * ((80) / (rows - 1));
      const size = 100 + Math.random() * 40;
      const rot = Math.random() * 60 - 30;
      const imgIdx = Math.floor(Math.random() * shoeImgs.length);
      shoeBg.push(
        <img
          key={`shoe-${r}-${c}`}
          src={shoeImgs[imgIdx]}
          alt={`shoe_${imgIdx+1}`}
          style={{
            position: 'fixed',
            left: `${x}%`,
            top: `${y}%`,
            width: size,
            height: 'auto',
            opacity: 0.13,
            zIndex: 0,
            pointerEvents: 'none',
            transform: `rotate(${rot}deg)`,
            filter: 'drop-shadow(0 2px 8px #0005)',
            animation: `${r === 1 ? 'shoe-row-move-reverse' : 'shoe-row-move'} 5.5s ease-in-out infinite`,
            animationDelay: `${r * 1.2}s`,
          }}
        />
      );
    }
  }
  // Dark academia palette: deep browns, dark wood, gold, forest green, oxblood, parchment, leather
  const shelfColor = '#3a2c23';
  const bg = 'radial-gradient(ellipse at 60% 40%, #2b2320 70%, #181210 100%)';
  const shelfShadow = '0 8px 32px #000a, 0 1px 0 #6e4b2a inset';
  const bookSpineColors = [
    '#6e4b2a', // leather brown
    '#3e5c4b', // forest green
    '#7a2f2f', // oxblood
    '#bfae9e', // parchment
    '#a67c52', // tan
    '#3a2c23', // dark wood
    '#4b3a2a', // walnut
    '#2b2320', // near black
  ];
  const bookTextColors = [
    '#e9d8a6', // gold
    '#e9d8a6',
    '#e9d8a6',
    '#312b29',
    '#fff',
    '#e9d8a6',
    '#e9d8a6',
    '#e9d8a6',
  ];
  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      background: bg,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      position: 'relative',
    }}>
      <style>{styleAnim}</style>
      {/* Shoes background */}
      {shoeBg}
      <h1 style={{
        fontFamily: 'Playfair Display, serif',
        fontSize: 44,
        color: '#e9d8a6',
        letterSpacing: 2,
        marginBottom: 50,
        marginTop: 10,
        textShadow: '0 2px 12px #000a, 0 1px 0 #bfae9e',
        fontWeight: 700,
        textAlign: 'center',
        filter: 'brightness(1.1)',
      }}>
        Edward's Criterion Closet
      </h1>
      <div style={{
        width: 700,
        height: 420,
        background: 'none',
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        margin: '0 auto',
      }}>
        {/* Bookshelf wood shelf */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: 40,
          background: shelfColor,
          borderRadius: '0 0 32px 32px',
          boxShadow: shelfShadow,
          zIndex: 1,
        }} />
        {/* Books */}
        <div style={{
          display: 'flex',
          gap: 24,
          position: 'absolute',
          left: 0,
          bottom: 40,
          width: '100%',
          justifyContent: 'center',
          zIndex: 2,
        }}>
          {books.map((book, i) => (
            <div
              key={book.title}
              onClick={() => window.open(book.pdf, '_blank', 'noopener,noreferrer')}
              style={{
                width: 60,
                height: 370, // increased height for long titles
                background: bookSpineColors[i % bookSpineColors.length],
                borderRadius: '8px 8px 12px 12px',
                boxShadow: '0 4px 16px #0007, 0 1px 0 #fff2 inset',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                position: 'relative',
                transition: 'transform 0.15s cubic-bezier(.4,2,.6,1)',
                border: '2.5px solid #e9d8a6',
                transform: 'scale(1)',
                marginTop: 8, // consistent top margin
                overflow: 'hidden',
              }}
              onMouseOver={e => e.currentTarget.style.transform = 'scale(1.07)'}
              onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
              title={book.title}
            >
              <span style={{
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
                fontFamily: 'Playfair Display, serif',
                fontWeight: 700,
                fontSize: 18,
                color: bookTextColors[i % bookTextColors.length],
                letterSpacing: 1,
                textShadow: '0 1px 2px #000a, 0 0px 0px #e9d8a6',
                userSelect: 'none',
                textAlign: 'center',
                padding: '0 8px', // more padding to avoid overlap
                lineHeight: 1.2,
                filter: 'brightness(1.1)',
                maxHeight: 340,
                overflow: 'hidden',
                whiteSpace: 'pre-line',
              }}>{book.title}</span>
              {/* Decorative gold band */}
              <div style={{
                position: 'absolute',
                top: 18,
                left: 8,
                width: 44,
                height: 6,
                background: 'linear-gradient(90deg,#e9d8a6 60%,#bfae9e 100%)',
                borderRadius: 3,
                opacity: 0.7,
              }} />
            </div>
          ))}
        </div>
      </div>
      {/* Subtle vignette overlay for dark academia mood */}
      <div style={{
        pointerEvents: 'none',
        position: 'fixed',
        inset: 0,
        zIndex: 99,
        background: 'radial-gradient(ellipse at 50% 60%,rgba(0,0,0,0) 60%,rgba(20,10,5,0.7) 100%)',
      }} />
    </div>
  );
}
