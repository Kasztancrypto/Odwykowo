import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import AvatarDisplay from '../components/AvatarDisplay';
import LevelUpModal from '../components/LevelUpModal';
import { colors, spacing } from '../theme';

export default function HomeAvatarScreen() {
  const { derived, data, acknowledgeLevel } = useApp();
  const { streak, levelInfo, progressToNext, savings, totalCleanDays, score, currentRate } = derived;
  const [levelUpVisible, setLevelUpVisible] = useState(false);

  useEffect(() => {
    if (levelInfo.level > data.lastSeenLevel) {
      setLevelUpVisible(true);
    }
  }, [levelInfo.level, data.lastSeenLevel]);

  const closeLevelUp = () => {
    setLevelUpVisible(false);
    acknowledgeLevel(levelInfo.level);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.appTitle}>Odwykowo</Text>

        <View style={styles.avatarCard}>
          <Text style={styles.lvlBadge}>LVL {levelInfo.level + 1}</Text>
          <AvatarDisplay level={levelInfo.level} size={220} />
          <Text style={styles.levelTitle}>{levelInfo.title.toUpperCase()}</Text>
          <Text style={styles.levelDescription}>{levelInfo.description}</Text>

          {levelInfo.nextThreshold && (
            <View style={styles.progressWrap}>
              <View style={styles.progressBarBg}>
                <View
                  style={[
                    styles.progressBarFill,
                    { width: `${Math.round(progressToNext * 100)}%` },
                  ]}
                />
              </View>
              <Text style={styles.progressLabel}>
                Jeszcze {Math.max(0, levelInfo.nextThreshold - score)} pkt do kolejnego etapu
              </Text>
            </View>
          )}
        </View>

        <View style={styles.scoreCard}>
          <View>
            <Text style={styles.scoreLabel}>WYNIK</Text>
            <Text style={styles.scoreValue}>{score} pkt</Text>
          </View>
          <View style={styles.scoreRight}>
            <Text style={styles.scoreBest}>Rekord: {data.bestScore} pkt</Text>
            <Text style={styles.scoreRate}>+{currentRate} pkt / dzień</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{streak}</Text>
            <Text style={styles.statLabel}>dni z rzędu</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{totalCleanDays}</Text>
            <Text style={styles.statLabel}>czystych dni</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={[styles.statValue, { color: colors.gold }]}>{savings} zł</Text>
            <Text style={styles.statLabel}>zaoszczędzone</Text>
          </View>
        </View>
      </ScrollView>

      <LevelUpModal
        visible={levelUpVisible}
        level={levelInfo.level}
        title={levelInfo.title}
        description={levelInfo.description}
        onClose={closeLevelUp}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  appTitle: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: '700',
    marginBottom: spacing.lg,
  },
  avatarCard: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: spacing.lg,
    alignItems: 'center',
    width: '100%',
  },
  lvlBadge: {
    color: colors.gold,
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: spacing.xs,
  },
  levelTitle: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 1,
    marginTop: spacing.md,
  },
  levelDescription: {
    color: colors.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    marginTop: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  progressWrap: {
    width: '100%',
    marginTop: spacing.lg,
  },
  progressBarBg: {
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.surfaceLight,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
  progressLabel: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  scoreCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.md,
    width: '100%',
    marginTop: spacing.lg,
  },
  scoreLabel: {
    color: colors.textSecondary,
    fontSize: 11,
    letterSpacing: 1,
  },
  scoreValue: {
    color: colors.purple,
    fontSize: 24,
    fontWeight: '800',
  },
  scoreRight: {
    alignItems: 'flex-end',
  },
  scoreBest: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  scoreRate: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: spacing.lg,
  },
  statBox: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.md,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: spacing.xs,
  },
  statValue: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '700',
  },
  statLabel: {
    color: colors.textSecondary,
    fontSize: 11,
    marginTop: 2,
    textAlign: 'center',
  },
});
