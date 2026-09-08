import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '../theme';

interface Props {
  onDone: () => void;
}

const TABS = [
  { icon: 'leaf', color: colors.primary, name: 'Awatar', desc: 'Twoja postać rośnie z każdym punktem - od Cwela do Nieśmiertelnego.' },
  { icon: 'alert-circle', color: colors.red, name: 'SOS', desc: 'Wejdź tu w chwili kryzysu: oddech, zadanie, kartka i baloniki do przebicia.' },
  { icon: 'calendar', color: colors.blue, name: 'Kalendarz', desc: 'Codzienny dziennik - samopoczucie, pokusa, notatki i wyzwalacze.' },
  { icon: 'pulse', color: colors.purple, name: 'Zdrowie', desc: 'Oś czasu regeneracji organizmu od momentu ostatniego kontaktu z nikotyną.' },
  { icon: 'wallet', color: colors.gold, name: 'Skarbonka', desc: '18 zł za każdy czysty dzień - odkładaj na własne zachcianki.' },
  { icon: 'sync-circle', color: colors.red, name: 'Kary', desc: 'Zjadłeś snusa? Zakręć kołem i przyjmij konsekwencje.' },
  { icon: 'sparkles', color: colors.purple, name: 'Kartki', desc: 'Twoje powody i kartki motywacyjne do przeglądania na spokojnie.' },
  { icon: 'settings', color: colors.textSecondary, name: 'Ustawienia', desc: 'Backup danych, przypomnienia i zaufany kontakt.' },
];

export default function OnboardingScreen({ onDone }: Props) {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Odwykowo</Text>
        <Text style={styles.subtitle}>
          Witaj. To Twoje osobiste narzędzie do wytrwania w drodze bez snusa. Oto co znajdziesz w
          aplikacji:
        </Text>

        {TABS.map((t) => (
          <View key={t.name} style={styles.row}>
            <View style={[styles.iconWrap, { backgroundColor: t.color + '22' }]}>
              <Ionicons name={t.icon as any} size={22} color={t.color} />
            </View>
            <View style={styles.rowText}>
              <Text style={styles.rowTitle}>{t.name}</Text>
              <Text style={styles.rowDesc}>{t.desc}</Text>
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.button} onPress={onDone}>
          <Text style={styles.buttonText}>Zaczynamy</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: { padding: spacing.lg, paddingBottom: spacing.xl },
  title: {
    color: colors.primary,
    fontSize: 30,
    fontWeight: '800',
    marginTop: spacing.lg,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
    lineHeight: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  rowText: {
    flex: 1,
  },
  rowTitle: {
    color: colors.textPrimary,
    fontWeight: '700',
    fontSize: 15,
  },
  rowDesc: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  buttonText: {
    color: '#08210F',
    fontWeight: '700',
    fontSize: 16,
  },
});
