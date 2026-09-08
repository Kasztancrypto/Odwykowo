export interface LevelInfo {
  level: number;
  title: string;
  description: string;
  threshold: number;
  nextThreshold: number | null;
}

// Points required (from the ranking/score system) to reach each level.
// Cwel (0), Michał (30), Frajer (50) and Bojack Horseman (80) are finalized -
// the rest are placeholders until we design each remaining level together.
export const LEVEL_THRESHOLDS = [0, 30, 50, 80, 250, 400, 600, 900, 1300, 2000, 3000];

export const LEVEL_TITLES = [
  'Cwel',
  'Michał',
  'Frajer',
  'Bojack Horseman',
  'Wojownik',
  'Weteran',
  'Rycerz',
  'Mistrz',
  'Legenda',
  'Bohater',
  'Nieśmiertelny',
];

export const LEVEL_DESCRIPTIONS = [
  'Dno. Zmęczony, brudny, z butelką w ręce. Jedyna droga stąd to w górę.',
  'Ogarnąłeś się, odrosło trochę brzuszka od spokoju, a nie od piwa. Nawet wyciągnąłeś rakietę - pierwsze oznaki normalnego życia.',
  'Odłożyłeś butelkę, ale dalej jesteś zapyziały i brzydki. Trochę lepiej niż na dnie - ale to dopiero początek.',
  'Cyniczny, zmęczony życiem koń-człowiek z najlepszymi czasami dawno za sobą. Trofeum w ręce to jedyna pamiątka po lepszych czasach.',
  'Twój topór jest coraz cięższy w dobrym sensie.',
  'Jesteś weteranem tej walki - widziałeś już najgorsze pokusy.',
  'Rycerz z mieczem i tarczą - nic cię teraz nie ruszy.',
  'Jesteś mistrzem samego siebie.',
  'Twój miecz świeci - stałeś się legendą wśród śmiertelników.',
  'Prawdziwy bohater w złotej zbroi.',
  'Nieśmiertelny. Nikt i nic już cię nie powali.',
];

export function getLevelForScore(score: number): LevelInfo {
  let level = 0;
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (score >= LEVEL_THRESHOLDS[i]) {
      level = i;
      break;
    }
  }
  const nextThreshold =
    level + 1 < LEVEL_THRESHOLDS.length ? LEVEL_THRESHOLDS[level + 1] : null;
  return {
    level,
    title: LEVEL_TITLES[level],
    description: LEVEL_DESCRIPTIONS[level],
    threshold: LEVEL_THRESHOLDS[level],
    nextThreshold,
  };
}
