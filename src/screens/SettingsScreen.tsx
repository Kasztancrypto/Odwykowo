import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Switch,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import * as DocumentPicker from 'expo-document-picker';
import { useApp } from '../context/AppContext';
import { colors, spacing } from '../theme';
import { enableDailyReminder, disableDailyReminder } from '../utils/notifications';

const REMINDER_HOURS = [18, 19, 20, 21, 22];

export default function SettingsScreen() {
  const { data, setTrustedContact, clearTrustedContact, setReminderSettings, replaceData } = useApp();
  const [contactName, setContactName] = useState(data.trustedContact?.name ?? '');
  const [contactPhone, setContactPhone] = useState(data.trustedContact?.phone ?? '');

  const handleSaveContact = () => {
    const name = contactName.trim();
    const phone = contactPhone.trim();
    if (name.length === 0 || phone.length === 0) return;
    setTrustedContact({ name, phone });
    Alert.alert('Zapisano', 'Zaufany kontakt zostanie pokazany w zakładce SOS.');
  };

  const handleToggleReminder = async (value: boolean) => {
    if (Platform.OS === 'web') {
      Alert.alert('Niedostępne', 'Powiadomienia działają tylko na telefonie, nie w przeglądarce.');
      return;
    }
    if (value) {
      const ok = await enableDailyReminder(data.reminderHour);
      if (!ok) {
        Alert.alert(
          'Brak zgody',
          'Nie udało się włączyć przypomnień - sprawdź uprawnienia powiadomień dla aplikacji w ustawieniach telefonu.'
        );
        return;
      }
      setReminderSettings(true, data.reminderHour);
    } else {
      await disableDailyReminder();
      setReminderSettings(false, data.reminderHour);
    }
  };

  const handleChangeHour = async (hour: number) => {
    setReminderSettings(data.reminderEnabled, hour);
    if (data.reminderEnabled && Platform.OS !== 'web') {
      await enableDailyReminder(hour);
    }
  };

  const handleExport = async () => {
    try {
      const json = JSON.stringify(data, null, 2);
      if (Platform.OS === 'web') {
        Alert.alert('Niedostępne', 'Eksport plików działa tylko na telefonie.');
        return;
      }
      const fileUri = FileSystem.cacheDirectory + 'odwykowo-backup.json';
      await FileSystem.writeAsStringAsync(fileUri, json, { encoding: FileSystem.EncodingType.UTF8 });
      const canShare = await Sharing.isAvailableAsync();
      if (canShare) {
        await Sharing.shareAsync(fileUri, { mimeType: 'application/json', dialogTitle: 'Kopia zapasowa Odwykowo' });
      } else {
        Alert.alert('Zapisano', `Plik zapisany w: ${fileUri}`);
      }
    } catch {
      Alert.alert('Błąd', 'Nie udało się wyeksportować danych.');
    }
  };

  const handleImport = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: 'application/json' });
      if (result.canceled || !result.assets?.[0]) return;
      const content = await FileSystem.readAsStringAsync(result.assets[0].uri);
      const parsed = JSON.parse(content);
      const ok = replaceData(parsed);
      if (ok) {
        Alert.alert('Zaimportowano', 'Dane zostały wczytane z kopii zapasowej.');
      } else {
        Alert.alert('Błąd', 'Ten plik nie wygląda na poprawną kopię zapasową Odwykowo.');
      }
    } catch {
      Alert.alert('Błąd', 'Nie udało się wczytać pliku.');
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Ustawienia</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Zaufany kontakt (SOS)</Text>
          <Text style={styles.cardHint}>
            Ta osoba pojawi się jako przycisk szybkiego kontaktu w zakładce SOS.
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Imię"
            placeholderTextColor={colors.textSecondary}
            value={contactName}
            onChangeText={setContactName}
          />
          <TextInput
            style={styles.input}
            placeholder="Numer telefonu"
            placeholderTextColor={colors.textSecondary}
            value={contactPhone}
            onChangeText={setContactPhone}
            keyboardType="phone-pad"
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveContact}>
            <Text style={styles.saveButtonText}>Zapisz kontakt</Text>
          </TouchableOpacity>
          {data.trustedContact && (
            <TouchableOpacity onPress={clearTrustedContact}>
              <Text style={styles.removeText}>Usuń zaufany kontakt</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <Text style={styles.cardTitle}>Codzienne przypomnienie</Text>
            <Switch
              value={data.reminderEnabled}
              onValueChange={handleToggleReminder}
              trackColor={{ false: colors.surfaceLight, true: colors.primary }}
              thumbColor="#fff"
            />
          </View>
          <Text style={styles.cardHint}>Powiadomienie o zapisaniu dnia w dzienniku.</Text>
          <View style={styles.hourRow}>
            {REMINDER_HOURS.map((h) => (
              <TouchableOpacity
                key={h}
                style={[styles.hourChip, data.reminderHour === h && styles.hourChipSelected]}
                onPress={() => handleChangeHour(h)}
              >
                <Text
                  style={[styles.hourChipText, data.reminderHour === h && styles.hourChipTextSelected]}
                >
                  {h}:00
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Kopia zapasowa</Text>
          <Text style={styles.cardHint}>
            Wszystkie dane trzymane są tylko na tym telefonie. Zrób kopię, żeby nie stracić
            postępów przy zmianie telefonu.
          </Text>
          <TouchableOpacity style={styles.saveButton} onPress={handleExport}>
            <Text style={styles.saveButtonText}>Eksportuj dane</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={handleImport}>
            <Text style={styles.secondaryButtonText}>Importuj z pliku</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>Odwykowo · v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: { padding: spacing.lg },
  title: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: '700',
    marginBottom: spacing.lg,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  cardTitle: {
    color: colors.textPrimary,
    fontWeight: '700',
    fontSize: 16,
  },
  cardHint: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    backgroundColor: colors.surfaceLight,
    borderRadius: 10,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    color: colors.textPrimary,
    marginTop: spacing.xs,
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  saveButtonText: {
    color: '#08210F',
    fontWeight: '700',
  },
  secondaryButton: {
    borderRadius: 12,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    marginTop: spacing.sm,
    borderWidth: 1,
    borderColor: colors.surfaceLight,
  },
  secondaryButtonText: {
    color: colors.textPrimary,
    fontWeight: '600',
  },
  removeText: {
    color: colors.red,
    fontSize: 12,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  hourRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  hourChip: {
    backgroundColor: colors.surfaceLight,
    borderRadius: 12,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  hourChipSelected: {
    backgroundColor: colors.primary,
  },
  hourChipText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  hourChipTextSelected: {
    color: '#08210F',
  },
  footer: {
    color: colors.textSecondary,
    fontSize: 11,
    textAlign: 'center',
    marginTop: spacing.md,
  },
});
