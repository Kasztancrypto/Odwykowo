import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { DAILY_BALLOON_CAP } from '../context/AppContext';
import MotivationCard from '../components/MotivationCard';
import BreathingExercise from '../components/BreathingExercise';
import BalloonPop from '../components/BalloonPop';
import { DEFAULT_CARDS } from '../data/motivationalCards';
import { COPING_TASKS } from '../data/copingTasks';
import { colors, spacing } from '../theme';

export default function SOSScreen() {
  const { data, derived, addCardRevealed, popBalloon } = useApp();
  const [breathingVisible, setBreathingVisible] = useState(false);
  const [task, setTask] = useState<string | null>(null);

  const allCards = useMemo(
    () => [...DEFAULT_CARDS, ...data.customCards.map((c) => c.text)],
    [data.customCards]
  );

  const drawTask = () => {
    const next = COPING_TASKS[Math.floor(Math.random() * COPING_TASKS.length)];
    setTask(next);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>SOS</Text>

        <View style={styles.banner}>
          <Text style={styles.bannerText}>
            To tylko pokusa - chwilowa i przemijająca. Masz ich ograniczoną liczbę do pokonania.
            Z każdą wygraną myślą jesteś bliżej wolności.
          </Text>
        </View>

        <View style={styles.toolsRow}>
          <TouchableOpacity style={styles.breathingButton} onPress={() => setBreathingVisible(true)}>
            <Text style={styles.toolButtonText}>💨 Oddech</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.taskButton} onPress={drawTask}>
            <Text style={styles.toolButtonText}>🎯 Zadanie</Text>
          </TouchableOpacity>
        </View>

        {task && (
          <View style={styles.taskCard}>
            <Text style={styles.taskText}>{task}</Text>
          </View>
        )}

        {data.trustedContact && (
          <View style={styles.contactRow}>
            <TouchableOpacity
              style={styles.contactButton}
              onPress={() => Linking.openURL(`tel:${data.trustedContact!.phone}`)}
            >
              <Text style={styles.contactButtonText}>📞 Zadzwoń do {data.trustedContact.name}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.contactButtonSecondary}
              onPress={() => Linking.openURL(`sms:${data.trustedContact!.phone}`)}
            >
              <Text style={styles.contactButtonSecondaryText}>💬 Napisz SMS</Text>
            </TouchableOpacity>
          </View>
        )}

        <MotivationCard items={allCards} onReveal={addCardRevealed} />

        <View style={styles.balloonSection}>
          <Text style={styles.balloonTitle}>Przebij balonik za każdą wygraną myśl</Text>
          <Text style={styles.balloonSubtitle}>
            Zostało dziś: {derived.balloonsRemainingToday} / {DAILY_BALLOON_CAP}
          </Text>
          <BalloonPop
            total={DAILY_BALLOON_CAP}
            poppedCount={derived.balloonsPoppedToday}
            onPop={popBalloon}
          />
          {derived.balloonsRemainingToday === 0 && (
            <Text style={styles.balloonDoneText}>
              Wygrałeś dziś wszystkie starcia! Wróć jutro po nowe baloniki.
            </Text>
          )}
          <Text style={styles.balloonTotal}>
            Łącznie pokonanych pokus: {derived.totalBalloonsPopped}
          </Text>
        </View>
      </ScrollView>

      <BreathingExercise visible={breathingVisible} onClose={() => setBreathingVisible(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: { padding: spacing.lg, alignItems: 'center' },
  title: {
    color: colors.red,
    fontSize: 26,
    fontWeight: '800',
    alignSelf: 'flex-start',
    marginBottom: spacing.sm,
  },
  banner: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.md,
    width: '100%',
    borderWidth: 1,
    borderColor: colors.red,
    marginBottom: spacing.lg,
  },
  bannerText: {
    color: colors.textPrimary,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  toolsRow: {
    flexDirection: 'row',
    width: '100%',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  breathingButton: {
    flex: 1,
    backgroundColor: colors.blue,
    borderRadius: 14,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  taskButton: {
    flex: 1,
    backgroundColor: colors.gold,
    borderRadius: 14,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  toolButtonText: {
    color: '#08202E',
    fontWeight: '700',
    fontSize: 15,
  },
  taskCard: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: spacing.md,
    width: '100%',
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.gold,
  },
  taskText: {
    color: colors.textPrimary,
    fontSize: 14,
    textAlign: 'center',
  },
  contactRow: {
    width: '100%',
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  contactButton: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  contactButtonText: {
    color: '#08210F',
    fontWeight: '700',
    fontSize: 15,
  },
  contactButtonSecondary: {
    borderRadius: 14,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.surfaceLight,
  },
  contactButtonSecondaryText: {
    color: colors.textPrimary,
    fontWeight: '600',
  },
  balloonSection: {
    marginTop: spacing.xl,
    width: '100%',
    alignItems: 'center',
  },
  balloonTitle: {
    color: colors.textPrimary,
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
  },
  balloonSubtitle: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },
  balloonDoneText: {
    color: colors.primary,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  balloonTotal: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: spacing.lg,
  },
});
