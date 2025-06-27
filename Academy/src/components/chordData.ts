export const chordMap: Record<string, { str: number; fret: FretValue }[]> = {
  C: [
    { str: 6, fret: 'x' }, { str: 5, fret: 3 }, { str: 4, fret: 2 },
    { str: 3, fret: 0 }, { str: 2, fret: 1 }, { str: 1, fret: 0 },
  ],
  G: [
    { str: 6, fret: 3 }, { str: 5, fret: 2 }, { str: 4, fret: 0 },
    { str: 3, fret: 0 }, { str: 2, fret: 0 }, { str: 1, fret: 3 },
  ],
  Am: [
    { str: 6, fret: 'x' }, { str: 5, fret: 0 }, { str: 4, fret: 2 },
    { str: 3, fret: 2 }, { str: 2, fret: 1 }, { str: 1, fret: 0 },
  ],
  D: [
    { str: 6, fret: 'x' }, { str: 5, fret: 'x' }, { str: 4, fret: 0 },
    { str: 3, fret: 2 }, { str: 2, fret: 3 }, { str: 1, fret: 2 },
  ],
  E: [
    { str: 6, fret: 0 }, { str: 5, fret: 2 }, { str: 4, fret: 2 },
    { str: 3, fret: 1 }, { str: 2, fret: 0 }, { str: 1, fret: 0 },
  ],
  Em: [
    { str: 6, fret: 0 }, { str: 5, fret: 2 }, { str: 4, fret: 2 },
    { str: 3, fret: 0 }, { str: 2, fret: 0 }, { str: 1, fret: 0 },
  ],
  A: [
    { str: 6, fret: 'x' }, { str: 5, fret: 0 }, { str: 4, fret: 2 },
    { str: 3, fret: 2 }, { str: 2, fret: 2 }, { str: 1, fret: 0 },
  ],
  Bm: [
    { str: 6, fret: 'x' }, { str: 5, fret: 2 }, { str: 4, fret: 4 },
    { str: 3, fret: 4 }, { str: 2, fret: 3 }, { str: 1, fret: 2 },
  ],
  // 추가 코드
  Dsus4: [
    { str: 6, fret: 'x' }, { str: 5, fret: 'x' }, { str: 4, fret: 0 },
    { str: 3, fret: 2 }, { str: 2, fret: 3 }, { str: 1, fret: 3 },
  ],
  Asus4: [
    { str: 6, fret: 'x' }, { str: 5, fret: 0 }, { str: 4, fret: 2 },
    { str: 3, fret: 2 }, { str: 2, fret: 3 }, { str: 1, fret: 0 },
  ],
  Am7: [
    { str: 6, fret: 'x' }, { str: 5, fret: 0 }, { str: 4, fret: 2 },
    { str: 3, fret: 0 }, { str: 2, fret: 1 }, { str: 1, fret: 0 },
  ],
  Amaj7: [
    { str: 6, fret: 'x' }, { str: 5, fret: 0 }, { str: 4, fret: 2 },
    { str: 3, fret: 1 }, { str: 2, fret: 2 }, { str: 1, fret: 0 },
  ],
  Cmaj7: [
    { str: 6, fret: 'x' }, { str: 5, fret: 3 }, { str: 4, fret: 2 },
    { str: 3, fret: 0 }, { str: 2, fret: 0 }, { str: 1, fret: 0 },
  ],
  G7: [
    { str: 6, fret: 3 }, { str: 5, fret: 2 }, { str: 4, fret: 0 },
    { str: 3, fret: 0 }, { str: 2, fret: 0 }, { str: 1, fret: 1 },
  ],
};

export const chordDescriptions: Record<string, string> = {
  C: '기본적인 코드로, 대부분의 곡에서 자주 사용됩니다.',
  G: 'G 메이저 코드는 개방현을 많이 사용하는 코드입니다.',
  Am: 'A 마이너는 감성적인 느낌을 주는 코드입니다.',
  D: '통기타 연주에서 많이 쓰이는 밝은 코드입니다.',
  E: '힘찬 소리를 가진 기본 코드입니다.',
  Em: '슬픈 느낌의 마이너 코드입니다.',
  A: '많은 노래의 기본 코드로 쓰입니다.',
  Bm: '바레 코드의 기초로 많이 사용됩니다.',
  Dsus4: '서스펜디드 느낌으로 밝은 느낌을 더합니다.',
  Asus4: 'A 코드의 변형으로, 밝고 강한 느낌을 줍니다.',
  Am7: 'Am 코드에 7음을 추가한 부드러운 코드입니다.',
  Amaj7: '부드럽고 재즈한 느낌의 A 메이저 7 코드입니다.',
  Cmaj7: '맑고 개방적인 느낌의 C 메이저 7 코드입니다.',
  G7: '블루스, 재즈 등에서 많이 쓰이는 도미넌트 7 코드입니다.',
};
