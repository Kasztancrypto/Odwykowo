import React from 'react';
import Svg, { Ellipse, Circle, Path, Defs, ClipPath, Rect } from 'react-native-svg';
import { colors } from '../theme';

interface Props {
  size?: number;
  fillPercent?: number; // 0-100, overlays a rising green fill on the body
}

export default function PiggyBank({ size = 180, fillPercent }: Props) {
  const clamped = fillPercent === undefined ? undefined : Math.max(0, Math.min(100, fillPercent));
  const bodyTop = 65;
  const bodyBottom = 175;
  const fillHeight = clamped === undefined ? 0 : ((bodyBottom - bodyTop) * clamped) / 100;

  return (
    <Svg width={size} height={size} viewBox="0 0 200 200">
      <Defs>
        <ClipPath id="pigBodyClip">
          <Ellipse cx={100} cy={120} rx={80} ry={55} />
        </ClipPath>
      </Defs>
      <Ellipse cx={100} cy={120} rx={80} ry={55} fill={colors.gold} />
      {clamped !== undefined && (
        <Rect
          x={10}
          y={bodyBottom - fillHeight}
          width={180}
          height={fillHeight}
          fill={colors.primary}
          opacity={0.75}
          clipPath="url(#pigBodyClip)"
        />
      )}
      <Circle cx={165} cy={110} r={22} fill={colors.gold} />
      <Circle cx={177} cy={104} r={3} fill="#78350F" />
      <Ellipse cx={175} cy={116} rx={9} ry={6} fill={colors.goldDark} />
      <Circle cx={171} cy={116} r={2} fill="#78350F" />
      <Circle cx={179} cy={116} r={2} fill="#78350F" />
      <Path d="M40 95 L20 75 L45 80 Z" fill={colors.goldDark} />
      <Path d="M60 82 L50 58 L75 72 Z" fill={colors.goldDark} />
      <Ellipse cx={65} cy={112} rx={6} ry={8} fill="#78350F" />
      <Ellipse cx={90} cy={112} rx={6} ry={8} fill="#78350F" />
      <Path d="M35 150 q-14 6 -18 -8" stroke={colors.goldDark} strokeWidth={5} fill="none" strokeLinecap="round" />
      <Path d="M55 165 L52 180 M75 168 L73 183 M125 168 L127 183 M148 163 L152 178"
        stroke={colors.goldDark} strokeWidth={7} strokeLinecap="round" />
      <Ellipse cx={100} cy={78} rx={22} ry={7} fill="#78350F" />
    </Svg>
  );
}
