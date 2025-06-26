const GuitarChordBox: React.FC<Props> = ({ chordName, frets, description }) => {
  const fretCount = 5;
  const stringCount = 6;
  const stringSpacing = 20;
  const fretSpacing = 30;

  return (
    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
      <h2>{chordName}</h2>
      <svg width={stringSpacing * (stringCount - 1) + 40} height={fretSpacing * fretCount + 40}>
        {Array.from({ length: stringCount }, (_, i) => (
          <line
            key={`string-${i}`}
            x1={i * stringSpacing + 20}
            y1={20}
            x2={i * stringSpacing + 20}
            y2={fretSpacing * fretCount + 20}
            stroke="black"
          />
        ))}
        {Array.from({ length: fretCount + 1 }, (_, i) => (
          <line
            key={`fret-${i}`}
            x1={20}
            y1={i * fretSpacing + 20}
            x2={(stringCount - 1) * stringSpacing + 20}
            y2={i * fretSpacing + 20}
            stroke={i === 0 ? 'black' : '#999'}
            strokeWidth={i === 0 ? 3 : 1}
          />
        ))}
        {frets.map(({ str, fret }, idx) => {
          if (fret === 'x' || fret === 0) return null;
          const x = (6 - str) * stringSpacing + 20;
          const y = fret * fretSpacing - fretSpacing / 2 + 20;
          return <circle key={idx} cx={x} cy={y} r={6} fill="black" />;
        })}
        {frets.map(({ str, fret }, idx) => {
          if (fret !== 'x') return null;
          const x = (6 - str) * stringSpacing + 20;
          return <text key={`x-${idx}`} x={x - 5} y={15} fontSize="14" fill="red">x</text>;
        })}
        {frets.map(({ str, fret }, idx) => {
          if (fret !== 0) return null;
          const x = (6 - str) * stringSpacing + 20;
          return <text key={`o-${idx}`} x={x - 5} y={15} fontSize="14" fill="green">o</text>;
        })}
      </svg>
      <p style={{ marginTop: '12px', fontSize: '0.9rem' }}>{description}</p>
    </div>
  );
};

export default GuitarChordBox;