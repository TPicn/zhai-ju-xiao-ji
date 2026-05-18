import { motion } from 'framer-motion';

interface FiveElementsWheelProps {
  size?: number;
  className?: string;
}

const elements = [
  { name: '木', color: '#5B8C5A', icon: '🌿', angle: 0 },
  { name: '火', color: '#C43A31', icon: '🔥', angle: 72 },
  { name: '土', color: '#B8A05E', icon: '🏔️', angle: 144 },
  { name: '金', color: '#B8B8B8', icon: '⚜️', angle: 216 },
  { name: '水', color: '#3B6B8A', icon: '💧', angle: 288 },
];

export default function FiveElementsWheel({ size = 180, className = '' }: FiveElementsWheelProps) {
  const half = size / 2;
  const r = half * 0.78;
  const innerR = half * 0.2;

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {/* Outer glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{ opacity: [0.03, 0.06, 0.03] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ background: `radial-gradient(circle, rgba(44,44,44,0.1) 0%, transparent 70%)` }}
      />

      <motion.svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        {/* Element wedges */}
        {elements.map((el, i) => {
          const startAngle = (el.angle - 90) * (Math.PI / 180);
          const endAngle = (el.angle + 72 - 90) * (Math.PI / 180);
          const x1 = half + r * Math.cos(startAngle);
          const y1 = half + r * Math.sin(startAngle);
          const x2 = half + r * Math.cos(endAngle);
          const y2 = half + r * Math.sin(endAngle);
          const largeArc = 72 > 180 ? 1 : 0;

          const pathD = [
            `M ${half} ${half}`,
            `L ${x1} ${y1}`,
            `A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`,
            'Z',
          ].join(' ');

          return (
            <motion.path
              key={el.name}
              d={pathD}
              fill={el.color}
              opacity={0.12}
              whileHover={{ opacity: 0.25 }}
            />
          );
        })}

        {/* Element labels */}
        {elements.map((el, i) => {
          const midAngle = (el.angle + 36 - 90) * (Math.PI / 180);
          const labelR = r * 0.62;
          const lx = half + labelR * Math.cos(midAngle);
          const ly = half + labelR * Math.sin(midAngle);
          return (
            <text
              key={el.name}
              x={lx}
              y={ly}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={size * 0.14}
              fill={el.color}
              opacity="0.7"
              style={{ fontFamily: "'ZCOOL KuaiLe', 'Ma Shan Zheng', 'STXingkai', cursive" }}
            >
              {el.name}
            </text>
          );
        })}

        {/* Connecting lines (generating/overcoming cycle) */}
        {elements.map((el, i) => {
          const nextIdx = (i + 1) % 5;
          const angle1 = (el.angle + 36 - 90) * (Math.PI / 180);
          const angle2 = (elements[nextIdx].angle + 36 - 90) * (Math.PI / 180);
          const lr = r * 0.35;
          return (
            <line
              key={`line-${i}`}
              x1={half + lr * Math.cos(angle1)}
              y1={half + lr * Math.sin(angle1)}
              x2={half + lr * Math.cos(angle2)}
              y2={half + lr * Math.sin(angle2)}
              stroke="#BFB8AF"
              strokeWidth="0.6"
              strokeDasharray="3 3"
              opacity="0.4"
            />
          );
        })}

        {/* Center circle */}
        <circle cx={half} cy={half} r={innerR} fill="#F7F3ED" stroke="#BFB8AF" strokeWidth="1" opacity="0.8" />
        <text
          x={half}
          y={half}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={size * 0.1}
          fill="#2C2C2C"
          opacity="0.5"
          style={{ fontFamily: "'Noto Serif SC', serif" }}
        >
          太极
        </text>
      </motion.svg>
    </div>
  );
}
