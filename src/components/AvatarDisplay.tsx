import React from 'react';
import Svg, {
  Circle,
  Ellipse,
  Rect,
  Path,
  Line,
  G,
  Defs,
  RadialGradient,
  Stop,
  Polygon,
} from 'react-native-svg';
import CwelAvatar from './CwelAvatar';
import MichalAvatar from './MichalAvatar';
import BojackAvatar from './BojackAvatar';

interface Props {
  level: number; // 0..10
  size?: number;
}

type Expression = 'sad' | 'focused' | 'confident' | 'heroic' | 'legendary';
type HatType = 'beanie' | 'bandana' | 'hair' | 'headband' | 'helmet' | 'helmetPlume' | 'crown';
type WeaponType =
  | 'bottle'
  | 'stick'
  | 'knife'
  | 'machete'
  | 'axe'
  | 'sword'
  | 'swordShield'
  | 'greatsword'
  | 'glowSword'
  | 'goldSword'
  | 'powerSword';

interface LevelConfig {
  skin: string;
  hatType: HatType;
  hatColor: string;
  hairColor: string;
  shirtColor: string;
  shirtAccent: string;
  pantsColor: string;
  shoeColor: string;
  torn: boolean;
  weapon: WeaponType;
  weaponAccent: string;
  cape: boolean;
  capeColor: string;
  glow: boolean;
  expression: Expression;
  scar: boolean;
  cigarette: boolean;
}

const CONFIGS: LevelConfig[] = [
  {
    skin: '#C9A67A',
    hatType: 'beanie',
    hatColor: '#F97316',
    hairColor: '#3F2E1E',
    shirtColor: '#57534E',
    shirtAccent: '#3F3B36',
    pantsColor: '#3F3B36',
    shoeColor: '#1C1917',
    torn: true,
    weapon: 'bottle',
    weaponAccent: '#4D7C0F',
    cape: false,
    capeColor: '#000',
    glow: false,
    expression: 'sad',
    scar: false,
    cigarette: true,
  },
  {
    // unused placeholder (idx 1 is intercepted by MichalAvatar)
    skin: '#D8AE7E',
    hatType: 'hair',
    hatColor: '#3F2E1E',
    hairColor: '#3F2E1E',
    shirtColor: '#3B5B7A',
    shirtAccent: '#2A4360',
    pantsColor: '#44403C',
    shoeColor: '#1F2937',
    torn: false,
    weapon: 'knife',
    weaponAccent: '#9CA3AF',
    cape: false,
    capeColor: '#000',
    glow: false,
    expression: 'focused',
    scar: false,
    cigarette: false,
  },
  {
    // Frajer
    skin: '#C9A67A',
    hatType: 'bandana',
    hatColor: '#78716C',
    hairColor: '#3F2E1E',
    shirtColor: '#6B7280',
    shirtAccent: '#52525B',
    pantsColor: '#44403C',
    shoeColor: '#1F2937',
    torn: true,
    weapon: 'stick',
    weaponAccent: '#78350F',
    cape: false,
    capeColor: '#000',
    glow: false,
    expression: 'sad',
    scar: false,
    cigarette: false,
  },
  {
    skin: '#D8AE7E',
    hatType: 'headband',
    hatColor: '#7F1D1D',
    hairColor: '#3F2E1E',
    shirtColor: '#065F46',
    shirtAccent: '#78350F',
    pantsColor: '#78350F',
    shoeColor: '#3F2E1E',
    torn: false,
    weapon: 'machete',
    weaponAccent: '#9CA3AF',
    cape: false,
    capeColor: '#000',
    glow: false,
    expression: 'confident',
    scar: false,
    cigarette: false,
  },
  {
    skin: '#D8AE7E',
    hatType: 'headband',
    hatColor: '#1E3A8A',
    hairColor: '#3F2E1E',
    shirtColor: '#166534',
    shirtAccent: '#78350F',
    pantsColor: '#78350F',
    shoeColor: '#3F2E1E',
    torn: false,
    weapon: 'axe',
    weaponAccent: '#57534E',
    cape: false,
    capeColor: '#000',
    glow: false,
    expression: 'confident',
    scar: false,
    cigarette: false,
  },
  {
    skin: '#D8AE7E',
    hatType: 'hair',
    hatColor: '#292524',
    hairColor: '#292524',
    shirtColor: '#1D4ED8',
    shirtAccent: '#78350F',
    pantsColor: '#44403C',
    shoeColor: '#1F2937',
    torn: false,
    weapon: 'sword',
    weaponAccent: '#D4D4D8',
    cape: false,
    capeColor: '#000',
    glow: false,
    expression: 'confident',
    scar: true,
    cigarette: false,
  },
  {
    skin: '#D8AE7E',
    hatType: 'helmet',
    hatColor: '#71717A',
    hairColor: '#292524',
    shirtColor: '#52525B',
    shirtAccent: '#1E40AF',
    pantsColor: '#3F3F46',
    shoeColor: '#27272A',
    torn: false,
    weapon: 'swordShield',
    weaponAccent: '#1E40AF',
    cape: false,
    capeColor: '#000',
    glow: false,
    expression: 'heroic',
    scar: true,
    cigarette: false,
  },
  {
    skin: '#D8AE7E',
    hatType: 'helmetPlume',
    hatColor: '#71717A',
    hairColor: '#292524',
    shirtColor: '#52525B',
    shirtAccent: '#B91C1C',
    pantsColor: '#3F3F46',
    shoeColor: '#27272A',
    torn: false,
    weapon: 'greatsword',
    weaponAccent: '#D4D4D8',
    cape: false,
    capeColor: '#000',
    glow: false,
    expression: 'heroic',
    scar: true,
    cigarette: false,
  },
  {
    skin: '#D8AE7E',
    hatType: 'helmetPlume',
    hatColor: '#71717A',
    hairColor: '#292524',
    shirtColor: '#52525B',
    shirtAccent: '#6D28D9',
    pantsColor: '#3F3F46',
    shoeColor: '#27272A',
    torn: false,
    weapon: 'glowSword',
    weaponAccent: '#C084FC',
    cape: false,
    capeColor: '#000',
    glow: true,
    expression: 'legendary',
    scar: true,
    cigarette: false,
  },
  {
    skin: '#D8AE7E',
    hatType: 'hair',
    hatColor: '#292524',
    hairColor: '#292524',
    shirtColor: '#F5F5F4',
    shirtAccent: '#EAB308',
    pantsColor: '#EAB308',
    shoeColor: '#78350F',
    torn: false,
    weapon: 'goldSword',
    weaponAccent: '#FDE047',
    cape: true,
    capeColor: '#B91C1C',
    glow: true,
    expression: 'legendary',
    scar: true,
    cigarette: false,
  },
  {
    skin: '#D8AE7E',
    hatType: 'crown',
    hatColor: '#EAB308',
    hairColor: '#292524',
    shirtColor: '#F5F5F4',
    shirtAccent: '#EAB308',
    pantsColor: '#EAB308',
    shoeColor: '#78350F',
    torn: false,
    weapon: 'powerSword',
    weaponAccent: '#FDE047',
    cape: true,
    capeColor: '#EAB308',
    glow: true,
    expression: 'legendary',
    scar: true,
    cigarette: false,
  },
];

const HEAD_CX = 100;
const HEAD_CY = 86;
const HEAD_R = 27;
const RIGHT_HAND = { x: 152, y: 178 };
const LEFT_HAND = { x: 58, y: 172 };

function Weapon({ type, accent, hand }: { type: WeaponType; accent: string; hand: { x: number; y: number } }) {
  const { x, y } = hand;
  switch (type) {
    case 'bottle':
      return (
        <G transform={`rotate(-25 ${x} ${y})`}>
          <Rect x={x - 4} y={y - 34} width={8} height={14} fill="#4D7C0F" />
          <Rect x={x - 8} y={y - 22} width={16} height={30} rx={4} fill="#65A30D" />
          <Rect x={x - 6} y={y - 14} width={12} height={10} rx={1} fill="#F5F5DC" opacity={0.85} />
        </G>
      );
    case 'stick':
      return (
        <Rect x={x - 3} y={y - 46} width={6} height={50} rx={3} fill={accent} transform={`rotate(15 ${x} ${y})`} />
      );
    case 'knife':
      return (
        <G transform={`rotate(-15 ${x} ${y})`}>
          <Rect x={x - 3} y={y - 8} width={6} height={18} rx={2} fill="#78350F" />
          <Polygon points={`${x - 4},${y - 8} ${x + 4},${y - 8} ${x},${y - 32}`} fill={accent} />
        </G>
      );
    case 'machete':
      return (
        <G transform={`rotate(-20 ${x} ${y})`}>
          <Rect x={x - 4} y={y - 6} width={8} height={20} rx={2} fill="#78350F" />
          <Polygon points={`${x - 6},${y - 6} ${x + 6},${y - 6} ${x + 4},${y - 52} ${x - 2},${y - 52}`} fill={accent} />
        </G>
      );
    case 'axe':
      return (
        <G transform={`rotate(-10 ${x} ${y})`}>
          <Rect x={x - 3} y={y - 50} width={6} height={64} rx={3} fill="#78350F" />
          <Path
            d={`M ${x - 3} ${y - 50} L ${x - 26} ${y - 40} L ${x - 22} ${y - 24} L ${x - 3} ${y - 30} Z`}
            fill={accent}
          />
        </G>
      );
    case 'sword':
      return (
        <G transform={`rotate(-15 ${x} ${y})`}>
          <Rect x={x - 4} y={y - 10} width={8} height={20} rx={2} fill="#78350F" />
          <Rect x={x - 8} y={y - 16} width={16} height={7} rx={2} fill="#CA8A04" />
          <Polygon points={`${x - 4},${y - 16} ${x + 4},${y - 16} ${x + 2},${y - 66} ${x - 2},${y - 66}`} fill={accent} />
        </G>
      );
    case 'swordShield':
      return (
        <>
          <G transform={`rotate(-15 ${x} ${y})`}>
            <Rect x={x - 4} y={y - 10} width={8} height={20} rx={2} fill="#78350F" />
            <Rect x={x - 8} y={y - 16} width={16} height={7} rx={2} fill="#CA8A04" />
            <Polygon points={`${x - 4},${y - 16} ${x + 4},${y - 16} ${x + 2},${y - 62} ${x - 2},${y - 62}`} fill="#D4D4D8" />
          </G>
          <G>
            <Path
              d={`M ${LEFT_HAND.x} ${LEFT_HAND.y - 30} q -20 6 -20 26 q 0 18 20 26 q 20 -8 20 -26 q 0 -20 -20 -26 Z`}
              fill={accent}
              stroke="#1E293B"
              strokeWidth={2}
            />
            <Circle cx={LEFT_HAND.x} cy={LEFT_HAND.y - 4} r={5} fill="#FDE047" />
          </G>
        </>
      );
    case 'greatsword':
      return (
        <G transform={`rotate(-12 ${x} ${y})`}>
          <Rect x={x - 5} y={y - 12} width={10} height={26} rx={3} fill="#3F3F46" />
          <Rect x={x - 12} y={y - 20} width={24} height={9} rx={2} fill="#A1A1AA" />
          <Polygon points={`${x - 6},${y - 20} ${x + 6},${y - 20} ${x + 3},${y - 82} ${x - 3},${y - 82}`} fill={accent} />
        </G>
      );
    case 'glowSword':
      return (
        <G transform={`rotate(-15 ${x} ${y})`}>
          <Circle cx={x} cy={y - 40} r={26} fill={accent} opacity={0.25} />
          <Rect x={x - 4} y={y - 10} width={8} height={20} rx={2} fill="#3F3F46" />
          <Rect x={x - 9} y={y - 16} width={18} height={7} rx={2} fill="#A1A1AA" />
          <Polygon points={`${x - 4},${y - 16} ${x + 4},${y - 16} ${x + 2},${y - 68} ${x - 2},${y - 68}`} fill="#E9D5FF" />
        </G>
      );
    case 'goldSword':
      return (
        <G transform={`rotate(-15 ${x} ${y})`}>
          <Circle cx={x} cy={y - 40} r={24} fill={accent} opacity={0.25} />
          <Rect x={x - 4} y={y - 10} width={8} height={20} rx={2} fill="#92400E" />
          <Rect x={x - 9} y={y - 16} width={18} height={7} rx={2} fill="#EAB308" />
          <Polygon points={`${x - 4},${y - 16} ${x + 4},${y - 16} ${x + 2},${y - 70} ${x - 2},${y - 70}`} fill="#FEF3C7" />
        </G>
      );
    case 'powerSword':
      return (
        <G transform={`rotate(-15 ${x} ${y})`}>
          <Circle cx={x} cy={y - 42} r={34} fill={accent} opacity={0.3} />
          <Rect x={x - 4} y={y - 10} width={8} height={20} rx={2} fill="#92400E" />
          <Rect x={x - 10} y={y - 17} width={20} height={8} rx={2} fill="#EAB308" />
          <Polygon points={`${x - 5},${y - 17} ${x + 5},${y - 17} ${x + 2},${y - 76} ${x - 2},${y - 76}`} fill="#FEF9C3" />
        </G>
      );
    default:
      return null;
  }
}

function Hat({ type, color }: { type: HatType; color: string }) {
  const top = HEAD_CY - HEAD_R;
  switch (type) {
    case 'beanie':
      return (
        <G>
          <Path
            d={`M ${HEAD_CX - HEAD_R} ${top + 10} Q ${HEAD_CX} ${top - 14} ${HEAD_CX + HEAD_R} ${top + 10} L ${HEAD_CX + HEAD_R - 2} ${top + 16} Q ${HEAD_CX} ${top - 2} ${HEAD_CX - HEAD_R + 2} ${top + 16} Z`}
            fill={color}
          />
          <Circle cx={HEAD_CX} cy={top - 14} r={5} fill="#FED7AA" />
        </G>
      );
    case 'bandana':
      return (
        <G>
          <Rect x={HEAD_CX - HEAD_R} y={top + 8} width={HEAD_R * 2} height={11} fill={color} />
          <Polygon
            points={`${HEAD_CX + HEAD_R - 4},${top + 12} ${HEAD_CX + HEAD_R + 10},${top + 20} ${HEAD_CX + HEAD_R - 4},${top + 24}`}
            fill={color}
          />
        </G>
      );
    case 'hair':
      return (
        <Path
          d={`M ${HEAD_CX - HEAD_R + 1} ${HEAD_CY - 4} Q ${HEAD_CX - HEAD_R} ${top - 8} ${HEAD_CX} ${top - 10} Q ${HEAD_CX + HEAD_R} ${top - 8} ${HEAD_CX + HEAD_R - 1} ${HEAD_CY - 4} Q ${HEAD_CX} ${top + 6} ${HEAD_CX - HEAD_R + 1} ${HEAD_CY - 4} Z`}
          fill={color}
        />
      );
    case 'headband':
      return (
        <G>
          <Path
            d={`M ${HEAD_CX - HEAD_R + 1} ${HEAD_CY - 6} Q ${HEAD_CX - HEAD_R} ${top - 8} ${HEAD_CX} ${top - 10} Q ${HEAD_CX + HEAD_R} ${top - 8} ${HEAD_CX + HEAD_R - 1} ${HEAD_CY - 6} Q ${HEAD_CX} ${top + 6} ${HEAD_CX - HEAD_R + 1} ${HEAD_CY - 6} Z`}
            fill="#292524"
          />
          <Rect x={HEAD_CX - HEAD_R} y={top + 10} width={HEAD_R * 2} height={7} fill={color} />
        </G>
      );
    case 'helmet':
      return (
        <G>
          <Path
            d={`M ${HEAD_CX - HEAD_R - 2} ${HEAD_CY + 4} Q ${HEAD_CX - HEAD_R - 4} ${top - 16} ${HEAD_CX} ${top - 16} Q ${HEAD_CX + HEAD_R + 4} ${top - 16} ${HEAD_CX + HEAD_R + 2} ${HEAD_CY + 4} L ${HEAD_CX + HEAD_R - 4} ${HEAD_CY + 4} Q ${HEAD_CX} ${HEAD_CY - 14} ${HEAD_CX - HEAD_R + 4} ${HEAD_CY + 4} Z`}
            fill={color}
          />
          <Rect x={HEAD_CX - 5} y={top - 16} width={10} height={14} fill="#3F3F46" />
        </G>
      );
    case 'helmetPlume':
      return (
        <G>
          <Path
            d={`M ${HEAD_CX - HEAD_R - 2} ${HEAD_CY + 4} Q ${HEAD_CX - HEAD_R - 4} ${top - 16} ${HEAD_CX} ${top - 16} Q ${HEAD_CX + HEAD_R + 4} ${top - 16} ${HEAD_CX + HEAD_R + 2} ${HEAD_CY + 4} L ${HEAD_CX + HEAD_R - 4} ${HEAD_CY + 4} Q ${HEAD_CX} ${HEAD_CY - 14} ${HEAD_CX - HEAD_R + 4} ${HEAD_CY + 4} Z`}
            fill={color}
          />
          <Rect x={HEAD_CX - 5} y={top - 16} width={10} height={14} fill="#3F3F46" />
          <Path
            d={`M ${HEAD_CX} ${top - 16} Q ${HEAD_CX - 6} ${top - 40} ${HEAD_CX + 2} ${top - 52} Q ${HEAD_CX + 10} ${top - 34} ${HEAD_CX} ${top - 16} Z`}
            fill="#B91C1C"
          />
        </G>
      );
    case 'crown':
      return (
        <Polygon
          points={`${HEAD_CX - HEAD_R + 2},${top + 6} ${HEAD_CX - HEAD_R + 6},${top - 14} ${HEAD_CX - 8},${top} ${HEAD_CX},${top - 20} ${HEAD_CX + 8},${top} ${HEAD_CX + HEAD_R - 6},${top - 14} ${HEAD_CX + HEAD_R - 2},${top + 6} Z`}
          fill={color}
          stroke="#92400E"
          strokeWidth={1}
        />
      );
    default:
      return null;
  }
}

function Face({ expression, scar }: { expression: Expression; scar: boolean }) {
  const eyeY = HEAD_CY - 2;
  const browY = eyeY - 9;
  const mouthY = HEAD_CY + 14;

  let leftBrow = `M ${HEAD_CX - 15} ${browY} L ${HEAD_CX - 5} ${browY}`;
  let rightBrow = `M ${HEAD_CX + 5} ${browY} L ${HEAD_CX + 15} ${browY}`;
  let mouthPath = `M ${HEAD_CX - 8} ${mouthY} Q ${HEAD_CX} ${mouthY + 4} ${HEAD_CX + 8} ${mouthY}`;
  let eyeShape: 'sleepy' | 'normal' | 'bright' = 'normal';

  switch (expression) {
    case 'sad':
      leftBrow = `M ${HEAD_CX - 16} ${browY - 2} L ${HEAD_CX - 5} ${browY + 3}`;
      rightBrow = `M ${HEAD_CX + 5} ${browY + 3} L ${HEAD_CX + 16} ${browY - 2}`;
      mouthPath = `M ${HEAD_CX - 8} ${mouthY + 3} Q ${HEAD_CX} ${mouthY - 3} ${HEAD_CX + 8} ${mouthY + 3}`;
      eyeShape = 'sleepy';
      break;
    case 'focused':
      leftBrow = `M ${HEAD_CX - 16} ${browY + 2} L ${HEAD_CX - 4} ${browY - 2}`;
      rightBrow = `M ${HEAD_CX + 4} ${browY - 2} L ${HEAD_CX + 16} ${browY + 2}`;
      mouthPath = `M ${HEAD_CX - 7} ${mouthY} L ${HEAD_CX + 7} ${mouthY}`;
      eyeShape = 'normal';
      break;
    case 'confident':
      mouthPath = `M ${HEAD_CX - 8} ${mouthY} Q ${HEAD_CX} ${mouthY + 6} ${HEAD_CX + 8} ${mouthY}`;
      eyeShape = 'normal';
      break;
    case 'heroic':
      leftBrow = `M ${HEAD_CX - 16} ${browY - 2} L ${HEAD_CX - 4} ${browY}`;
      rightBrow = `M ${HEAD_CX + 4} ${browY} L ${HEAD_CX + 16} ${browY - 2}`;
      mouthPath = `M ${HEAD_CX - 9} ${mouthY} Q ${HEAD_CX} ${mouthY + 7} ${HEAD_CX + 9} ${mouthY}`;
      eyeShape = 'bright';
      break;
    case 'legendary':
      mouthPath = `M ${HEAD_CX - 10} ${mouthY - 1} Q ${HEAD_CX} ${mouthY + 8} ${HEAD_CX + 10} ${mouthY - 1}`;
      eyeShape = 'bright';
      break;
  }

  return (
    <G>
      <Path d={leftBrow} stroke="#292524" strokeWidth={2.2} strokeLinecap="round" />
      <Path d={rightBrow} stroke="#292524" strokeWidth={2.2} strokeLinecap="round" />

      {eyeShape === 'sleepy' ? (
        <>
          <Ellipse cx={HEAD_CX - 10} cy={eyeY} rx={4} ry={1.6} fill="#292524" />
          <Ellipse cx={HEAD_CX + 10} cy={eyeY} rx={4} ry={1.6} fill="#292524" />
          <Ellipse cx={HEAD_CX - 10} cy={eyeY + 5} rx={5} ry={2} fill="#00000022" />
          <Ellipse cx={HEAD_CX + 10} cy={eyeY + 5} rx={5} ry={2} fill="#00000022" />
        </>
      ) : eyeShape === 'bright' ? (
        <>
          <Circle cx={HEAD_CX - 10} cy={eyeY} r={3.6} fill="#1C1917" />
          <Circle cx={HEAD_CX + 10} cy={eyeY} r={3.6} fill="#1C1917" />
          <Circle cx={HEAD_CX - 11} cy={eyeY - 1.2} r={1.2} fill="#FDE68A" />
          <Circle cx={HEAD_CX + 9} cy={eyeY - 1.2} r={1.2} fill="#FDE68A" />
        </>
      ) : (
        <>
          <Circle cx={HEAD_CX - 10} cy={eyeY} r={3.2} fill="#1C1917" />
          <Circle cx={HEAD_CX + 10} cy={eyeY} r={3.2} fill="#1C1917" />
        </>
      )}

      <Path d={mouthPath} stroke="#292524" strokeWidth={2} fill="none" strokeLinecap="round" />

      {scar && (
        <Line
          x1={HEAD_CX + 13}
          y1={eyeY - 10}
          x2={HEAD_CX + 8}
          y2={eyeY + 8}
          stroke="#B45309"
          strokeWidth={1.6}
          opacity={0.75}
        />
      )}
    </G>
  );
}

export default function AvatarDisplay({ level, size = 260 }: Props) {
  const idx = Math.max(0, Math.min(CONFIGS.length - 1, level));

  if (idx === 0) {
    return <CwelAvatar size={size} />;
  }
  if (idx === 1) {
    return <MichalAvatar size={size} />;
  }
  if (idx === 3) {
    return <BojackAvatar size={size} />;
  }

  const c = CONFIGS[idx];

  return (
    <Svg width={size} height={size * (300 / 220)} viewBox="0 0 220 300">
      <Defs>
        <RadialGradient id="auraGlow" cx="50%" cy="50%" r="50%">
          <Stop offset="0%" stopColor="#FDE047" stopOpacity={0.4} />
          <Stop offset="100%" stopColor="#FDE047" stopOpacity={0} />
        </RadialGradient>
      </Defs>

      {c.glow && <Circle cx={110} cy={150} r={130} fill="url(#auraGlow)" />}

      <Ellipse cx={100} cy={280} rx={48} ry={10} fill="#000000" opacity={0.25} />

      {c.cape && (
        <Path
          d={`M ${72} ${125} Q ${30} ${170} ${44} ${250} Q ${70} ${220} ${78} ${190} Z`}
          fill={c.capeColor}
        />
      )}

      {/* back arm (character's right, holds shield for swordShield) */}
      <Line
        x1={76}
        y1={130}
        x2={LEFT_HAND.x}
        y2={LEFT_HAND.y}
        stroke={c.skin}
        strokeWidth={13}
        strokeLinecap="round"
      />

      {/* legs */}
      <Rect x={78} y={190} width={16} height={56} rx={7} fill={c.pantsColor} />
      <Rect x={102} y={190} width={16} height={56} rx={7} fill={c.pantsColor} />
      {c.torn && (
        <G>
          <Path d={`M 90 208 L 98 212 L 91 220 Z`} fill="#00000055" />
          <Circle cx={93} cy={213} r={2.4} fill={c.skin} />
        </G>
      )}

      {/* shoes */}
      <Ellipse cx={86} cy={250} rx={14} ry={8} fill={c.shoeColor} />
      <Ellipse cx={110} cy={250} rx={14} ry={8} fill={c.shoeColor} />

      {/* torso */}
      <Rect x={72} y={120} width={56} height={76} rx={16} fill={c.shirtColor} />
      <Rect x={72} y={182} width={56} height={9} fill={c.shirtAccent} />

      {/* neck */}
      <Rect x={94} y={108} width={12} height={16} fill={c.skin} />

      {/* front arm (holds main weapon) */}
      <Line
        x1={124}
        y1={130}
        x2={RIGHT_HAND.x}
        y2={RIGHT_HAND.y}
        stroke={c.skin}
        strokeWidth={13}
        strokeLinecap="round"
      />

      <Weapon type={c.weapon} accent={c.weaponAccent} hand={RIGHT_HAND} />
      <Circle cx={RIGHT_HAND.x} cy={RIGHT_HAND.y} r={7} fill={c.skin} />
      <Circle cx={LEFT_HAND.x} cy={LEFT_HAND.y} r={7} fill={c.skin} />

      {/* head */}
      <Circle cx={HEAD_CX} cy={HEAD_CY} r={HEAD_R} fill={c.skin} />
      <Face expression={c.expression} scar={c.scar} />
      <Hat type={c.hatType} color={c.hatColor} />

      {c.cigarette && (
        <G>
          <Line x1={HEAD_CX + 12} y1={HEAD_CY + 16} x2={HEAD_CX + 26} y2={HEAD_CY + 12} stroke="#E7E5E4" strokeWidth={2.4} strokeLinecap="round" />
          <Circle cx={HEAD_CX + 27} cy={HEAD_CY + 11.5} r={1.6} fill="#F97316" />
          <Path
            d={`M ${HEAD_CX + 29} ${HEAD_CY + 9} Q ${HEAD_CX + 34} ${HEAD_CY} ${HEAD_CX + 30} ${HEAD_CY - 8}`}
            stroke="#D6D3D1"
            strokeWidth={1.3}
            fill="none"
            opacity={0.6}
          />
        </G>
      )}
    </Svg>
  );
}
