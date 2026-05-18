import { motion } from 'framer-motion';

interface IChingCoinsProps {
  size?: number;
  className?: string;
}

export default function IChingCoins({ size = 120, className = '' }: IChingCoinsProps) {
  const coinR = size * 0.24;

  const coins = [
    { x: size * 0.25, y: size * 0.45, delay: 0, swingY: -4 },
    { x: size * 0.55, y: size * 0.35, delay: 0.3, swingY: -5 },
    { x: size * 0.75, y: size * 0.5, delay: 0.6, swingY: -3 },
  ];

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {/* Suspension string */}
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="absolute inset-0"
        style={{ overflow: 'visible' }}
      >
        {/* Top knot */}
        <circle cx={size * 0.5} cy={size * 0.08} r={3} fill="#C43A31" opacity="0.6" />

        {/* String from top to each coin */}
        {coins.map((coin, i) => (
          <motion.path
            key={`string-${i}`}
            d={`M ${size * 0.5} ${size * 0.08} Q ${(size * 0.5 + coin.x) / 2} ${coin.y * 0.5} ${coin.x} ${coin.y}`}
            stroke="#C43A31"
            strokeWidth="0.8"
            fill="none"
            opacity="0.3"
            animate={{ d: [
              `M ${size * 0.5} ${size * 0.08} Q ${(size * 0.5 + coin.x) / 2} ${coin.y * 0.5} ${coin.x} ${coin.y}`,
              `M ${size * 0.5} ${size * 0.08} Q ${(size * 0.5 + coin.x) / 2 + 3} ${coin.y * 0.5 - 2} ${coin.x + 1} ${coin.y}`,
              `M ${size * 0.5} ${size * 0.08} Q ${(size * 0.5 + coin.x) / 2} ${coin.y * 0.5} ${coin.x} ${coin.y}`,
            ] }}
            transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

        {/* Coins */}
        {coins.map((coin, i) => (
          <motion.g
            key={`coin-${i}`}
            animate={{ y: [0, coin.swingY, 0] }}
            transition={{
              duration: 3 + i * 0.4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: coin.delay,
            }}
          >
            {/* Outer circle */}
            <circle
              cx={coin.x}
              cy={coin.y}
              r={coinR}
              fill="none"
              stroke="#B8A05E"
              strokeWidth="1.2"
              opacity="0.7"
            />
            {/* Square hole */}
            <rect
              x={coin.x - coinR * 0.28}
              y={coin.y - coinR * 0.28}
              width={coinR * 0.56}
              height={coinR * 0.56}
              fill="none"
              stroke="#B8A05E"
              strokeWidth="0.8"
              opacity="0.5"
              rx="1"
            />
            {/* Inner ring */}
            <circle
              cx={coin.x}
              cy={coin.y}
              r={coinR * 0.65}
              fill="none"
              stroke="#B8A05E"
              strokeWidth="0.5"
              opacity="0.3"
            />
            {/* Characters on coin */}
            <text
              x={coin.x - coinR * 0.45}
              y={coin.y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={coinR * 0.9}
              fill="#B8A05E"
              opacity="0.5"
              style={{ fontFamily: "'ZCOOL KuaiLe', 'Ma Shan Zheng', 'STXingkai', cursive" }}
            >
              通
            </text>
            <text
              x={coin.x + coinR * 0.45}
              y={coin.y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={coinR * 0.9}
              fill="#B8A05E"
              opacity="0.5"
              style={{ fontFamily: "'ZCOOL KuaiLe', 'Ma Shan Zheng', 'STXingkai', cursive" }}
            >
              宝
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}
