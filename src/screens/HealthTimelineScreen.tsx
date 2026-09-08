import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { RECOVERY_TIMELINE } from '../data/recoveryTimeline';
import { colors, spacing } from '../theme';

export default function HealthTimelineScreen() {
  const { derived } = useApp();
  const elapsedMinutes = derived.streak * 24 * 60;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Oś czasu regeneracji</Text>
        <Text style={styles.subtitle}>
          Ogólne, edukacyjne informacje o tym, jak organizm reaguje na odstawienie nikotyny - to
          nie jest porada medyczna, a Twoje odczucia mogą się różnić.
        </Text>

        <View style={styles.timeline}>
          {RECOVERY_TIMELINE.map((m, i) => {
            const reached = elapsedMinutes >= m.minutesSinceQuit;
            return (
              <View key={i} style={styles.itemRow}>
                <View style={styles.markerColumn}>
                  <View style={[styles.marker, reached && styles.markerReached]}>
                    {reached && <Text style={styles.markerCheck}>✓</Text>}
                  </View>
                  {i < RECOVERY_TIMELINE.length - 1 && (
                    <View style={[styles.line, reached && styles.lineReached]} />
                  )}
                </View>
                <View style={[styles.itemCard, reached && styles.itemCardReached]}>
                  <Text style={[styles.itemLabel, reached && styles.itemLabelReached]}>
                    {m.label}
                  </Text>
                  <Text style={styles.itemDescription}>{m.description}</Text>
                </View>
              </View>
            );
          })}
        </View>
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
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
  },
  timeline: {
    width: '100%',
  },
  itemRow: {
    flexDirection: 'row',
  },
  markerColumn: {
    alignItems: 'center',
    marginRight: spacing.md,
  },
  marker: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerReached: {
    backgroundColor: colors.primary,
  },
  markerCheck: {
    color: '#08210F',
    fontWeight: '700',
    fontSize: 12,
  },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: colors.surfaceLight,
    marginVertical: 2,
  },
  lineReached: {
    backgroundColor: colors.primary,
  },
  itemCard: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: spacing.md,
    flex: 1,
    marginBottom: spacing.md,
  },
  itemCardReached: {
    borderWidth: 1,
    borderColor: colors.primary,
  },
  itemLabel: {
    color: colors.textSecondary,
    fontWeight: '700',
    fontSize: 14,
    marginBottom: 2,
  },
  itemLabelReached: {
    color: colors.primary,
  },
  itemDescription: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
  },
});
