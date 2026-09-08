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

const BEANIE_PATH = `M ${HEAD_CX - HEAD_R - 1} ${HEAD_CY - 6} Q ${HEAD_CX - HEAD_R - 2} ${HEAD_CY - 34} ${HEAD_CX} ${HEAD_CY - 36} Q ${HEAD_CX + HEAD_R + 2} ${HEAD_CY - 34} ${HEAD_CX + HEAD_R + 1} ${HEAD_CY - 6} Q ${HEAD_CX} ${HEAD_CY - 16} ${HEAD_CX - HEAD_R - 1} ${HEAD_CY - 6} Z`;

const INK = '#14161A';

function Eye({ cx, mirror }: { cx: number; mirror: boolean }) {
  const s = mirror ? -1 : 1;
  return (
    <G>
      {/* white */}
      <Path
        d={`M ${cx - 8} 78 Q ${cx} 71 ${cx + 8} 78 Q ${cx} 85 ${cx - 8} 78 Z`}
        fill="#F5EFE4"
        stroke={INK}
        strokeWidth={1.6}
      />
      {/* droopy upper lid covering top of eye - tired look */}
      <Path
        d={`M ${cx - 8.5} 77.5 Q ${cx} 69.5 ${cx + 8.5} 77.5 Q ${cx} 74.5 ${cx - 8.5} 77.5 Z`}
        fill="#C9A67A"
      />
      {/* iris */}
      <Circle cx={cx + s * 1} cy={80} r={4.2} fill="#4A3220" />
      <Circle cx={cx + s * 1} cy={80} r={2.1} fill="#14100A" />
      <Circle cx={cx + s * 1 - 1.3} cy={78.3} r={1.1} fill="#FFFFFF" opacity={0.9} />
      {/* upper lash line */}
      <Path d={`M ${cx - 8.5} 77.6 Q ${cx} 70 ${cx + 8.5} 77.6`} stroke={INK} strokeWidth={2} fill="none" strokeLinecap="round" />
    </G>
  );
}

export default function CwelAvatar({ size = 260 }: Props) {
  return (
    <Svg width={size} height={size * (300 / 220)} viewBox="0 0 220 300">
      <Defs>
        <ClipPath id="headClip">
          <Circle cx={HEAD_CX} cy={HEAD_CY} r={HEAD_R} />
        </ClipPath>
        <ClipPath id="jacketClip">
          <Rect x={62} y={116} width={76} height={92} rx={22} />
        </ClipPath>
        <ClipPath id="beanieClip">
          <Path d={BEANIE_PATH} />
        </ClipPath>
      </Defs>

      {/* ground shadow */}
      <Ellipse cx={100} cy={282} rx={46} ry={9} fill="#000000" opacity={0.35} />

      {/* back arm hanging at side */}
      <Line x1={70} y1={130} x2={54} y2={183} stroke="#C9A67A" strokeWidth={16} strokeLinecap="round" />
      <Path d="M 66 150 L 58 178" stroke="#A9825C" strokeWidth={6} strokeLinecap="round" opacity={0.7} />
      <Circle cx={54} cy={183} r={8} fill="#C9A67A" stroke={INK} strokeWidth={1.6} />

      {/* legs (worn jeans) - flat with cel shadow */}
      <Rect x={76} y={204} width={20} height={54} rx={8} fill="#4B4B47" stroke={INK} strokeWidth={2} />
      <Rect x={104} y={204} width={20} height={54} rx={8} fill="#4B4B47" stroke={INK} strokeWidth={2} />
      <Rect x={86} y={204} width={10} height={54} fill="#33322E" opacity={0.85} />
      <Rect x={114} y={204} width={10} height={54} fill="#33322E" opacity={0.85} />

      {/* torn knee patch with frayed edge */}
      <Path d="M 106 222 L 116 220 L 121 228 L 114 233 L 118 238 L 108 240 L 104 232 Z" fill="#1A1A18" />
      <Circle cx={112} cy={230} r={4.5} fill="#C9A67A" />
      <Path d="M 108 224 L 106 221 M 112 223 L 111 219 M 116 226 L 119 223" stroke="#D6D0C4" strokeWidth={0.8} opacity={0.7} />

      {/* boots */}
      <Ellipse cx={85} cy={259} rx={17} ry={9} fill="#3E3025" stroke={INK} strokeWidth={2} />
      <Ellipse cx={115} cy={259} rx={17} ry={9} fill="#3E3025" stroke={INK} strokeWidth={2} />
      <Path d="M 92 253 A 17 9 0 0 1 102 264" fill="#241A12" opacity={0.8} />
      <Path d="M 122 253 A 17 9 0 0 1 132 264" fill="#241A12" opacity={0.8} />
      <Ellipse cx={80} cy={255} rx={5} ry={2.2} fill="#5C4A3A" opacity={0.6} />
      <Ellipse cx={110} cy={255} rx={5} ry={2.2} fill="#5C4A3A" opacity={0.6} />

      {/* jacket torso - flat cel-shaded */}
      <G>
        <Rect x={62} y={116} width={76} height={92} rx={22} fill="#33383F" stroke={INK} strokeWidth={2.4} />
        <G clipPath="url(#jacketClip)">
          <Rect x={100} y={116} width={40} height={92} fill="#1C1F24" />
          <Rect x={62} y={116} width={26} height={40} fill="#454C55" opacity={0.9} />
          {/* quilted baffle lines */}
          <Path d="M 62 140 Q 100 148 138 140" stroke="#0A0B0D" strokeWidth={2} fill="none" />
          <Path d="M 62 164 Q 100 172 138 164" stroke="#0A0B0D" strokeWidth={2} fill="none" />
          <Path d="M 62 188 Q 100 196 138 188" stroke="#0A0B0D" strokeWidth={2} fill="none" />
          <Line x1={100} y1={118} x2={100} y2={206} stroke="#0A0B0D" strokeWidth={1.8} />
          {/* zipper */}
          <Line x1={100} y1={122} x2={100} y2={204} stroke="#0B0C0E" strokeWidth={3} />
          <Rect x={97} y={150} width={6} height={9} rx={1.5} fill="#8B8781" />
          {/* red piping */}
          <Path d="M 63 118 Q 100 108 137 118" stroke="#D62828" strokeWidth={2.6} fill="none" />
          <Path d="M 62 160 L 62 206 Q 100 216 138 206 L 138 160" stroke="#D62828" strokeWidth={2.2} fill="none" />
          {/* pocket */}
          <Rect x={70} y={178} width={20} height={14} rx={3} fill="none" stroke="#0A0B0D" strokeWidth={1.6} />
        </G>
      </G>

      {/* popped collar */}
      <Path
        d="M 78 122 Q 88 108 100 118 Q 112 108 122 122 L 116 134 Q 100 124 84 134 Z"
        fill="#33383F"
        stroke={INK}
        strokeWidth={1.8}
      />
      <Path d="M 78 122 Q 88 108 100 118 L 100 128 Q 90 116 82 128 Z" fill="#454C55" opacity={0.9} />
      <Path d="M 80 123 Q 90 112 100 119" stroke="#D62828" strokeWidth={1.8} fill="none" />
      <Path d="M 120 123 Q 110 112 100 119" stroke="#D62828" strokeWidth={1.8} fill="none" />

      {/* neck */}
      <Rect x={90} y={102} width={20} height={20} fill="#C9A67A" />
      <Rect x={100} y={102} width={10} height={20} fill="#A9825C" opacity={0.6} />

      {/* front arm bent, holding can near chest */}
      <Path d="M 132 128 Q 150 138 150 158" stroke="#C9A67A" strokeWidth={16} strokeLinecap="round" fill="none" />
      <Path d="M 138 132 Q 150 140 150 156" stroke="#A9825C" strokeWidth={5} strokeLinecap="round" fill="none" opacity={0.6} />
      <Circle cx={150} cy={158} r={8.5} fill="#C9A67A" stroke={INK} strokeWidth={1.6} />

      {/* crushed beer can - flat cel shading */}
      <G transform="rotate(-8 150 140)">
        <Rect x={142} y={112} width={16} height={40} rx={5} fill="#D7DBDD" stroke={INK} strokeWidth={1.6} />
        <Rect x={150} y={112} width={8} height={40} fill="#93999D" />
        <Rect x={142} y={128} width={16} height={9} fill="#D62828" />
        <Rect x={144} y={129.3} width={12} height={1.6} fill="#FDE9C8" opacity={0.85} />
        <Path d="M 146 116 L 150 121 L 145 126" stroke="#6D7378" strokeWidth={1.2} fill="none" />
        <Path d="M 154 140 L 149 145 L 155 150" stroke="#6D7378" strokeWidth={1.2} fill="none" />
        <Ellipse cx={150} cy={112} rx={8} ry={2.6} fill="#B4BABD" stroke={INK} strokeWidth={1} />
      </G>

      {/* head - flat cel shading */}
      <Circle cx={HEAD_CX} cy={HEAD_CY} r={HEAD_R} fill="#DCB588" stroke={INK} strokeWidth={2.4} />
      <G clipPath="url(#headClip)">
        <Rect x={HEAD_CX} y={HEAD_CY - HEAD_R} width={HEAD_R} height={HEAD_R * 2} fill="#B98A5E" opacity={0.55} />
        <Ellipse cx={HEAD_CX - 12} cy={HEAD_CY - 12} rx={11} ry={9} fill="#F0CDA0" opacity={0.55} />
      </G>

      {/* ears */}
      <Ellipse cx={HEAD_CX - HEAD_R + 2} cy={HEAD_CY + 4} rx={4} ry={6} fill="#DCB588" stroke={INK} strokeWidth={1.4} />
      <Ellipse cx={HEAD_CX + HEAD_R - 2} cy={HEAD_CY + 4} rx={4} ry={6} fill="#DCB588" stroke={INK} strokeWidth={1.4} />

      {/* under-eye bags */}
      <Ellipse cx={HEAD_CX - 11} cy={HEAD_CY + 9} rx={6.5} ry={3} fill="#8A6B49" opacity={0.4} />
      <Ellipse cx={HEAD_CX + 11} cy={HEAD_CY + 9} rx={6.5} ry={3} fill="#8A6B49" opacity={0.4} />

      {/* forehead wrinkles */}
      <Path d={`M ${HEAD_CX - 14} ${HEAD_CY - 18} Q ${HEAD_CX} ${HEAD_CY - 21} ${HEAD_CX + 14} ${HEAD_CY - 18}`} stroke="#8A6B49" strokeWidth={0.9} opacity={0.55} fill="none" />
      <Path d={`M ${HEAD_CX - 12} ${HEAD_CY - 14} Q ${HEAD_CX} ${HEAD_CY - 17} ${HEAD_CX + 12} ${HEAD_CY - 14}`} stroke="#8A6B49" strokeWidth={0.8} opacity={0.45} fill="none" />

      {/* eyebrows - furrowed, thick anime style */}
      <Path d={`M ${HEAD_CX - 19} ${HEAD_CY - 9} Q ${HEAD_CX - 9} ${HEAD_CY - 14} ${HEAD_CX - 2} ${HEAD_CY - 6}`} stroke={INK} strokeWidth={3} strokeLinecap="round" fill="none" />
      <Path d={`M ${HEAD_CX + 2} ${HEAD_CY - 6} Q ${HEAD_CX + 9} ${HEAD_CY - 14} ${HEAD_CX + 19} ${HEAD_CY - 9}`} stroke={INK} strokeWidth={3} strokeLinecap="round" fill="none" />

      {/* eyes - big anime style, droopy/tired */}
      <Eye cx={HEAD_CX - 11} mirror={false} />
      <Eye cx={HEAD_CX + 11} mirror={true} />

      {/* nose */}
      <Path d={`M ${HEAD_CX - 2} ${HEAD_CY - 2} Q ${HEAD_CX - 4} ${HEAD_CY + 8} ${HEAD_CX} ${HEAD_CY + 10}`} stroke="#8A6B49" strokeWidth={1.6} fill="none" opacity={0.7} />

      {/* mustache */}
      <Path
        d={`M ${HEAD_CX - 14} ${HEAD_CY + 14} Q ${HEAD_CX - 8} ${HEAD_CY + 10} ${HEAD_CX} ${HEAD_CY + 13} Q ${HEAD_CX + 8} ${HEAD_CY + 10} ${HEAD_CX + 14} ${HEAD_CY + 14} Q ${HEAD_CX + 6} ${HEAD_CY + 17} ${HEAD_CX} ${HEAD_CY + 15} Q ${HEAD_CX - 6} ${HEAD_CY + 17} ${HEAD_CX - 14} ${HEAD_CY + 14} Z`}
        fill="#241C13"
        stroke={INK}
        strokeWidth={1}
      />

      {/* mouth - downturned, tired */}
      <Path d={`M ${HEAD_CX - 7} ${HEAD_CY + 21} Q ${HEAD_CX} ${HEAD_CY + 18} ${HEAD_CX + 7} ${HEAD_CY + 21}`} stroke={INK} strokeWidth={2} fill="none" strokeLinecap="round" />

      {/* stubble - hugs jaw/chin arc */}
      {[
        [23.4, 13.5], [19.1, 19.1], [13.5, 23.4], [7, 26.1], [0, 27],
        [-7, 26.1], [-13.5, 23.4], [-19.1, 19.1], [-23.4, 13.5],
      ].map(([dx, dy], i) => (
        <Circle key={i} cx={HEAD_CX + dx} cy={HEAD_CY + dy} r={1} fill="#241C13" opacity={0.5} />
      ))}

      {/* beanie - flat cel shading, ribbed knit, pulled low */}
      <Path d={BEANIE_PATH} fill="#293040" stroke={INK} strokeWidth={2.2} />
      <G clipPath="url(#beanieClip)">
        <Rect x={HEAD_CX} y={HEAD_CY - 40} width={HEAD_R + 4} height={40} fill="#141821" />
        <Ellipse cx={HEAD_CX - 14} cy={HEAD_CY - 26} rx={12} ry={8} fill="#3D4658" opacity={0.8} />
        {[-20, -12, -4, 4, 12, 20].map((dx, i) => (
          <Path
            key={i}
            d={`M ${HEAD_CX + dx} ${HEAD_CY - 30} Q ${HEAD_CX + dx * 1.05} ${HEAD_CY - 15} ${HEAD_CX + dx * 1.1} ${HEAD_CY - 8}`}
            stroke="#00000060"
            strokeWidth={1}
            fill="none"
          />
        ))}
      </G>
      {/* folded cuff */}
      <Rect x={HEAD_CX - HEAD_R - 2} y={HEAD_CY - 12} width={HEAD_R * 2 + 4} height={10} rx={5} fill="#1B2029" stroke={INK} strokeWidth={1.6} />
      <Line x1={HEAD_CX - HEAD_R} y1={HEAD_CY - 7} x2={HEAD_CX + HEAD_R} y2={HEAD_CY - 7} stroke="#00000070" strokeWidth={1} />
    </Svg>
  );
}
