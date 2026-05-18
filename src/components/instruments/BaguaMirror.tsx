import { motion } from 'framer-motion';

interface BaguaMirrorProps {
  size?: number;
  className?: string;
  autoRotate?: boolean;
}

const trigrams = [
  { name: '☰', label: '乾', element: '天' },
  { name: '☱', label: '兑', element: '泽' },
  { name: '☲', label: '离', element: '火' },
  { name: '☳', label: '震', element: '雷' },
  { name: '☴', label: '巽', element: '风' },
  { name: '☵', label: '坎', element: '水' },
  { name: '☶', label: '艮', element: '山' },
  { name: '☷', label: '坤', element: '地' },
];

export default function BaguaMirror({ size = 160, className = '', autoRotate = true }: BaguaMirrorProps) {
  const half = size / 2;
  const outerR = half * 0.92;
  const midR = half * 0.62;
  const innerR = half * 0.32;

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <motion.svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        animate={autoRotate ? { rotate: 360 } : {}}
        transition={
          autoRotate
            ? { duration: 60, repeat: Infinity, ease: 'linear' }
            : {}
        }
      >
        {/* Octagonal outer border */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * Math.PI) / 4 - Math.PI / 2;
          const x1 = half + outerR * Math.cos(angle);
          const y1 = half + outerR * Math.sin(angle);
          const x2 = half + outerR * Math.cos(angle + Math.PI / 4);
          const y2 = half + outerR * Math.sin(angle + Math.PI / 4);
          return (
            <line
              key={`outer-${i}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#C43A31"
              strokeWidth="1.5"
              opacity="0.6"
            />
          );
        })}

        {/* Trigrams */}
        {trigrams.map((trigram, i) => {
          const angle = (i * Math.PI) / 4 - Math.PI / 2 + Math.PI / 8;
          const x = half + (midR + outerR) / 2 * Math.cos(angle);
          const y = half + (midR + outerR) / 2 * Math.sin(angle);
          return (
            <text
              key={i}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={size * 0.115}
              fill="#2C2C2C"
              opacity="0.7"
              transform={`rotate(${(i * 360) / 8}, ${x}, ${y})`}
            >
              {trigram.name}
            </text>
          );
        })}

        {/* Mid ring - labels */}
        {trigrams.map((trigram, i) => {
          const angle = (i * Math.PI) / 4 - Math.PI / 2 + Math.PI / 8;
          const x = half + (innerR + midR) / 2 * Math.cos(angle);
          const y = half + (innerR + midR) / 2 * Math.sin(angle);
          return (
            <text
              key={`label-${i}`}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={size * 0.08}
              fill="#4A4A4A"
              opacity="0.5"
            >
              {trigram.label}
            </text>
          );
        })}

        {/* Inner ring */}
        <circle cx={half} cy={half} r={innerR} fill="none" stroke="#BFB8AF" strokeWidth="0.8" opacity="0.4" />

        {/* Center mirror */}
        <circle cx={half} cy={half} r={innerR * 0.75} fill="none" stroke="#4A6B8A" strokeWidth="1" opacity="0.3" />
        <circle cx={half} cy={half} r={innerR * 0.45} fill="none" stroke="#4A6B8A" strokeWidth="0.6" opacity="0.2" />
        <circle cx={half} cy={half} r={3} fill="#C43A31" opacity="0.5" />
      </motion.svg>
    </div>
  );
}
