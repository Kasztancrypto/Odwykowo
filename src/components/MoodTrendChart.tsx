import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Line, Path, Circle, Text as SvgText } from 'react-native-svg';
import { DayEntry } from '../types';
import { addDays, todayStr } from '../utils/dateUtils';
import { colors, spacing } from '../theme';

interface Props {
  entries: Record<string, DayEntry>;
  days?: number;
}

const CHART_W = 320;
const CHART_H = 140;
const PAD_L = 24;
const PAD_R = 8;
const PAD_T = 12;
const PAD_B = 20;

function buildPath(points: (number | null)[], color: string) {
  const plotW = CHART_W - PAD_L - PAD_R;
  const plotH = CHART_H - PAD_T - PAD_B;
  const step = points.length > 1 ? plotW / (points.length - 1) : 0;

  let d = '';
  let drawing = false;
  const circles: { x: number; y: number }[] = [];

  points.forEach((v, i) => {
    const x = PAD_L + step * i;
    if (v === null) {
      drawing = false;
      return;
    }
    const y = PAD_T + plotH * (1 - (v - 1) / 4);
    circles.push({ x, y });
    d += drawing ? ` L ${x} ${y}` : `M ${x} ${y}`;
    drawing = true;
  });

  return { d, circles, color };
}

export default function MoodTrendChart({ entries, days = 14 }: Props) {
  const today = todayStr();
  const dates = Array.from({ length: days }).map((_, i) => addDays(today, i - (days - 1)));

  const moodPoints = dates.map((d) => entries[d]?.mood ?? null);
  const cravingPoints = dates.map((d) => entries[d]?.craving ?? null);

  const hasAnyData = moodPoints.some((v) => v !== null) || cravingPoints.some((v) => v !== null);

  const moodLine = buildPath(moodPoints, colors.primary);
  const cravingLine = buildPath(cravingPoints, colors.red);

  const plotH = CHART_H - PAD_T - PAD_B;

  if (!hasAnyData) {
    return (
      <View style={styles.emptyWrap}>
        <Text style={styles.emptyText}>
          Zapisuj samopoczucie i pokusę w dzienniku, a zobaczysz tu swój trend.
        </Text>
      </View>
    );
  }

  return (
    <View>
      <Svg width="100%" height={CHART_H} viewBox={`0 0 ${CHART_W} ${CHART_H}`}>
        {[1, 2, 3, 4, 5].map((v) => {
          const y = PAD_T + plotH * (1 - (v - 1) / 4);
          return (
            <Line
              key={v}
              x1={PAD_L}
              y1={y}
              x2={CHART_W - PAD_R}
              y2={y}
              stroke={colors.surfaceLight}
              strokeWidth={1}
            />
          );
        })}
        <SvgText x={2} y={PAD_T + 4} fill={colors.textSecondary} fontSize={9}>
          5
        </SvgText>
        <SvgText x={2} y={CHART_H - PAD_B + 4} fill={colors.textSecondary} fontSize={9}>
          1
        </SvgText>

        <Path d={cravingLine.d} stroke={cravingLine.color} strokeWidth={2} fill="none" />
        {cravingLine.circles.map((c, i) => (
          <Circle key={`c-${i}`} cx={c.x} cy={c.y} r={2.5} fill={cravingLine.color} />
        ))}

        <Path d={moodLine.d} stroke={moodLine.color} strokeWidth={2} fill="none" />
        {moodLine.circles.map((c, i) => (
          <Circle key={`m-${i}`} cx={c.x} cy={c.y} r={2.5} fill={moodLine.color} />
        ))}
      </Svg>
      <View style={styles.legendRow}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: colors.primary }]} />
          <Text style={styles.legendText}>Samopoczucie</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: colors.red }]} />
          <Text style={styles.legendText}>Pokusa</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyWrap: {
    paddingVertical: spacing.lg,
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.sm,
    gap: spacing.lg,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: spacing.xs,
  },
  legendText: {
    color: colors.textSecondary,
    fontSize: 12,
  },
});
