import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppData } from './types';
import { todayStr } from './utils/dateUtils';

const STORAGE_KEY = 'odwyk_app_data_v1';

export function createDefaultData(): AppData {
  return {
    startDate: todayStr(),
    entries: {},
    punishmentHistory: [],
    cardHistory: [],
    customPunishments: [],
    customCards: [],
    savingsGoals: [],
    myReasons: [],
    bestScore: 0,
    balloonPops: {},
    lastSeenLevel: 0,
    hasSeenOnboarding: false,
    trustedContact: null,
    reminderEnabled: false,
    reminderHour: 20,
  };
}

export async function loadData(): Promise<AppData> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return createDefaultData();
    const parsed = JSON.parse(raw);
    return {
      ...createDefaultData(),
      ...parsed,
    };
  } catch {
    return createDefaultData();
  }
}

export function isValidAppData(value: unknown): value is Partial<AppData> {
  if (!value || typeof value !== 'object') return false;
  const v = value as Record<string, unknown>;
  return typeof v.startDate === 'string' && typeof v.entries === 'object' && v.entries !== null;
}

export async function saveData(data: AppData): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // silently ignore - persistence best-effort
  }
}
