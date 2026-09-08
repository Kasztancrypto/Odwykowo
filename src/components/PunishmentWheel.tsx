import React, { useRef, useState } from 'react';
import { View, StyleSheet, Animated, Easing, TouchableOpacity, Text } from 'react-native';
import Svg, { G, Path, Text as SvgText } from 'react-native-svg';
import { colors, spacing } from '../theme';

interface Props {
  items: string[];
  onResult: (text: string, index: number) => void;
  size?: number;
}

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcPath(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${cx},${cy} L ${start.x},${start.y} A ${r},${r} 0 ${largeArc} 0 ${end.x},${end.y} Z`;
}

const SLICE_COLORS = ['#EF4444', '#B91C1C'];

export default function PunishmentWheel({ items, onResult, size = 260 }: Props) {
  const [spinning, setSpinning] = useState(false);
  const rotationAnim = useRef(new Animated.Value(0)).current;
  const currentRotationRef = useRef(0);
  const n = Math.max(1, items.length);
  const segmentAngle = 360 / n;
  const r = size / 2;

  const rotateInterpolate = rotationAnim.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  const spin = () => {
    if (spinning || items.length === 0) return;
    setSpinning(true);
    const randomIndex = Math.floor(Math.random() * items.length);
    const targetSegmentCenter = randomIndex * segmentAngle + segmentAngle / 2;
    const baseTarget = (360 - targetSegmentCenter + 360) % 360;
    const extraSpins = 6 * 360;
    const cur = currentRotationRef.current;
    const next =
      cur + extraSpins + ((baseTarget - (cur % 360) + 360) % 360);

    Animated.timing(rotationAnim, {
      toValue: next,
      duration: 3400,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      currentRotationRef.current = next;
      setSpinning(false);
      onResult(items[randomIndex], randomIndex);
    });
  };

  return (
    <View style={styles.container}>
      <View style={[styles.pointerWrap, { width: size }]}>
        <View style={styles.pointer} />
      </View>
      <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <G>
            {items.map((_, i) => {
              const start = i * segmentAngle;
              const end = start + segmentAngle;
              const mid = start + segmentAngle / 2;
              const labelPos = polarToCartesian(r, r, r * 0.62, mid);
              return (
                <G key={i}>
                  <Path d={arcPath(r, r, r - 2, start, end)} fill={SLICE_COLORS[i % 2]} stroke={colors.surface} strokeWidth={1.5} />
                  <SvgText
                    x={labelPos.x}
                    y={labelPos.y}
                    fill="#FEF2F2"
                    fontSize={13}
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {i + 1}
                  </SvgText>
                </G>
              );
            })}
          </G>
        </Svg>
      </Animated.View>
      <TouchableOpacity
        style={[styles.spinButton, spinning && styles.spinButtonDisabled]}
        onPress={spin}
        disabled={spinning}
      >
        <Text style={styles.spinButtonText}>
          {spinning ? 'Kręci się...' : 'Zakręć kołem'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  pointerWrap: {
    alignItems: 'center',
    height: 16,
    zIndex: 2,
  },
  pointer: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 16,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: colors.gold,
  },
  spinButton: {
    marginTop: spacing.lg,
    backgroundColor: colors.red,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: 16,
  },
  spinButtonDisabled: {
    opacity: 0.6,
  },
  spinButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
