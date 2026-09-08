import React, { useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import Svg, { Ellipse, Path, Line } from 'react-native-svg';

interface Props {
  total: number;
  poppedCount: number;
  onPop: () => void;
}

const BALLOON_COLORS = ['#EF4444', '#22C55E', '#3B82F6', '#F59E0B', '#A78BFA', '#EC4899', '#14B8A6'];

function BalloonIcon({ color, size = 56 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size * 1.4} viewBox="0 0 60 84">
      <Ellipse cx={30} cy={32} rx={28} ry={32} fill={color} />
      <Ellipse cx={20} cy={18} rx={8} ry={10} fill="#FFFFFF" opacity={0.25} />
      <Path d="M22 62 Q30 68 38 62" stroke={color} strokeWidth={3} fill="none" />
      <Line x1={30} y1={64} x2={30} y2={80} stroke="#94A3B8" strokeWidth={1.5} />
    </Svg>
  );
}

function PoppedIcon({ size = 56 }: { size?: number }) {
  return (
    <Svg width={size} height={size * 1.4} viewBox="0 0 60 84">
      <Path
        d="M16 30 L24 22 L28 34 L20 40 L30 44 L22 52 L32 54 L26 62"
        stroke="#475569"
        strokeWidth={2.5}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function Balloon({ color, onPop }: { color: string; onPop: () => void }) {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 1.3, duration: 90, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 0, duration: 120, useNativeDriver: true }),
    ]).start();
    Animated.timing(opacity, { toValue: 0, duration: 180, delay: 90, useNativeDriver: true }).start(() => {
      onPop();
    });
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
      <Animated.View style={{ transform: [{ scale }], opacity }}>
        <BalloonIcon color={color} />
      </Animated.View>
    </TouchableOpacity>
  );
}

export default function BalloonPop({ total, poppedCount, onPop }: Props) {
  return (
    <View style={styles.row}>
      {Array.from({ length: total }).map((_, i) =>
        i < poppedCount ? (
          <View key={i} style={styles.slot}>
            <PoppedIcon />
          </View>
        ) : (
          <View key={i} style={styles.slot}>
            <Balloon color={BALLOON_COLORS[i % BALLOON_COLORS.length]} onPop={onPop} />
          </View>
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  slot: {
    margin: 6,
  },
});
