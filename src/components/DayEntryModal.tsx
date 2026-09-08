import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Switch,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { colors, spacing } from '../theme';
import { DayEntry } from '../types';
import { formatDatePretty } from '../utils/dateUtils';
import { TRIGGER_TAGS } from '../data/triggers';

interface Props {
  visible: boolean;
  date: string | null;
  existingEntry?: DayEntry;
  onClose: () => void;
  onSave: (entry: DayEntry) => void;
  onDelete: (date: string) => void;
}

const MOOD_EMOJI = ['😞', '😕', '😐', '🙂', '😄'];
const CRAVING_EMOJI = ['😌', '🙂', '😬', '😣', '🥵'];

export default function DayEntryModal({
  visible,
  date,
  existingEntry,
  onClose,
  onSave,
  onDelete,
}: Props) {
  const [relapsed, setRelapsed] = useState(false);
  const [mood, setMood] = useState(3);
  const [craving, setCraving] = useState(1);
  const [journal, setJournal] = useState('');
  const [triggers, setTriggers] = useState<string[]>([]);

  useEffect(() => {
    if (visible) {
      setRelapsed(existingEntry?.relapsed ?? false);
      setMood(existingEntry?.mood ?? 3);
      setCraving(existingEntry?.craving ?? 1);
      setJournal(existingEntry?.journal ?? '');
      setTriggers(existingEntry?.triggers ?? []);
    }
  }, [visible, existingEntry]);

  if (!date) return null;

  const toggleTrigger = (id: string) => {
    setTriggers((prev) => (prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]));
  };

  const handleSave = () => {
    onSave({ date, relapsed, mood, craving, journal, triggers });
    onClose();
  };

  const handleDelete = () => {
    onDelete(date);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <KeyboardAvoidingView
        style={styles.backdrop}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.sheet}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>{formatDatePretty(date)}</Text>

            <View style={styles.rowBetween}>
              <Text style={styles.label}>Zjadłem/am snusa tego dnia</Text>
              <Switch
                value={relapsed}
                onValueChange={setRelapsed}
                trackColor={{ false: colors.surfaceLight, true: colors.red }}
                thumbColor="#fff"
              />
            </View>

            <Text style={styles.label}>
              Samopoczucie {MOOD_EMOJI[mood - 1]} ({mood}/5)
            </Text>
            <Slider
              style={styles.slider}
              minimumValue={1}
              maximumValue={5}
              step={1}
              value={mood}
              onValueChange={setMood}
              minimumTrackTintColor={colors.primary}
              maximumTrackTintColor={colors.surfaceLight}
              thumbTintColor={colors.primary}
            />

            <Text style={styles.label}>
              Siła pokusy {CRAVING_EMOJI[craving - 1]} ({craving}/5)
            </Text>
            <Slider
              style={styles.slider}
              minimumValue={1}
              maximumValue={5}
              step={1}
              value={craving}
              onValueChange={setCraving}
              minimumTrackTintColor={colors.red}
              maximumTrackTintColor={colors.surfaceLight}
              thumbTintColor={colors.red}
            />

            <Text style={styles.label}>Co wywołało pokusę? (opcjonalnie)</Text>
            <View style={styles.triggerRow}>
              {TRIGGER_TAGS.map((t) => {
                const selected = triggers.includes(t.id);
                return (
                  <TouchableOpacity
                    key={t.id}
                    style={[styles.triggerChip, selected && styles.triggerChipSelected]}
                    onPress={() => toggleTrigger(t.id)}
                  >
                    <Text style={[styles.triggerChipText, selected && styles.triggerChipTextSelected]}>
                      {t.emoji} {t.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={styles.label}>Dziennik</Text>
            <TextInput
              style={styles.journalInput}
              multiline
              placeholder="Jak się dziś czujesz? Co się wydarzyło?"
              placeholderTextColor={colors.textSecondary}
              value={journal}
              onChangeText={setJournal}
            />

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Zapisz</Text>
            </TouchableOpacity>

            {existingEntry && (
              <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                <Text style={styles.deleteButtonText}>Usuń wpis</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Anuluj</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
    maxHeight: '88%',
  },
  title: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: spacing.md,
    textTransform: 'capitalize',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  label: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '600',
    marginBottom: spacing.xs,
    marginTop: spacing.sm,
  },
  slider: {
    width: '100%',
    height: 36,
  },
  triggerRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  triggerChip: {
    backgroundColor: colors.surfaceLight,
    borderRadius: 16,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    marginRight: spacing.xs,
    marginBottom: spacing.xs,
  },
  triggerChipSelected: {
    backgroundColor: colors.purple,
  },
  triggerChipText: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  triggerChipTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  journalInput: {
    backgroundColor: colors.surfaceLight,
    borderRadius: 12,
    padding: spacing.md,
    color: colors.textPrimary,
    minHeight: 100,
    textAlignVertical: 'top',
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  saveButtonText: {
    color: '#08210F',
    fontWeight: '700',
    fontSize: 16,
  },
  deleteButton: {
    borderRadius: 14,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginTop: spacing.sm,
    borderWidth: 1,
    borderColor: colors.red,
  },
  deleteButtonText: {
    color: colors.red,
    fontWeight: '600',
  },
  cancelButton: {
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },
  cancelButtonText: {
    color: colors.textSecondary,
  },
});
