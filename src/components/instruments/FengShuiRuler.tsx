import { motion } from 'framer-motion';

interface RulerProps {
  width?: number;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

// Simplified Lu Ban ruler markings
const markings = [
  { pos: 5, label: '财', type: 'good' as const },
  { pos: 18, label: '病', type: 'bad' as const },
  { pos: 31, label: '离', type: 'bad' as const },
  { pos: 44, label: '义', type: 'good' as const },
  { pos: 57, label: '官', type: 'good' as const },
  { pos: 70, label: '劫', type: 'bad' as const },
  { pos: 83, label: '害', type: 'bad' as const },
  { pos: 96, label: '本', type: 'good' as const },
];

export default function FengShuiRuler({ width = 280, className = '', orientation = 'horizontal' }: RulerProps) {
  const height = 32;
  const isHorizontal = orientation === 'horizontal';
  const svgWidth = isHorizontal ? width : height;
  const svgHeight = isHorizontal ? height : width;

  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }}
      style={{ transformOrigin: 'left center' }}
    >
      <svg
        width={svgWidth}
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className={isHorizontal ? '' : 'vertical-text'}
      >
        {/* Ruler body */}
        <rect
          x={2}
          y={2}
          width={svgWidth - 4}
          height={svgHeight - 4}
          rx={3}
          fill="#F2EFE9"
          stroke="#BFB8AF"
          strokeWidth="1"
          opacity="0.8"
        />

        {/* Wood grain lines */}
        {Array.from({ length: 5 }).map((_, i) => (
          <line
            key={`grain-${i}`}
            x1={svgWidth * 0.15 + i * svgWidth * 0.16}
            y1={4}
            x2={svgWidth * 0.12 + i * svgWidth * 0.16}
            y2={svgHeight - 4}
            stroke="#BFB8AF"
            strokeWidth="0.4"
            opacity="0.25"
          />
        ))}

        {/* Markings */}
        {markings.map((m) => {
          const x = (m.pos / 100) * svgWidth;
          return (
            <g key={m.pos}>
              {/* Long tick mark */}
              <line
                x1={x}
                y1={svgHeight * 0.35}
                x2={x}
                y2={svgHeight * 0.85}
                stroke={m.type === 'good' ? '#C43A31' : '#2C2C2C'}
                strokeWidth="0.8"
                opacity="0.6"
              />
              {/* Label */}
              <text
                x={x}
                y={svgHeight * 0.28}
                textAnchor="middle"
                fontSize="9"
                fill={m.type === 'good' ? '#C43A31' : '#8C8C8C'}
                opacity="0.7"
                style={{ fontFamily: "'Noto Serif SC', serif" }}
              >
                {m.label}
              </text>
            </g>
          );
        })}

        {/* Sub-tick marks between markings */}
        {Array.from({ length: 20 }).map((_, i) => {
          const x = ((i + 1) / 21) * svgWidth;
          // Skip if near a major marking
          const nearMajor = markings.some((m) => Math.abs((m.pos / 100) * svgWidth - x) < 6);
          if (nearMajor) return null;
          return (
            <line
              key={`sub-${i}`}
              x1={x}
              y1={svgHeight * 0.55}
              x2={x}
              y2={svgHeight * 0.75}
              stroke="#BFB8AF"
              strokeWidth="0.4"
              opacity="0.4"
            />
          );
        })}

        {/* End caps */}
        <line x1={4} y1={svgHeight * 0.35} x2={4} y2={svgHeight * 0.85} stroke="#BFB8AF" strokeWidth="1" opacity="0.3" />
        <line x1={svgWidth - 4} y1={svgHeight * 0.35} x2={svgWidth - 4} y2={svgHeight * 0.85} stroke="#BFB8AF" strokeWidth="1" opacity="0.3" />
      </svg>
    </motion.div>
  );
}
