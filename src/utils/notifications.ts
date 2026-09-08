import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

const REMINDER_TEXTS = [
  'Zapisz dzisiejszy dzień - jak Ci poszło?',
  'Jeszcze minutka na wpis w dzienniku - Twoja passa na Ciebie czeka.',
  'Sprawdź swój wynik i zapisz dzień w Odwykowo.',
];

export async function enableDailyReminder(hour: number): Promise<boolean> {
  if (Platform.OS === 'web') return false;

  const current = await Notifications.getPermissionsAsync();
  let granted = current.status === 'granted';
  if (!granted) {
    const requested = await Notifications.requestPermissionsAsync();
    granted = requested.status === 'granted';
  }
  if (!granted) return false;

  await Notifications.cancelAllScheduledNotificationsAsync();
  const body = REMINDER_TEXTS[Math.floor(Math.random() * REMINDER_TEXTS.length)];
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Odwykowo',
      body,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour,
      minute: 0,
    },
  });
  return true;
}

export async function disableDailyReminder(): Promise<void> {
  if (Platform.OS === 'web') return;
  await Notifications.cancelAllScheduledNotificationsAsync();
}
