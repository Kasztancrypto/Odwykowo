import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, DateData } from 'react-native-calendars';
import { useApp } from '../context/AppContext';
import DayEntryModal from '../components/DayEntryModal';
import MoodTrendChart from '../components/MoodTrendChart';
import { colors, spacing } from '../theme';
import { todayStr, formatDatePretty } from '../utils/dateUtils';
import { TRIGGER_TAGS } from '../data/triggers';

export default function CalendarScreen() {
  const { data, upsertEntry, deleteEntry } = useApp();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const markedDates = useMemo(() => {
    const marks: Record<string, any> = {};
    Object.values(data.entries).forEach((entry) => {
      marks[entry.date] = {
        marked: true,
        dotColor: entry.relapsed ? colors.red : colors.primary,
        selected: false,
      };
    });
    return marks;
  }, [data.entries]);

  const triggerStats = useMemo(() => {
    const counts: Record<string, number> = {};
    Object.values(data.entries).forEach((entry) => {
      (entry.triggers ?? []).forEach((id) => {
        counts[id] = (counts[id] ?? 0) + 1;
      });
    });
    return TRIGGER_TAGS
      .map((t) => ({ ...t, count: counts[t.id] ?? 0 }))
      .filter((t) => t.count > 0)
      .sort((a, b) => b.count - a.count);
  }, [data.entries]);

  const journalEntries = useMemo(() => {
    return Object.values(data.entries)
      .filter((e) => e.journal.trim().length > 0)
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [data.entries]);

  const openDay = (date: string) => {
    setSelectedDate(date);
    setModalVisible(true);
  };

  const onDayPress = (day: DateData) => {
    setSelectedDate(day.dateString);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Kalendarz i dziennik</Text>
        <Calendar
          maxDate={todayStr()}
          onDayPress={onDayPress}
          markedDates={{
            ...markedDates,
            ...(selectedDate
              ? { [selectedDate]: { ...(markedDates[selectedDate] || {}), selected: true, selectedColor: colors.surfaceLight } }
              : {}),
          }}
          theme={{
            backgroundColor: colors.background,
            calendarBackground: colors.background,
            textSectionTitleColor: colors.textSecondary,
            dayTextColor: colors.textPrimary,
            todayTextColor: colors.gold,
            monthTextColor: colors.textPrimary,
            arrowColor: colors.primary,
            selectedDayBackgroundColor: colors.surfaceLight,
            selectedDayTextColor: colors.textPrimary,
            textDisabledColor: colors.surfaceLight,
            dotColor: colors.primary,
          }}
          style={styles.calendar}
        />

        <View style={styles.legendRow}>
          <View style={styles.legendItem}>
            <View style={[styles.dot, { backgroundColor: colors.primary }]} />
            <Text style={styles.legendText}>Czysty dzień</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.dot, { backgroundColor: colors.red }]} />
            <Text style={styles.legendText}>Wpadka</Text>
          </View>
        </View>

        <Text style={styles.hint}>Stuknij dowolny dzień, aby dodać wpis do dziennika.</Text>

        <View style={styles.trendCard}>
          <Text style={styles.trendTitle}>Trend ostatnich 14 dni</Text>
          <MoodTrendChart entries={data.entries} />
        </View>

        {triggerStats.length > 0 && (
          <View style={styles.triggerStatsCard}>
            <Text style={styles.triggerStatsTitle}>Twoje najczęstsze wyzwalacze</Text>
            {triggerStats.slice(0, 5).map((t) => (
              <View key={t.id} style={styles.triggerStatRow}>
                <Text style={styles.triggerStatLabel}>
                  {t.emoji} {t.label}
                </Text>
                <Text style={styles.triggerStatCount}>{t.count}x</Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.journalSection}>
          <Text style={styles.journalTitle}>Twoje notatki</Text>
          {journalEntries.length === 0 ? (
            <Text style={styles.journalEmpty}>
              Jeszcze nic nie zapisałeś. Otwórz dowolny dzień i napisz, co czujesz.
            </Text>
          ) : (
            journalEntries.map((entry) => (
              <TouchableOpacity
                key={entry.date}
                style={styles.journalRow}
                onPress={() => openDay(entry.date)}
              >
                <View style={styles.journalRowHeader}>
                  <Text style={styles.journalDate}>{formatDatePretty(entry.date)}</Text>
                  <View
                    style={[
                      styles.journalDot,
                      { backgroundColor: entry.relapsed ? colors.red : colors.primary },
                    ]}
                  />
                </View>
                <Text style={styles.journalText} numberOfLines={3}>
                  {entry.journal}
                </Text>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>

      <DayEntryModal
        visible={modalVisible}
        date={selectedDate}
        existingEntry={selectedDate ? data.entries[selectedDate] : undefined}
        onClose={() => setModalVisible(false)}
        onSave={upsertEntry}
        onDelete={deleteEntry}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: '700',
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  calendar: {
    marginHorizontal: spacing.md,
    borderRadius: 16,
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.md,
    gap: spacing.lg,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: spacing.xs,
  },
  legendText: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  hint: {
    color: colors.textSecondary,
    fontSize: 12,
    textAlign: 'center',
    marginTop: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  trendCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.md,
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
  },
  trendTitle: {
    color: colors.textPrimary,
    fontWeight: '700',
    fontSize: 15,
    marginBottom: spacing.sm,
  },
  triggerStatsCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.md,
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
  },
  triggerStatsTitle: {
    color: colors.textPrimary,
    fontWeight: '700',
    fontSize: 15,
    marginBottom: spacing.sm,
  },
  triggerStatRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
    borderTopWidth: 1,
    borderTopColor: colors.surfaceLight,
  },
  triggerStatLabel: {
    color: colors.textPrimary,
    fontSize: 13,
  },
  triggerStatCount: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  journalSection: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
  },
  journalTitle: {
    color: colors.textPrimary,
    fontWeight: '700',
    fontSize: 16,
    marginBottom: spacing.sm,
  },
  journalEmpty: {
    color: colors.textSecondary,
    fontSize: 13,
    fontStyle: 'italic',
  },
  journalRow: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  journalRowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  journalDate: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  journalDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  journalText: {
    color: colors.textPrimary,
    fontSize: 14,
    lineHeight: 19,
  },
});
