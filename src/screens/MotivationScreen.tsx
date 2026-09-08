import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import MotivationCard from '../components/MotivationCard';
import { DEFAULT_CARDS } from '../data/motivationalCards';
import { colors, spacing } from '../theme';

export default function MotivationScreen() {
  const { data, addCardRevealed, addCustomCard, removeCustomCard, addReason, removeReason } = useApp();
  const [newText, setNewText] = useState('');
  const [manageOpen, setManageOpen] = useState(false);
  const [newReason, setNewReason] = useState('');

  const allCards = useMemo(
    () => [...DEFAULT_CARDS, ...data.customCards.map((c) => c.text)],
    [data.customCards]
  );

  const handleAddCustom = () => {
    const trimmed = newText.trim();
    if (trimmed.length === 0) return;
    addCustomCard(trimmed);
    setNewText('');
  };

  const handleAddReason = () => {
    const trimmed = newReason.trim();
    if (trimmed.length === 0) return;
    addReason(trimmed);
    setNewReason('');
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Kartki motywacyjne</Text>
        <Text style={styles.subtitle}>
          Masz chwilę słabości? Przeczytaj swoje powody, odkryj kartę, albo wejdź do zakładki SOS.
        </Text>

        <View style={styles.reasonsCard}>
          <Text style={styles.reasonsTitle}>Moje powody</Text>
          {data.myReasons.length === 0 ? (
            <Text style={styles.emptyText}>
              Nie zapisałeś jeszcze żadnego powodu. Dodaj chociaż jeden - przyda się w trudnej chwili.
            </Text>
          ) : (
            data.myReasons.map((r) => (
              <View key={r.id} style={styles.reasonRow}>
                <Text style={styles.reasonBullet}>•</Text>
                <Text style={styles.reasonText}>{r.text}</Text>
                <TouchableOpacity onPress={() => removeReason(r.id)}>
                  <Text style={styles.removeText}>Usuń</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
          <View style={styles.addRow}>
            <TextInput
              style={styles.input}
              placeholder="Dodaj powód, dla którego rzucasz..."
              placeholderTextColor={colors.textSecondary}
              value={newReason}
              onChangeText={setNewReason}
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAddReason}>
              <Text style={styles.addButtonText}>Dodaj</Text>
            </TouchableOpacity>
          </View>
        </View>

        <MotivationCard items={allCards} onReveal={addCardRevealed} />

        <TouchableOpacity style={styles.manageToggle} onPress={() => setManageOpen((v) => !v)}>
          <Text style={styles.manageToggleText}>
            {manageOpen ? 'Ukryj zarządzanie kartami' : 'Dodaj własną kartę'}
          </Text>
        </TouchableOpacity>

        {manageOpen && (
          <View style={styles.manageCard}>
            <View style={styles.addRow}>
              <TextInput
                style={styles.input}
                placeholder="Wpisz własny cytat lub przypomnienie..."
                placeholderTextColor={colors.textSecondary}
                value={newText}
                onChangeText={setNewText}
                multiline
              />
              <TouchableOpacity style={styles.addButton} onPress={handleAddCustom}>
                <Text style={styles.addButtonText}>Dodaj</Text>
              </TouchableOpacity>
            </View>
            {data.customCards.length === 0 ? (
              <Text style={styles.emptyText}>Nie dodano jeszcze własnych kart.</Text>
            ) : (
              data.customCards.map((c) => (
                <View key={c.id} style={styles.customRow}>
                  <Text style={styles.customText}>{c.text}</Text>
                  <TouchableOpacity onPress={() => removeCustomCard(c.id)}>
                    <Text style={styles.removeText}>Usuń</Text>
                  </TouchableOpacity>
                </View>
              ))
            )}
          </View>
        )}

        <Text style={styles.sectionTitle}>Ostatnio odkryte</Text>
        {data.cardHistory.length === 0 ? (
          <Text style={styles.emptyText}>Jeszcze nic nie odkryłeś.</Text>
        ) : (
          data.cardHistory.slice(0, 15).map((c) => (
            <View key={c.id} style={styles.historyRow}>
              <Text style={styles.historyDate}>
                {new Date(c.date).toLocaleDateString('pl-PL')}
              </Text>
              <Text style={styles.historyText}>{c.text}</Text>
            </View>
          ))
        )}
      </ScrollView>
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
    alignSelf: 'flex-start',
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 13,
    alignSelf: 'flex-start',
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
  },
  reasonsCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.md,
    width: '100%',
    marginBottom: spacing.lg,
  },
  reasonsTitle: {
    color: colors.textPrimary,
    fontWeight: '700',
    fontSize: 16,
    marginBottom: spacing.sm,
  },
  reasonRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.xs,
  },
  reasonBullet: {
    color: colors.primary,
    marginRight: spacing.xs,
    fontSize: 14,
  },
  reasonText: {
    color: colors.textPrimary,
    flex: 1,
    fontSize: 14,
  },
  manageToggle: {
    marginTop: spacing.lg,
  },
  manageToggleText: {
    color: colors.blue,
    fontWeight: '600',
  },
  manageCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.md,
    width: '100%',
    marginTop: spacing.md,
  },
  addRow: {
    flexDirection: 'row',
    marginTop: spacing.sm,
  },
  input: {
    flex: 1,
    backgroundColor: colors.surfaceLight,
    borderRadius: 10,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    color: colors.textPrimary,
    marginRight: spacing.sm,
    minHeight: 44,
  },
  addButton: {
    backgroundColor: colors.purple,
    borderRadius: 10,
    paddingHorizontal: spacing.md,
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
  customRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.xs,
    borderTopWidth: 1,
    borderTopColor: colors.surfaceLight,
  },
  customText: {
    color: colors.textPrimary,
    flex: 1,
    marginRight: spacing.sm,
  },
  removeText: {
    color: colors.red,
    fontSize: 12,
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontStyle: 'italic',
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
    alignSelf: 'flex-start',
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  historyRow: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.sm,
    width: '100%',
    marginBottom: spacing.xs,
  },
  historyDate: {
    color: colors.textSecondary,
    fontSize: 11,
  },
  historyText: {
    color: colors.textPrimary,
    marginTop: 2,
  },
});
