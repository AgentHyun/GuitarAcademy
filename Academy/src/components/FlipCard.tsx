// FlipCard.tsx
import React from 'react';
import GuitarChordBox from './GuitarChordBox';
import { chordMap, chordDescriptions } from './chordData';
import '../FlipCard.css';

interface FlipCardProps {
  chordName: string;
}

const FlipCard: React.FC<FlipCardProps> = ({ chordName }) => (
  <div className="flip-card">
    <div className="flip-card-inner">
      <div className="flip-card-front">
        <p className="chord-title">{chordName}</p>
        <p>{chordDescriptions[chordName]}</p>
      </div>
      <div className="flip-card-back">
  <GuitarChordBox
  chordName={chordName}
  frets={chordMap[chordName]}
  description={`${chordName} 코드 운지법`}
/>


      </div>
    </div>
  </div>
);

export default FlipCard;
