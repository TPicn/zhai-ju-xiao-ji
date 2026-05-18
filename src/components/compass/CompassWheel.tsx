import { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { directions, type Direction } from '../../config/theme';

interface CompassWheelProps {
  onSelect: (direction: Direction) => void;
  selected: string | null;
}

const DIRECTION_ANGLE = 45; // 360/8

export default function CompassWheel({ onSelect, selected }: CompassWheelProps) {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const rotation = useMotionValue(0);
  const [snapAngle, setSnapAngle] = useState(0);

  const displayRotation = useTransform(rotation, (r) => r + snapAngle);

  const handleDragEnd = () => {
    const currentAngle = rotation.get() + snapAngle;
    // Normalize to 0-360
    let normalized = ((currentAngle % 360) + 360) % 360;
    // Snap to nearest direction
    const idx = Math.round(normalized / DIRECTION_ANGLE) % 8;
    const target = idx * DIRECTION_ANGLE;
    setSnapAngle((prev) => prev + (target - normalized));
    rotation.set(0);
    onSelect(directions[idx]);
  };

  const needleAngle = selected
    ? directions.find((d) => d.label === selected)?.angle ?? 0
    : 0;

  return (
    <div className="flex flex-col items-center gap-6" ref={constraintsRef}>
      {/* Selected direction display */}
      <div className="text-center">
        <span className="text-ink-light text-sm">大门朝向</span>
        {selected && (
          <motion.p
            className="text-ink text-2xl font-bold mt-1"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {selected}
            <span className="text-ink-light text-base font-normal ml-1">
              {directions.find((d) => d.label === selected)?.element}
            </span>
          </motion.p>
        )}
      </div>

      {/* Compass */}
      <motion.div
        className="w-56 h-56 rounded-full relative cursor-grab active:cursor-grabbing select-none"
        style={{
          background:
            'radial-gradient(circle, #F7F3ED 40%, #F2EFE9 60%, rgba(191,184,175,0.3) 100%)',
          boxShadow: '0 4px 24px rgba(44,44,44,0.08), inset 0 0 40px rgba(44,44,44,0.03)',
          rotate: displayRotation,
        }}
        drag
        dragConstraints={constraintsRef}
        onDragEnd={handleDragEnd}
        whileTap={{ cursor: 'grabbing' }}
      >
        {/* Outer ring with direction markers */}
        {directions.map((d, i) => {
          const angle = (i * 360) / 8 - 90;
          const rad = (angle * Math.PI) / 180;
          const x = 50 + 40 * Math.cos(rad);
          const y = 50 + 40 * Math.sin(rad);
          const isSelected = selected === d.label;

          return (
            <div
              key={d.label}
              className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <span
                className={`text-sm font-bold transition-colors duration-200 ${
                  isSelected ? 'text-cinnabar' : 'text-ink'
                }`}
              >
                {d.label}
              </span>
            </div>
          );
        })}

        {/* Inner bagua circles */}
        <div className="absolute inset-[15%] rounded-full border border-ink-pale/20" />
        <div className="absolute inset-[30%] rounded-full border border-ink-pale/15" />

        {/* Center */}
        <div className="absolute inset-[40%] rounded-full bg-ink/5 flex items-center justify-center">
          <div className="w-2 h-2 bg-cinnabar/60 rounded-full" />
        </div>

        {/* Needle */}
        <div
          className="absolute top-[7%] left-1/2 -translate-x-1/2 w-0.5 h-[10%] bg-cinnabar origin-bottom"
          style={{ rotate: `${needleAngle}deg` }}
        />
      </motion.div>

      <p className="text-ink-light text-sm">拖动罗盘选择朝向</p>
    </div>
  );
}
