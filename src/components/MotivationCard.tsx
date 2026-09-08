import React, { useRef, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, spacing } from '../theme';

interface Props {
  items: string[];
  onReveal: (text: string) => void;
}

export default function MotivationCard({ items, onReveal }: Props) {
  const [revealedText, setRevealedText] = useState<string | null>(null);
  const [flipped, setFlipped] = useState(false);
  const flipAnim = useRef(new Animated.Value(0)).current;

  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });
  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  const draw = () => {
    if (items.length === 0) return;
    const text = items[Math.floor(Math.random() * items.length)];
    setRevealedText(text);
    onReveal(text);

    flipAnim.setValue(0);
    setFlipped(true);
    Animated.spring(flipAnim, {
      toValue: 1,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();
  };

  const reset = () => {
    Animated.spring(flipAnim, {
      toValue: 0,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start(() => setFlipped(false));
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.cardContainer}>
        <Animated.View
          style={[
            styles.card,
            styles.cardFront,
            { transform: [{ rotateY: frontInterpolate }] },
          ]}
        >
          <Text style={styles.backSymbol}>?</Text>
          <Text style={styles.backLabel}>Kartka motywacyjna</Text>
        </Animated.View>
        <Animated.View
          style={[
            styles.card,
            styles.cardBack,
            { transform: [{ rotateY: backInterpolate }] },
          ]}
        >
          <Text style={styles.quoteText}>{revealedText}</Text>
        </Animated.View>
      </View>

      {!flipped ? (
        <TouchableOpacity style={styles.button} onPress={draw}>
          <Text style={styles.buttonText}>Odkryj kartę</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={[styles.button, styles.buttonSecondary]} onPress={reset}>
          <Text style={styles.buttonText}>Odłóż kartę</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const CARD_WIDTH = 260;
const CARD_HEIGHT = 340;

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
  },
  cardContainer: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },
  card: {
    position: 'absolute',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 20,
    backfaceVisibility: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  cardFront: {
    backgroundColor: colors.purpleDark,
    borderWidth: 2,
    borderColor: colors.purple,
  },
  cardBack: {
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.purple,
  },
  backSymbol: {
    fontSize: 64,
    color: colors.purple,
    fontWeight: '800',
  },
  backLabel: {
    color: '#E9D5FF',
    marginTop: spacing.sm,
    fontSize: 14,
  },
  quoteText: {
    color: colors.textPrimary,
    fontSize: 17,
    textAlign: 'center',
    lineHeight: 24,
  },
  button: {
    marginTop: spacing.lg,
    backgroundColor: colors.purple,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: 16,
  },
  buttonSecondary: {
    backgroundColor: colors.surfaceLight,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
