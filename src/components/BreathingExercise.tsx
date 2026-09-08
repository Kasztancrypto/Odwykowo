import React, { useEffect, useRef, useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import { colors, spacing } from '../theme';

interface Props {
  visible: boolean;
  onClose: () => void;
}

const PHASES = [
  { label: 'Wdech', duration: 4000, scale: 1.4 },
  { label: 'Zatrzymaj', duration: 4000, scale: 1.4 },
  { label: 'Wydech', duration: 4000, scale: 0.8 },
  { label: 'Zatrzymaj', duration: 4000, scale: 0.8 },
];
const TOTAL_CYCLES = 4;

export default function BreathingExercise({ visible, onClose }: Props) {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [done, setDone] = useState(false);
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!visible) {
      if (timerRef.current) clearTimeout(timerRef.current);
      setPhaseIndex(0);
      setCycle(0);
      setDone(false);
      scaleAnim.setValue(0.8);
      return;
    }

    const runPhase = (pIndex: number, c: number) => {
      if (c >= TOTAL_CYCLES) {
        setDone(true);
        return;
      }
      setPhaseIndex(pIndex);
      setCycle(c);
      const phase = PHASES[pIndex];
      Animated.timing(scaleAnim, {
        toValue: phase.scale,
        duration: phase.duration,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start();

      timerRef.current = setTimeout(() => {
        const nextIndex = (pIndex + 1) % PHASES.length;
        const nextCycle = nextIndex === 0 ? c + 1 : c;
        runPhase(nextIndex, nextCycle);
      }, phase.duration);
    };

    runPhase(0, 0);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [visible]);

  return (
    <Modal visible={visible} animationType="fade" transparent onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.title}>Ćwiczenie oddechowe</Text>
          <Text style={styles.subtitle}>
            Pokusa zwykle mija po kilku minutach. Poczekaj ją razem z oddechem.
          </Text>

          {!done ? (
            <>
              <View style={styles.circleWrap}>
                <Animated.View
                  style={[styles.circle, { transform: [{ scale: scaleAnim }] }]}
                />
                <Text style={styles.phaseLabel}>{PHASES[phaseIndex].label}</Text>
              </View>
              <Text style={styles.cycleLabel}>
                Cykl {cycle + 1} / {TOTAL_CYCLES}
              </Text>
            </>
          ) : (
            <View style={styles.doneWrap}>
              <Text style={styles.doneText}>Brawo. Jak się teraz czujesz?</Text>
            </View>
          )}

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>{done ? 'Zamknij' : 'Przerwij'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const CIRCLE_SIZE = 140;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: spacing.xl,
    width: '100%',
    alignItems: 'center',
  },
  title: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '700',
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 13,
    textAlign: 'center',
    marginTop: spacing.xs,
    marginBottom: spacing.xl,
  },
  circleWrap: {
    width: CIRCLE_SIZE * 1.6,
    height: CIRCLE_SIZE * 1.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    position: 'absolute',
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: colors.blue,
    opacity: 0.35,
  },
  phaseLabel: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: '700',
  },
  cycleLabel: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: spacing.lg,
  },
  doneWrap: {
    height: CIRCLE_SIZE * 1.6 + 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneText: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  closeButton: {
    marginTop: spacing.xl,
    backgroundColor: colors.surfaceLight,
    borderRadius: 14,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xl,
  },
  closeButtonText: {
    color: colors.textPrimary,
    fontWeight: '600',
  },
});
