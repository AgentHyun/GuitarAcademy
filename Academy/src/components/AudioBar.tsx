import { useRef, useState } from 'react';

const AudioBar = () => {
  const [visible, setVisible] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  return (
    <>
      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        padding: '10px 15px',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        zIndex: 999,
        transition: 'opacity 0.3s ease',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
      }}>
        {visible && (
          <img
            src="/사랑의 잡범.jpg"
            alt="사랑의 잡범"
            style={{ height: '80px', borderRadius: '8px' }}
          />
        )}
        <audio ref={audioRef} controls>
          <source src="/사랑의-잡범.mp3" type="audio/mpeg" />
        </audio>
      </div>

      <button
        onClick={() => setVisible((prev) => !prev)}
        style={{
          position: 'fixed',
          bottom: visible ? '120px' : '20px',
          right: '20px',
          backgroundColor: '#333',
          color: '#fff',
          padding: '8px 12px',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          zIndex: 1000,
        }}
      >
        {visible ? '▼' : '▲'}
      </button>
    </>
  );
};

export default AudioBar;
