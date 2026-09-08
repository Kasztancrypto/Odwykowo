import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import PunishmentWheel from '../components/PunishmentWheel';
import { DEFAULT_PUNISHMENTS } from '../data/punishments';
import { colors, spacing } from '../theme';

export default function PunishmentScreen() {
  const { data, addPunishmentDrawn, addCustomPunishment, removeCustomPunishment } = useApp();
  const [newText, setNewText] = useState('');
  const [resultVisible, setResultVisible] = useState(false);
  const [resultText, setResultText] = useState('');
  const [manageOpen, setManageOpen] = useState(false);

  const allPunishments = useMemo(
    () => [...DEFAULT_PUNISHMENTS, ...data.customPunishments.map((c) => c.text)],
    [data.customPunishments]
  );

  const handleResult = (text: string) => {
    setResultText(text);
    setResultVisible(true);
    addPunishmentDrawn(text);
  };

  const handleAddCustom = () => {
    const trimmed = newText.trim();
    if (trimmed.length === 0) return;
    addCustomPunishment(trimmed);
    setNewText('');
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Koło kar</Text>
        <Text style={styles.subtitle}>Zjadłeś snusa? Zakręć kołem i przyjmij konsekwencje.</Text>

        <View style={styles.wheelCard}>
          <PunishmentWheel items={allPunishments} onResult={handleResult} size={250} />
        </View>

        <TouchableOpacity style={styles.manageToggle} onPress={() => setManageOpen((v) => !v)}>
          <Text style={styles.manageToggleText}>
            {manageOpen ? 'Ukryj zarządzanie karami' : 'Zarządzaj własnymi karami'}
          </Text>
        </TouchableOpacity>

        {manageOpen && (
          <View style={styles.manageCard}>
            <View style={styles.addRow}>
              <TextInput
                style={styles.input}
                placeholder="Dodaj własną karę..."
                placeholderTextColor={colors.textSecondary}
                value={newText}
                onChangeText={setNewText}
              />
              <TouchableOpacity style={styles.addButton} onPress={handleAddCustom}>
                <Text style={styles.addButtonText}>Dodaj</Text>
              </TouchableOpacity>
            </View>
            {data.customPunishments.length === 0 ? (
              <Text style={styles.emptyText}>Nie dodano jeszcze własnych kar.</Text>
            ) : (
              data.customPunishments.map((c) => (
                <View key={c.id} style={styles.customRow}>
                  <Text style={styles.customText}>{c.text}</Text>
                  <TouchableOpacity onPress={() => removeCustomPunishment(c.id)}>
                    <Text style={styles.removeText}>Usuń</Text>
                  </TouchableOpacity>
                </View>
              ))
            )}
          </View>
        )}

        <Text style={styles.sectionTitle}>Historia kar</Text>
        {data.punishmentHistory.length === 0 ? (
          <Text style={styles.emptyText}>Oby ta lista pozostała pusta jak najdłużej.</Text>
        ) : (
          data.punishmentHistory.map((p) => (
            <View key={p.id} style={styles.historyRow}>
              <Text style={styles.historyDate}>
                {new Date(p.date).toLocaleDateString('pl-PL')}
              </Text>
              <Text style={styles.historyText}>{p.text}</Text>
            </View>
          ))
        )}
      </ScrollView>

      <Modal visible={resultVisible} transparent animationType="fade">
        <View style={styles.resultBackdrop}>
          <View style={styles.resultCard}>
            <Text style={styles.resultLabel}>Twoja kara:</Text>
            <Text style={styles.resultText}>{resultText}</Text>
            <TouchableOpacity
              style={styles.resultButton}
              onPress={() => setResultVisible(false)}
            >
              <Text style={styles.resultButtonText}>Przyjmuję</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    alignSelf: 'flex-start',
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 13,
    alignSelf: 'flex-start',
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },
  wheelCard: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: spacing.lg,
    alignItems: 'center',
    width: '100%',
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
    marginBottom: spacing.sm,
  },
  input: {
    flex: 1,
    backgroundColor: colors.surfaceLight,
    borderRadius: 10,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    color: colors.textPrimary,
    marginRight: spacing.sm,
  },
  addButton: {
    backgroundColor: colors.red,
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
  resultBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  resultCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: spacing.lg,
    width: '100%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.red,
  },
  resultLabel: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  resultText: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: spacing.md,
  },
  resultButton: {
    backgroundColor: colors.red,
    borderRadius: 14,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  resultButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
});
