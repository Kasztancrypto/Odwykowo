export interface TriggerTag {
  id: string;
  label: string;
  emoji: string;
}

export const TRIGGER_TAGS: TriggerTag[] = [
  { id: 'stress', label: 'Stres', emoji: '😰' },
  { id: 'boredom', label: 'Nuda', emoji: '🥱' },
  { id: 'alcohol', label: 'Alkohol', emoji: '🍺' },
  { id: 'social', label: 'Towarzystwo', emoji: '👥' },
  { id: 'after_food', label: 'Po jedzeniu', emoji: '🍽️' },
  { id: 'coffee', label: 'Kawa', emoji: '☕' },
  { id: 'tired', label: 'Zmęczenie', emoji: '😴' },
  { id: 'argument', label: 'Kłótnia / emocje', emoji: '😡' },
  { id: 'habit', label: 'Nawyk / rutyna', emoji: '🔁' },
  { id: 'other', label: 'Inne', emoji: '❓' },
];
