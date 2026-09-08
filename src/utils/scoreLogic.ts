import { DayEntry } from '../types';
import { addDays, diffDays } from './dateUtils';

function rateForStreak(streak: number): number {
  if (streak >= 30) return 26;
  if (streak >= 11) return 21;
  if (streak >= 7) return 18;
  if (streak >= 3) return 13;
  return 10;
}

export interface ScoreResult {
  score: number;
  currentRate: number;
}

export function computeScore(
  startDate: string,
  entries: Record<string, DayEntry>,
  balloonPops: Record<string, number>,
  today: string
): ScoreResult {
  let score = 0;
  let streak = 0;
  const totalDays = Math.max(0, diffDays(startDate, today));

  for (let i = 0; i <= totalDays; i++) {
    const date = addDays(startDate, i);
    const entry = entries[date];
    if (entry?.relapsed) {
      score *= 0.5;
      streak = 0;
    } else if (entry && !entry.relapsed) {
      streak += 1;
      score += rateForStreak(streak);
    }
    score += balloonPops[date] ?? 0;
  }

  return {
    score: Math.round(score),
    currentRate: rateForStreak(streak + 1),
  };
}
