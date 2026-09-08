import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import PiggyBank from '../components/PiggyBank';
import { colors, spacing } from '../theme';

const MILESTONES = [
  { amount: 50, text: 'Kawa i ciastko dla siebie w dobrej kawiarni' },
  { amount: 100, text: 'Bilet do kina z przekąskami dla dwojga' },
  { amount: 250, text: 'Nowe, porządne słuchawki' },
  { amount: 500, text: 'Weekendowy wypad w góry lub nad wodę' },
  { amount: 1000, text: 'Nowy sprzęt sportowy albo rower' },
  { amount: 2500, text: 'Wymarzone wakacje' },
  { amount: 6570, text: 'Równowartość roku bez snusa - policz, ile to jest!' },
];

const SAVINGS_PER_DAY = 18;

export default function PiggyBankScreen() {
  const { data, derived, addSavingsGoal, removeSavingsGoal } = useApp();
  const { savings, totalCleanDays } = derived;

  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const nextMilestone = useMemo(
    () => MILESTONES.find((m) => m.amount > savings) ?? null,
    [savings]
  );

  const handleAddGoal = () => {
    const trimmedName = name.trim();
    const parsedPrice = parseFloat(price.replace(',', '.'));
    if (trimmedName.length === 0 || !Number.isFinite(parsedPrice) || parsedPrice <= 0) return;
    addSavingsGoal(trimmedName, parsedPrice);
    setName('');
    setPrice('');
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Skarbonka</Text>

        <View style={styles.card}>
          <PiggyBank size={160} />
          <Text style={styles.amount}>{savings} zł</Text>
          <Text style={styles.subtitle}>
            {totalCleanDays} {totalCleanDays === 1 ? 'czysty dzień' : 'czystych dni'} x 18 zł
          </Text>
        </View>

        <View style={styles.goalsHeaderRow}>
          <Text style={styles.sectionTitle}>Twoje zachcianki</Text>
          <TouchableOpacity style={styles.addGoalButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.addGoalButtonText}>+ Dodaj cel</Text>
          </TouchableOpacity>
        </View>

        {data.savingsGoals.length === 0 ? (
          <Text style={styles.emptyText}>
            Nie masz jeszcze żadnej zachcianki. Dodaj coś, na co chcesz sobie zaoszczędzić - to
            świetna dodatkowa motywacja.
          </Text>
        ) : (
          data.savingsGoals.map((goal) => {
            const percent = Math.min(100, (savings / goal.price) * 100);
            const remaining = Math.max(0, goal.price - savings);
            const daysLeft = Math.ceil(remaining / SAVINGS_PER_DAY);
            const achieved = savings >= goal.price;
            return (
              <View key={goal.id} style={styles.goalCard}>
                <PiggyBank size={70} fillPercent={percent} />
                <View style={styles.goalInfo}>
                  <Text style={styles.goalName}>{goal.name}</Text>
                  <Text style={styles.goalPrice}>{goal.price} zł</Text>
                  <View style={styles.progressBarBg}>
                    <View style={[styles.progressBarFill, { width: `${percent}%` }]} />
                  </View>
                  <Text style={styles.goalStatus}>
                    {achieved
                      ? 'Cel osiągnięty! 🎉'
                      : `${Math.round(percent)}% - jeszcze ${daysLeft} ${daysLeft === 1 ? 'dzień' : 'dni'}`}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => removeSavingsGoal(goal.id)}>
                  <Text style={styles.removeText}>Usuń</Text>
                </TouchableOpacity>
              </View>
            );
          })
        )}

        {nextMilestone && (
          <View style={styles.milestoneCard}>
            <Text style={styles.milestoneTitle}>Podpowiedź</Text>
            <View style={styles.progressBarBg}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${Math.min(100, (savings / nextMilestone.amount) * 100)}%` },
                ]}
              />
            </View>
            <Text style={styles.milestoneText}>
              {savings} / {nextMilestone.amount} zł - {nextMilestone.text}
            </Text>
          </View>
        )}

        <Text style={styles.sectionTitle}>Co możesz sobie sprawić</Text>
        {MILESTONES.map((m) => (
          <View key={m.amount} style={styles.row}>
            <Text
              style={[
                styles.rowAmount,
                savings >= m.amount && { color: colors.gold },
              ]}
            >
              {m.amount} zł
            </Text>
            <Text style={styles.rowText}>{m.text}</Text>
            {savings >= m.amount && <Text style={styles.check}>✓</Text>}
          </View>
        ))}
      </ScrollView>

      <Modal visible={modalVisible} animationType="slide" transparent onRequestClose={() => setModalVisible(false)}>
        <KeyboardAvoidingView
          style={styles.backdrop}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={styles.sheet}>
            <Text style={styles.sheetTitle}>Nowa zachcianka</Text>
            <Text style={styles.sheetHint}>
              Pamiętaj: to ma być zachcianka, przyjemność dla siebie - nie coś niezbędnego. To
              nagroda za trzymanie się z dala od snusa.
            </Text>
            <Text style={styles.label}>Na co zbierasz?</Text>
            <TextInput
              style={styles.input}
              placeholder="np. nowe słuchawki"
              placeholderTextColor={colors.textSecondary}
              value={name}
              onChangeText={setName}
            />
            <Text style={styles.label}>Cena (zł)</Text>
            <TextInput
              style={styles.input}
              placeholder="np. 250"
              placeholderTextColor={colors.textSecondary}
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleAddGoal}>
              <Text style={styles.saveButtonText}>Dodaj cel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Anuluj</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: { padding: spacing.lg, alignItems: 'center' },
  title: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: '700',
    marginBottom: spacing.lg,
    alignSelf: 'flex-start',
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: spacing.lg,
    alignItems: 'center',
    width: '100%',
  },
  amount: {
    color: colors.gold,
    fontSize: 36,
    fontWeight: '800',
    marginTop: spacing.sm,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: spacing.xs,
  },
  goalsHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: spacing.lg,
  },
  addGoalButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  addGoalButtonText: {
    color: '#08210F',
    fontWeight: '700',
    fontSize: 12,
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontStyle: 'italic',
    alignSelf: 'flex-start',
  },
  goalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.sm,
    width: '100%',
    marginBottom: spacing.sm,
  },
  goalInfo: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  goalName: {
    color: colors.textPrimary,
    fontWeight: '700',
    fontSize: 14,
  },
  goalPrice: {
    color: colors.textSecondary,
    fontSize: 12,
    marginBottom: spacing.xs,
  },
  goalStatus: {
    color: colors.textSecondary,
    fontSize: 11,
    marginTop: spacing.xs,
  },
  removeText: {
    color: colors.red,
    fontSize: 12,
    marginLeft: spacing.sm,
  },
  milestoneCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.md,
    width: '100%',
    marginTop: spacing.lg,
  },
  milestoneTitle: {
    color: colors.textPrimary,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  progressBarBg: {
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.surfaceLight,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.gold,
    borderRadius: 5,
  },
  milestoneText: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: spacing.xs,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
    alignSelf: 'flex-start',
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.sm,
    width: '100%',
    marginBottom: spacing.xs,
  },
  rowAmount: {
    color: colors.textPrimary,
    fontWeight: '700',
    width: 70,
  },
  rowText: {
    color: colors.textSecondary,
    flex: 1,
    fontSize: 13,
  },
  check: {
    color: colors.primary,
    fontWeight: '700',
    marginLeft: spacing.xs,
  },
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: spacing.lg,
  },
  sheetTitle: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  sheetHint: {
    color: colors.textSecondary,
    fontSize: 13,
    marginBottom: spacing.md,
  },
  label: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: spacing.xs,
    marginTop: spacing.sm,
  },
  input: {
    backgroundColor: colors.surfaceLight,
    borderRadius: 12,
    padding: spacing.md,
    color: colors.textPrimary,
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  saveButtonText: {
    color: '#08210F',
    fontWeight: '700',
    fontSize: 16,
  },
  cancelButton: {
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: colors.textSecondary,
  },
});
