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
} from 'react-native-svg';

interface Props {
  size?: number;
}

const HEAD_CX = 100;
const HEAD_CY = 76;
const HEAD_R = 30;
const INK = '#14161A';

export default function MichalAvatar({ size = 260 }: Props) {
  return (
    <Svg width={size} height={size * (300 / 220)} viewBox="0 0 220 300">
      <Defs>
        <ClipPath id="michalHeadClip">
          <Circle cx={HEAD_CX} cy={HEAD_CY} r={HEAD_R} />
        </ClipPath>
        <ClipPath id="michalTorsoClip">
          <Path d="M 66 118 Q 100 108 134 118 L 140 178 Q 100 208 60 178 Z" />
        </ClipPath>
        <ClipPath id="michalBellyClip">
          <Ellipse cx={100} cy={182} rx={38} ry={26} />
        </ClipPath>
      </Defs>

      {/* ground shadow */}
      <Ellipse cx={100} cy={282} rx={46} ry={9} fill="#000000" opacity={0.3} />

      {/* back arm hanging at side */}
      <Line x1={70} y1={128} x2={56} y2={178} stroke="#DCB588" strokeWidth={15} strokeLinecap="round" />
      <Path d="M 67 145 L 60 172" stroke="#C39A6B" strokeWidth={5} strokeLinecap="round" opacity={0.6} />
      <Circle cx={56} cy={178} r={7.5} fill="#DCB588" stroke={INK} strokeWidth={1.4} />

      {/* legs - track pants */}
      <Rect x={78} y={200} width={20} height={56} rx={8} fill="#3F4B5C" stroke={INK} strokeWidth={2} />
      <Rect x={102} y={200} width={20} height={56} rx={8} fill="#3F4B5C" stroke={INK} strokeWidth={2} />
      <Rect x={78} y={200} width={9} height={56} fill="#566579" opacity={0.7} />
      <Rect x={102} y={200} width={9} height={56} fill="#566579" opacity={0.7} />
      <Line x1={88} y1={200} x2={88} y2={256} stroke="#FFFFFF" strokeWidth={1.4} opacity={0.5} />
      <Line x1={112} y1={200} x2={112} y2={256} stroke="#FFFFFF" strokeWidth={1.4} opacity={0.5} />

      {/* sneakers */}
      <Ellipse cx={85} cy={259} rx={16} ry={8.5} fill="#F5F5F4" stroke={INK} strokeWidth={2} />
      <Ellipse cx={115} cy={259} rx={16} ry={8.5} fill="#F5F5F4" stroke={INK} strokeWidth={2} />
      <Path d="M 71 259 L 99 259" stroke="#94A3B8" strokeWidth={2.5} />
      <Path d="M 101 259 L 129 259" stroke="#94A3B8" strokeWidth={2.5} />

      {/* torso - polo shirt with a belly bulge */}
      <G>
        <Path
          d="M 66 118 Q 100 108 134 118 L 140 178 Q 100 208 60 178 Z"
          fill="#7DB8D9"
          stroke={INK}
          strokeWidth={2.4}
        />
        <G clipPath="url(#michalTorsoClip)">
          <Rect x={100} y={108} width={44} height={100} fill="#5A93B3" />
          <Ellipse cx={82} cy={132} rx={14} ry={18} fill="#9CCBE6" opacity={0.85} />
          {/* belly bulge shading */}
          <Ellipse cx={100} cy={185} rx={34} ry={22} fill="#5A93B3" opacity={0.55} />
          <Ellipse cx={90} cy={178} rx={14} ry={10} fill="#9CCBE6" opacity={0.5} />
        </G>
        {/* collar */}
        <Path d="M 88 116 L 100 130 L 112 116 L 106 112 L 100 120 L 94 112 Z" fill="#F5F5F4" stroke={INK} strokeWidth={1.4} />
        {/* button placket */}
        <Line x1={100} y1={122} x2={100} y2={150} stroke="#F5F5F4" strokeWidth={4} />
        <Circle cx={100} cy={130} r={1.6} fill="#3F4B5C" />
        <Circle cx={100} cy={140} r={1.6} fill="#3F4B5C" />
      </G>

      {/* belly outline pop (protrudes over waistband) */}
      <Path
        d="M 68 176 Q 100 210 132 176 Q 100 200 68 176 Z"
        fill="#7DB8D9"
        stroke={INK}
        strokeWidth={2}
      />

      {/* neck */}
      <Rect x={90} y={104} width={20} height={18} fill="#DCB588" />
      <Rect x={100} y={104} width={10} height={18} fill="#C39A6B" opacity={0.6} />

      {/* front arm holding racket */}
      <Path d="M 130 126 Q 150 136 150 158" stroke="#DCB588" strokeWidth={15} strokeLinecap="round" fill="none" />
      <Path d="M 136 130 Q 150 138 150 156" stroke="#C39A6B" strokeWidth={5} strokeLinecap="round" fill="none" opacity={0.6} />
      <Circle cx={150} cy={158} r={8} fill="#DCB588" stroke={INK} strokeWidth={1.4} />

      {/* tennis racket */}
      <G transform="rotate(-12 150 158)">
        <Rect x={146} y={158} width={7} height={26} rx={3} fill="#292524" stroke={INK} strokeWidth={1} />
        <Rect x={147.5} y={148} width={4} height={14} fill="#57534E" />
        <Ellipse cx={149.5} cy={116} rx={19} ry={26} fill="none" stroke="#DC2626" strokeWidth={5} />
        <Ellipse cx={149.5} cy={116} rx={16.5} ry={23.5} fill="none" stroke="#B91C1C" strokeWidth={1} opacity={0.6} />
        {[-12, -6, 0, 6, 12].map((dx, i) => (
          <Line key={`v${i}`} x1={149.5 + dx} y1={95} x2={149.5 + dx} y2={137} stroke="#E5E7EB" strokeWidth={0.8} opacity={0.85} />
        ))}
        {[-16, -8, 0, 8, 16].map((dy, i) => (
          <Line key={`h${i}`} x1={133} y1={116 + dy} x2={166} y2={116 + dy} stroke="#E5E7EB" strokeWidth={0.8} opacity={0.85} />
        ))}
      </G>

      {/* head */}
      <Circle cx={HEAD_CX} cy={HEAD_CY} r={HEAD_R} fill="#DCB588" stroke={INK} strokeWidth={2.4} />
      <G clipPath="url(#michalHeadClip)">
        <Rect x={HEAD_CX} y={HEAD_CY - HEAD_R} width={HEAD_R} height={HEAD_R * 2} fill="#C39A6B" opacity={0.5} />
        <Ellipse cx={HEAD_CX - 12} cy={HEAD_CY - 12} rx={11} ry={9} fill="#F0CDA0" opacity={0.55} />
      </G>

      {/* ears */}
      <Ellipse cx={HEAD_CX - HEAD_R + 2} cy={HEAD_CY + 4} rx={4} ry={6} fill="#DCB588" stroke={INK} strokeWidth={1.4} />
      <Ellipse cx={HEAD_CX + HEAD_R - 2} cy={HEAD_CY + 4} rx={4} ry={6} fill="#DCB588" stroke={INK} strokeWidth={1.4} />

      {/* eyebrows - relaxed */}
      <Path d={`M ${HEAD_CX - 18} ${HEAD_CY - 10} Q ${HEAD_CX - 9} ${HEAD_CY - 13} ${HEAD_CX - 2} ${HEAD_CY - 10}`} stroke="#4A2F1C" strokeWidth={2.6} strokeLinecap="round" fill="none" />
      <Path d={`M ${HEAD_CX + 2} ${HEAD_CY - 10} Q ${HEAD_CX + 9} ${HEAD_CY - 13} ${HEAD_CX + 18} ${HEAD_CY - 10}`} stroke="#4A2F1C" strokeWidth={2.6} strokeLinecap="round" fill="none" />

      {/* eyes - content, friendly */}
      <G>
        <Path d="M 81 78 Q 89 71 97 78 Q 89 85 81 78 Z" fill="#F5EFE4" stroke={INK} strokeWidth={1.6} />
        <Circle cx={90} cy={79} r={4} fill="#3F2E1E" />
        <Circle cx={90} cy={79} r={2} fill="#14100A" />
        <Circle cx={88.7} cy={77.3} r={1.1} fill="#FFFFFF" opacity={0.9} />
        <Path d="M 80.5 77.6 Q 89 70 97.5 77.6" stroke={INK} strokeWidth={2} fill="none" strokeLinecap="round" />
      </G>
      <G>
        <Path d="M 103 78 Q 111 71 119 78 Q 111 85 103 78 Z" fill="#F5EFE4" stroke={INK} strokeWidth={1.6} />
        <Circle cx={110} cy={79} r={4} fill="#3F2E1E" />
        <Circle cx={110} cy={79} r={2} fill="#14100A" />
        <Circle cx={111.3} cy={77.3} r={1.1} fill="#FFFFFF" opacity={0.9} />
        <Path d="M 102.5 77.6 Q 111 70 119.5 77.6" stroke={INK} strokeWidth={2} fill="none" strokeLinecap="round" />
      </G>

      {/* nose */}
      <Path d="M 98 78 Q 96 87 100 89" stroke="#8A6B49" strokeWidth={1.6} fill="none" opacity={0.7} />

      {/* short brown hair */}
      <Path
        d={`M ${HEAD_CX - HEAD_R + 1} ${HEAD_CY - 2} Q ${HEAD_CX - HEAD_R - 2} ${HEAD_CY - 34} ${HEAD_CX} ${HEAD_CY - 36} Q ${HEAD_CX + HEAD_R + 2} ${HEAD_CY - 34} ${HEAD_CX + HEAD_R - 1} ${HEAD_CY - 2} Q ${HEAD_CX + HEAD_R - 6} ${HEAD_CY - 20} ${HEAD_CX} ${HEAD_CY - 18} Q ${HEAD_CX - HEAD_R + 6} ${HEAD_CY - 20} ${HEAD_CX - HEAD_R + 1} ${HEAD_CY - 2} Z`}
        fill="#5C4023"
        stroke={INK}
        strokeWidth={1.6}
      />
      {[-18, -8, 2, 12].map((dx, i) => (
        <Line key={i} x1={HEAD_CX + dx} y1={HEAD_CY - 30} x2={HEAD_CX + dx * 0.9} y2={HEAD_CY - 18} stroke="#3F2E1A" strokeWidth={1} opacity={0.6} />
      ))}

      {/* full brown beard */}
      <Path
        d={`M ${HEAD_CX - 20} ${HEAD_CY + 4} Q ${HEAD_CX - 22} ${HEAD_CY + 24} ${HEAD_CX - 8} ${HEAD_CY + 32} Q ${HEAD_CX} ${HEAD_CY + 35} ${HEAD_CX + 8} ${HEAD_CY + 32} Q ${HEAD_CX + 22} ${HEAD_CY + 24} ${HEAD_CX + 20} ${HEAD_CY + 4} Q ${HEAD_CX + 14} ${HEAD_CY + 20} ${HEAD_CX} ${HEAD_CY + 22} Q ${HEAD_CX - 14} ${HEAD_CY + 20} ${HEAD_CX - 20} ${HEAD_CY + 4} Z`}
        fill="#5C4023"
        stroke={INK}
        strokeWidth={1.6}
      />
      <Path d="M 88 96 Q 100 100 112 96 Q 100 94 88 96 Z" fill="#DCB588" opacity={0.9} />

      {/* content smile (visible above beard line) */}
      <Path d="M 92 97 Q 100 100 108 97" stroke={INK} strokeWidth={2} fill="none" strokeLinecap="round" />
    </Svg>
  );
}
