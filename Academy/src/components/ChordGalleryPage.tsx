// ChordsGalleryPage.tsx
import React from 'react';
import FlipCard from './FlipCard';
import { chordMap } from './chordData';
import Header from './Header';

const ChordsGalleryPage: React.FC = () => {
  const chords = Object.keys(chordMap);

  return (
    <>
        <Header scrollToSection={() => {}} />
      <div style={{
        fontFamily: 'sans-serif',
        padding: '40px',
        textAlign: 'center',
       
      }}>
        <h1 className='title'>🎸 코드 갤러리</h1>
       <div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '30px',
  justifyItems: 'center',
  marginTop: '30px',
  maxWidth: '960px',
  marginLeft: 'auto',
  marginRight: 'auto',
}}>
  {chords.map(chord => (
    <FlipCard key={chord} chordName={chord} />
  ))}
</div>

      </div>
    </>
  );
};

export default ChordsGalleryPage;
