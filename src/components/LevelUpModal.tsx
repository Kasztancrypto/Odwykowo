import React, { useEffect, useRef } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import AvatarDisplay from './AvatarDisplay';
import { colors, spacing } from '../theme';

interface Props {
  visible: boolean;
  level: number;
  title: string;
  description: string;
  onClose: () => void;
}

export default function LevelUpModal({ visible, level, title, description, onClose }: Props) {
  const scale = useRef(new Animated.Value(0.6)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      scale.setValue(0.6);
      opacity.setValue(0);
      Animated.parallel([
        Animated.spring(scale, { toValue: 1, friction: 6, tension: 60, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 1, duration: 250, useNativeDriver: true }),
      ]).start();
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <Animated.View style={[styles.card, { transform: [{ scale }], opacity }]}>
          <Text style={styles.congrats}>AWANS!</Text>
          <Text style={styles.lvl}>LVL {level + 1}</Text>
          <AvatarDisplay level={level} size={180} />
          <Text style={styles.title}>{title.toUpperCase()}</Text>
          <Text style={styles.description}>{description}</Text>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Dziękuję, idę dalej</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
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
    borderWidth: 2,
    borderColor: colors.gold,
  },
  congrats: {
    color: colors.gold,
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 3,
  },
  lvl: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '700',
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
  },
  title: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: '800',
    marginTop: spacing.md,
    letterSpacing: 1,
  },
  description: {
    color: colors.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  button: {
    backgroundColor: colors.gold,
    borderRadius: 14,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    marginTop: spacing.xl,
  },
  buttonText: {
    color: '#3B2A05',
    fontWeight: '700',
    fontSize: 15,
  },
});
