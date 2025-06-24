const AudioBar = () => (
  <div style={{
    position: 'fixed', bottom: '20px', right: '20px',
    display: 'flex', alignItems: 'center', gap: '15px',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', padding: '10px',
    borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)', zIndex: 999
  }}>
    <img src="/사랑의 잡범.jpg" alt="사랑의 잡범" style={{ height: '80px', borderRadius: '8px' }} />
    <audio controls>
      <source src="/사랑의-잡범.mp3" type="audio/mpeg" />
    </audio>
  </div>
);

export default AudioBar;
