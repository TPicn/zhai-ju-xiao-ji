import { useRef, useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { directions, type Direction } from '../../config/theme';

interface CompassWheelProps {
  onSelect: (direction: Direction) => void;
  selected: string | null;
}

const DIRECTION_ANGLE = 45;

export default function CompassWheel({ onSelect, selected }: CompassWheelProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState<number>(() => {
    const initial = directions.find((d) => d.label === selected);
    return initial?.angle ?? 0;
  });
  const [isDragging, setIsDragging] = useState(false);
  const dragStateRef = useRef({ startX: 0, startAngle: 0 });

  // Sync rotation when selected changes externally
  useEffect(() => {
    if (!isDragging && selected) {
      const dir = directions.find((d) => d.label === selected);
      if (dir) setRotation(dir.angle);
    }
  }, [selected, isDragging]);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      dragStateRef.current = {
        startX: e.clientX,
        startAngle: rotation,
      };
      setIsDragging(true);
    },
    [rotation],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging || !trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const dx = e.clientX - dragStateRef.current.startX;
      // Map horizontal drag distance to rotation: full track width = 360°
      const angleDelta = (dx / rect.width) * 360;
      let newAngle = dragStateRef.current.startAngle + angleDelta;
      // Normalize to 0-360
      newAngle = ((newAngle % 360) + 360) % 360;
      setRotation(newAngle);
    },
    [isDragging],
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      setIsDragging(false);
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      // Snap to nearest 45° direction
      const idx = Math.round(rotation / DIRECTION_ANGLE) % 8;
      const snapped = (idx * DIRECTION_ANGLE + 360) % 360;
      setRotation(snapped);
      onSelect(directions[idx]);
    },
    [rotation, onSelect],
  );

  // Handle position as percentage
  const handlePercent = (rotation / 360) * 100;

  return (
    <div className="flex flex-col items-center gap-5">
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

      {/* Compass wheel — rotates based on slider */}
      <motion.div
        className="w-48 h-48 sm:w-56 sm:h-56 rounded-full relative select-none pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, #F7F3ED 40%, #F2EFE9 60%, rgba(191,184,175,0.3) 100%)',
          boxShadow:
            '0 4px 24px rgba(44,44,44,0.08), inset 0 0 40px rgba(44,44,44,0.03)',
          rotate: rotation,
        }}
        animate={{ rotate: rotation }}
        transition={{ type: 'spring', stiffness: 120, damping: 18 }}
      >
        {/* Direction markers */}
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
                className={`text-sm font-bold transition-colors duration-300 ${
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

        {/* Center yin-yang dot */}
        <div className="absolute inset-[40%] rounded-full bg-ink/5 flex items-center justify-center">
          <div className="w-2 h-2 bg-cinnabar/60 rounded-full" />
        </div>

        {/* Fixed pointer at top — indicates selected direction */}
        <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-0.5 h-[12%] bg-cinnabar origin-bottom rounded-full" />
      </motion.div>

      {/* ─── Rotation Slider Track ─── */}
      <div className="w-full max-w-xs mx-auto">
        {/* Track */}
        <div
          ref={trackRef}
          className="relative h-14 cursor-pointer touch-none select-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(191,184,175,0.15), rgba(191,184,175,0.06), rgba(191,184,175,0.15))',
            borderRadius: '6px',
            boxShadow:
              'inset 0 2px 6px rgba(44,44,44,0.06), 0 0 0 1px rgba(191,184,175,0.25)',
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          {/* Tick marks */}
          {directions.map((d) => {
            const pos = (d.angle / 360) * 100;
            return (
              <div
                key={d.label}
                className="absolute top-0 bottom-0 flex flex-col items-center"
                style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}
              >
                {/* Tick line */}
                <div
                  className="w-px flex-1"
                  style={{ background: 'rgba(94,85,75,0.25)' }}
                />
                {/* Direction label */}
                <span
                  className="text-[10px] leading-none pb-1.5 select-none"
                  style={{
                    color:
                      selected === d.label
                        ? '#C73E3A'
                        : 'rgba(107,99,91,0.55)',
                    fontFamily:
                      "'ZCOOL KuaiLe', 'Ma Shan Zheng', 'STXingkai', cursive",
                  }}
                >
                  {d.label}
                </span>
              </div>
            );
          })}

          {/* Extra 北 mark at the right end (360° = 0°) */}
          <div
            className="absolute top-0 bottom-0 flex flex-col items-center"
            style={{ left: '100%', transform: 'translateX(-50%)' }}
          >
            <div
              className="w-px flex-1"
              style={{ background: 'rgba(94,85,75,0.25)' }}
            />
            <span
              className="text-[10px] leading-none pb-1.5 select-none"
              style={{
                color:
                  selected === '东'
                    ? '#C73E3A'
                    : 'rgba(107,99,91,0.55)',
                fontFamily:
                  "'ZCOOL KuaiLe', 'Ma Shan Zheng', 'STXingkai', cursive",
              }}
            >
              东
            </span>
          </div>

          {/* Guide line (handle) */}
          <motion.div
            className="absolute top-0 bottom-0 z-10 pointer-events-none"
            style={{ left: `${handlePercent}%` }}
            animate={{ left: `${handlePercent}%` }}
            transition={
              isDragging
                ? { duration: 0 }
                : { type: 'spring', stiffness: 180, damping: 20 }
            }
          >
            {/* Guide line extending above the track */}
            <div
              className="absolute left-1/2 -translate-x-1/2 w-0.5"
              style={{
                bottom: '100%',
                height: '12px',
                background: isDragging
                  ? '#C73E3A'
                  : 'rgba(199,62,58,0.7)',
                borderRadius: '1px',
                transition: 'background 0.2s',
              }}
            />

            {/* Main guide line through the track */}
            <div
              className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5"
              style={{
                background: isDragging
                  ? '#C73E3A'
                  : 'rgba(199,62,58,0.45)',
                transition: 'background 0.2s',
              }}
            />

            {/* Handle dot at top */}
            <div
              className="absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full"
              style={{
                bottom: '100%',
                marginBottom: '14px',
                background: isDragging
                  ? '#C73E3A'
                  : 'rgba(199,62,58,0.8)',
                boxShadow: isDragging
                  ? '0 0 8px rgba(199,62,58,0.5)'
                  : '0 0 4px rgba(199,62,58,0.25)',
                transition: 'all 0.2s',
              }}
            />
          </motion.div>
        </div>

        {/* Hint text */}
        <p className="text-ink-pale text-xs text-center mt-2.5">
          左右滑动调节轴，旋转罗盘选择朝向
        </p>
      </div>
    </div>
  );
}
