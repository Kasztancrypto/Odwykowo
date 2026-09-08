import React from 'react';
import Svg, {
  Circle,
  Ellipse,
  Rect,
  Path,
  Line,
  G,
  Defs,
  ClipPath,
  RadialGradient,
  Stop,
} from 'react-native-svg';

interface Props {
  size?: number;
}

const INK = '#100E0C';
const HEAD_CX = 100;
const SNOUT_TOP = 62;

const STARS = [
  [30, 20, 1.3], [50, 45, 0.9], [170, 25, 1.1], [185, 55, 0.8],
  [20, 70, 0.9], [195, 90, 1.2], [40, 100, 0.7], [165, 15, 0.9],
  [70, 15, 0.8], [130, 10, 1], [15, 40, 1.1], [200, 30, 0.9],
];

export default function BojackAvatar({ size = 260 }: Props) {
  return (
    <Svg width={size} height={size * (300 / 220)} viewBox="0 0 220 300">
      <Defs>
        <ClipPath id="bojackHeadClip">
          <Ellipse cx={HEAD_CX} cy={48} rx={27} ry={25} />
        </ClipPath>
        <ClipPath id="bojackSnoutClip">
          <Path d="M 78 55 Q 76 90 100 96 Q 124 90 122 55 Q 112 66 100 66 Q 88 66 78 55 Z" />
        </ClipPath>
        <ClipPath id="bojackRobeClip">
          <Path d="M 64 122 Q 100 110 136 122 L 142 206 Q 100 220 58 206 Z" />
        </ClipPath>
        <RadialGradient id="bojackNightSky" cx="50%" cy="35%" r="65%">
          <Stop offset="0%" stopColor="#312E81" stopOpacity={0.55} />
          <Stop offset="100%" stopColor="#312E81" stopOpacity={0} />
        </RadialGradient>
      </Defs>

      {/* night sky backdrop */}
      <Ellipse cx={110} cy={90} rx={120} ry={110} fill="url(#bojackNightSky)" />
      {STARS.map(([sx, sy, sr], i) => (
        <Circle key={i} cx={sx} cy={sy} r={sr} fill="#F1F5F9" opacity={0.8} />
      ))}

      {/* ground shadow */}
      <Ellipse cx={100} cy={282} rx={46} ry={9} fill="#000000" opacity={0.3} />

      {/* horse ears */}
      <Path d="M 74 28 Q 66 6 78 4 Q 86 18 84 32 Z" fill="#5B6478" stroke={INK} strokeWidth={2} />
      <Path d="M 126 28 Q 134 6 122 4 Q 114 18 116 32 Z" fill="#5B6478" stroke={INK} strokeWidth={2} />
      <Path d="M 77 22 Q 74 10 79 8 Q 83 18 82 26 Z" fill="#8A93A6" opacity={0.8} />
      <Path d="M 123 22 Q 126 10 121 8 Q 117 18 118 26 Z" fill="#8A93A6" opacity={0.8} />

      {/* back arm hanging at side */}
      <Line x1={68} y1={130} x2={54} y2={182} stroke="#5B6478" strokeWidth={16} strokeLinecap="round" />
      <Circle cx={54} cy={182} r={8} fill="#5B6478" stroke={INK} strokeWidth={1.6} />

      {/* legs */}
      <Rect x={78} y={204} width={20} height={54} rx={8} fill="#44403C" stroke={INK} strokeWidth={2} />
      <Rect x={102} y={204} width={20} height={54} rx={8} fill="#44403C" stroke={INK} strokeWidth={2} />

      {/* worn slippers */}
      <Ellipse cx={86} cy={258} rx={15} ry={8} fill="#78350F" stroke={INK} strokeWidth={2} />
      <Ellipse cx={114} cy={258} rx={15} ry={8} fill="#78350F" stroke={INK} strokeWidth={2} />

      {/* body - rumpled open robe over shirt */}
      <Rect x={82} y={130} width={36} height={80} rx={10} fill="#E7E1D5" stroke={INK} strokeWidth={1.6} />
      <G>
        <Path
          d="M 64 122 Q 100 110 136 122 L 142 206 Q 100 220 58 206 Z"
          fill="#6D4C3D"
          stroke={INK}
          strokeWidth={2.4}
        />
        <G clipPath="url(#bojackRobeClip)">
          <Rect x={100} y={122} width={44} height={98} fill="#573A2E" />
          <Ellipse cx={80} cy={148} rx={14} ry={20} fill="#84604B" opacity={0.8} />
        </G>
        {/* robe lapels open at chest */}
        <Path d="M 82 130 L 100 200 L 92 130 Z" fill="#573A2E" opacity={0.9} />
        <Path d="M 118 130 L 100 200 L 108 130 Z" fill="#4A3025" opacity={0.9} />
        {/* belt */}
        <Rect x={64} y={178} width={78} height={7} fill="#3F2A20" stroke={INK} strokeWidth={1} />
      </G>

      {/* neck */}
      <Rect x={90} y={106} width={20} height={20} fill="#5B6478" />
      <Rect x={100} y={106} width={10} height={20} fill="#454C5C" opacity={0.7} />

      {/* front arm holding trophy */}
      <Path d="M 132 128 Q 150 138 150 158" stroke="#5B6478" strokeWidth={16} strokeLinecap="round" fill="none" />
      <Circle cx={150} cy={158} r={8.5} fill="#5B6478" stroke={INK} strokeWidth={1.6} />

      {/* trophy statuette */}
      <G>
        <Rect x={143} y={150} width={14} height={8} rx={1.5} fill="#78350F" stroke={INK} strokeWidth={1} />
        <Rect x={147} y={130} width={6} height={22} fill="#EAB308" stroke={INK} strokeWidth={1} />
        <Path d="M 138 108 Q 138 128 150 130 Q 162 128 162 108 Q 156 116 150 116 Q 144 116 138 108 Z" fill="#FDE047" stroke={INK} strokeWidth={1.4} />
        <Path d="M 141 111 Q 142 122 150 124" stroke="#FEF9C3" strokeWidth={1.2} opacity={0.8} fill="none" />
        <Circle cx={150} cy={106} r={5} fill="#FDE047" stroke={INK} strokeWidth={1.2} />
      </G>

      {/* horse head - cranium */}
      <Ellipse cx={HEAD_CX} cy={48} rx={27} ry={25} fill="#5B6478" stroke={INK} strokeWidth={2.4} />
      <G clipPath="url(#bojackHeadClip)">
        <Rect x={HEAD_CX} y={23} width={27} height={50} fill="#454C5C" />
        <Ellipse cx={HEAD_CX - 12} cy={36} rx={10} ry={9} fill="#7C8698" opacity={0.6} />
      </G>

      {/* forelock */}
      <Path d="M 88 26 Q 100 16 112 26 Q 104 22 100 26 Q 96 22 88 26 Z" fill="#333A47" />

      {/* snout */}
      <Path
        d={`M 78 ${SNOUT_TOP - 7} Q 76 90 100 96 Q 124 90 122 ${SNOUT_TOP - 7} Q 112 68 100 68 Q 88 68 78 ${SNOUT_TOP - 7} Z`}
        fill="#6B7488"
        stroke={INK}
        strokeWidth={2.2}
      />
      <G clipPath="url(#bojackSnoutClip)">
        <Rect x={100} y={55} width={24} height={45} fill="#5B6478" />
      </G>
      {/* graying muzzle for the "aging star" touch */}
      <Path d="M 84 78 Q 84 90 100 94 Q 116 90 116 78 Q 108 86 100 86 Q 92 86 84 78 Z" fill="#A8AFC0" opacity={0.55} />

      {/* nostrils */}
      <Ellipse cx={92} cy={88} rx={3} ry={4} fill={INK} opacity={0.85} />
      <Ellipse cx={108} cy={88} rx={3} ry={4} fill={INK} opacity={0.85} />

      {/* mouth - downturned, sad */}
      <Path d="M 88 95 Q 100 91 114 95" stroke={INK} strokeWidth={2} fill="none" strokeLinecap="round" />

      {/* eyes - tired, heavy-lidded, sad */}
      <Path d="M 78 46 Q 86 40 94 46 Q 86 51 78 46 Z" fill="#F5EFE4" stroke={INK} strokeWidth={1.5} />
      <Path d="M 77.5 46 Q 86 38.5 94.5 46 Q 86 42 77.5 46 Z" fill="#5B6478" />
      <Circle cx={87} cy={48.5} r={3.2} fill="#2E2013" />
      <Circle cx={87} cy={48.5} r={1.5} fill="#0A0806" />

      <Path d="M 106 46 Q 114 40 122 46 Q 114 51 106 46 Z" fill="#F5EFE4" stroke={INK} strokeWidth={1.5} />
      <Path d="M 105.5 46 Q 114 38.5 122.5 46 Q 114 42 105.5 46 Z" fill="#5B6478" />
      <Circle cx={113} cy={48.5} r={3.2} fill="#2E2013" />
      <Circle cx={113} cy={48.5} r={1.5} fill="#0A0806" />

      {/* under-eye bags - washed up look */}
      <Ellipse cx={87} cy={54} rx={6.5} ry={3} fill="#2E3340" opacity={0.5} />
      <Ellipse cx={113} cy={54} rx={6.5} ry={3} fill="#2E3340" opacity={0.5} />

      {/* eyebrows - resigned, drooping inward */}
      <Path d="M 78 36 Q 85 40 92 41" stroke="#2E2013" strokeWidth={2.2} strokeLinecap="round" fill="none" />
      <Path d="M 122 36 Q 115 40 108 41" stroke="#2E2013" strokeWidth={2.2} strokeLinecap="round" fill="none" />
    </Svg>
  );
}
