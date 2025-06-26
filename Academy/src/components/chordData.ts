export type FretValue = number | 'x';

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
};
