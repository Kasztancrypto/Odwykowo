import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from 'react';
import {
  AppData,
  DayEntry,
  DrawnPunishment,
  RevealedCard,
  CustomItem,
  SavingsGoal,
  TrustedContact,
} from '../types';
import { loadData, saveData, createDefaultData, isValidAppData } from '../storage';
import { todayStr, diffDays } from '../utils/dateUtils';
import { getLevelForScore, LevelInfo } from '../utils/avatarLogic';
import { computeScore } from '../utils/scoreLogic';

const SAVINGS_PER_DAY = 18;
export const DAILY_BALLOON_CAP = 5;

interface Derived {
  streak: number;
  totalCleanDays: number;
  totalRelapseDays: number;
  savings: number;
  levelInfo: LevelInfo;
  progressToNext: number; // 0..1
  score: number;
  currentRate: number;
  balloonsPoppedToday: number;
  balloonsRemainingToday: number;
  totalBalloonsPopped: number;
}

interface AppContextValue {
  data: AppData;
  loading: boolean;
  derived: Derived;
  upsertEntry: (entry: DayEntry) => void;
  deleteEntry: (date: string) => void;
  addPunishmentDrawn: (text: string) => void;
  addCardRevealed: (text: string) => void;
  addCustomPunishment: (text: string) => void;
  removeCustomPunishment: (id: string) => void;
  addCustomCard: (text: string) => void;
  removeCustomCard: (id: string) => void;
  addSavingsGoal: (name: string, price: number) => void;
  removeSavingsGoal: (id: string) => void;
  addReason: (text: string) => void;
  removeReason: (id: string) => void;
  popBalloon: () => void;
  acknowledgeLevel: (level: number) => void;
  completeOnboarding: () => void;
  setTrustedContact: (contact: TrustedContact) => void;
  clearTrustedContact: () => void;
  setReminderSettings: (enabled: boolean, hour: number) => void;
  replaceData: (imported: unknown) => boolean;
}

const AppContext = createContext<AppContextValue | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<AppData>(createDefaultData());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData().then((d) => {
      setData(d);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!loading) {
      saveData(data);
    }
  }, [data, loading]);

  const upsertEntry = useCallback((entry: DayEntry) => {
    setData((prev) => ({
      ...prev,
      entries: { ...prev.entries, [entry.date]: entry },
    }));
  }, []);

  const deleteEntry = useCallback((date: string) => {
    setData((prev) => {
      const next = { ...prev.entries };
      delete next[date];
      return { ...prev, entries: next };
    });
  }, []);

  const addPunishmentDrawn = useCallback((text: string) => {
    const item: DrawnPunishment = {
      id: `${Date.now()}`,
      date: new Date().toISOString(),
      text,
    };
    setData((prev) => ({
      ...prev,
      punishmentHistory: [item, ...prev.punishmentHistory],
    }));
  }, []);

  const addCardRevealed = useCallback((text: string) => {
    const item: RevealedCard = {
      id: `${Date.now()}`,
      date: new Date().toISOString(),
      text,
    };
    setData((prev) => ({
      ...prev,
      cardHistory: [item, ...prev.cardHistory],
    }));
  }, []);

  const addCustomPunishment = useCallback((text: string) => {
    const item: CustomItem = { id: `${Date.now()}`, text };
    setData((prev) => ({
      ...prev,
      customPunishments: [...prev.customPunishments, item],
    }));
  }, []);

  const removeCustomPunishment = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      customPunishments: prev.customPunishments.filter((p) => p.id !== id),
    }));
  }, []);

  const addCustomCard = useCallback((text: string) => {
    const item: CustomItem = { id: `${Date.now()}`, text };
    setData((prev) => ({
      ...prev,
      customCards: [...prev.customCards, item],
    }));
  }, []);

  const removeCustomCard = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      customCards: prev.customCards.filter((c) => c.id !== id),
    }));
  }, []);

  const addSavingsGoal = useCallback((name: string, price: number) => {
    const goal: SavingsGoal = {
      id: `${Date.now()}`,
      name,
      price,
      createdDate: todayStr(),
      achieved: false,
    };
    setData((prev) => ({
      ...prev,
      savingsGoals: [...prev.savingsGoals, goal],
    }));
  }, []);

  const removeSavingsGoal = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      savingsGoals: prev.savingsGoals.filter((g) => g.id !== id),
    }));
  }, []);

  const addReason = useCallback((text: string) => {
    const item: CustomItem = { id: `${Date.now()}`, text };
    setData((prev) => ({
      ...prev,
      myReasons: [...prev.myReasons, item],
    }));
  }, []);

  const removeReason = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      myReasons: prev.myReasons.filter((r) => r.id !== id),
    }));
  }, []);

  const popBalloon = useCallback(() => {
    const today = todayStr();
    setData((prev) => {
      const poppedToday = prev.balloonPops[today] ?? 0;
      if (poppedToday >= DAILY_BALLOON_CAP) return prev;
      return {
        ...prev,
        balloonPops: { ...prev.balloonPops, [today]: poppedToday + 1 },
      };
    });
  }, []);

  const acknowledgeLevel = useCallback((level: number) => {
    setData((prev) => ({ ...prev, lastSeenLevel: level }));
  }, []);

  const completeOnboarding = useCallback(() => {
    setData((prev) => ({ ...prev, hasSeenOnboarding: true }));
  }, []);

  const setTrustedContact = useCallback((contact: TrustedContact) => {
    setData((prev) => ({ ...prev, trustedContact: contact }));
  }, []);

  const clearTrustedContact = useCallback(() => {
    setData((prev) => ({ ...prev, trustedContact: null }));
  }, []);

  const setReminderSettings = useCallback((enabled: boolean, hour: number) => {
    setData((prev) => ({ ...prev, reminderEnabled: enabled, reminderHour: hour }));
  }, []);

  const replaceData = useCallback((imported: unknown): boolean => {
    if (!isValidAppData(imported)) return false;
    setData({ ...createDefaultData(), ...imported } as AppData);
    return true;
  }, []);

  const derived = useMemo<Derived>(() => {
    const today = todayStr();
    const entries = Object.values(data.entries);

    let lastRelapseDate: string | null = null;
    for (const e of entries) {
      if (e.relapsed) {
        if (!lastRelapseDate || e.date > lastRelapseDate) {
          lastRelapseDate = e.date;
        }
      }
    }

    const streakBase = lastRelapseDate ?? data.startDate;
    const streak = Math.max(0, diffDays(streakBase, today));

    const totalCleanDays = entries.filter((e) => !e.relapsed).length;
    const totalRelapseDays = entries.filter((e) => e.relapsed).length;
    const savings = totalCleanDays * SAVINGS_PER_DAY;

    const { score, currentRate } = computeScore(data.startDate, data.entries, data.balloonPops, today);

    const levelInfo = getLevelForScore(score);
    const span = (levelInfo.nextThreshold ?? levelInfo.threshold + 1) - levelInfo.threshold;
    const progressToNext = levelInfo.nextThreshold
      ? Math.min(1, (score - levelInfo.threshold) / span)
      : 1;

    const balloonsPoppedToday = data.balloonPops[today] ?? 0;
    const balloonsRemainingToday = Math.max(0, DAILY_BALLOON_CAP - balloonsPoppedToday);
    const totalBalloonsPopped = Object.values(data.balloonPops).reduce((a, b) => a + b, 0);

    return {
      streak,
      totalCleanDays,
      totalRelapseDays,
      savings,
      levelInfo,
      progressToNext,
      score,
      currentRate,
      balloonsPoppedToday,
      balloonsRemainingToday,
      totalBalloonsPopped,
    };
  }, [data.entries, data.startDate, data.balloonPops]);

  useEffect(() => {
    if (!loading && derived.score > data.bestScore) {
      setData((prev) => ({ ...prev, bestScore: derived.score }));
    }
  }, [derived.score, loading]);

  const value: AppContextValue = {
    data,
    loading,
    derived,
    upsertEntry,
    deleteEntry,
    addPunishmentDrawn,
    addCardRevealed,
    addCustomPunishment,
    removeCustomPunishment,
    addCustomCard,
    removeCustomCard,
    addSavingsGoal,
    removeSavingsGoal,
    addReason,
    removeReason,
    popBalloon,
    acknowledgeLevel,
    completeOnboarding,
    setTrustedContact,
    clearTrustedContact,
    setReminderSettings,
    replaceData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
