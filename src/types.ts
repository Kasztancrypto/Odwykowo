export interface DayEntry {
  date: string; // 'YYYY-MM-DD'
  relapsed: boolean;
  mood: number; // 1-5
  craving: number; // 1-5
  journal: string;
  triggers?: string[]; // trigger tag ids
}

export interface DrawnPunishment {
  id: string;
  date: string; // ISO timestamp
  text: string;
}

export interface RevealedCard {
  id: string;
  date: string; // ISO timestamp
  text: string;
}

export interface CustomItem {
  id: string;
  text: string;
}

export interface SavingsGoal {
  id: string;
  name: string;
  price: number;
  createdDate: string; // 'YYYY-MM-DD'
  achieved: boolean;
}

export interface TrustedContact {
  name: string;
  phone: string;
}

export interface AppData {
  startDate: string; // 'YYYY-MM-DD', first day using the app
  entries: Record<string, DayEntry>;
  punishmentHistory: DrawnPunishment[];
  cardHistory: RevealedCard[];
  customPunishments: CustomItem[];
  customCards: CustomItem[];
  savingsGoals: SavingsGoal[];
  myReasons: CustomItem[];
  bestScore: number;
  balloonPops: Record<string, number>; // date -> balloons popped that day
  lastSeenLevel: number;
  hasSeenOnboarding: boolean;
  trustedContact: TrustedContact | null;
  reminderEnabled: boolean;
  reminderHour: number;
}
