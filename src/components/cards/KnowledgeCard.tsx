import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import SealStamp from '../ui/SealStamp';

interface KnowledgeCardProps {
  title: string;
  level: '入门' | '进阶' | '精通';
  frontSummary: string;
  illustration: string;
  onDoubleClick?: () => void;
}

export default function KnowledgeCard({
  title,
  level,
  frontSummary,
  illustration,
  onDoubleClick,
}: KnowledgeCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glareX, setGlareX] = useState(50);
  const [glareY, setGlareY] = useState(50);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const deltaX = (x - centerX) / centerX;
    const deltaY = (y - centerY) / centerY;

    setRotateY(deltaX * 5);
    setRotateX(-deltaY * 5);
    setGlareX((x / rect.width) * 100);
    setGlareY((y / rect.height) * 100);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovering(false);
  };

  return (
    <motion.div
      ref={cardRef}
      className="w-[260px] h-[340px] sm:w-72 sm:h-96 flex-shrink-0 cursor-pointer bg-silk rounded-lg p-4 sm:p-6 flex flex-col items-center justify-center gap-3 sm:gap-4 border border-ink-pale/20 select-none relative overflow-hidden touch-manipulation"
      onDoubleClick={onDoubleClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
        boxShadow: isHovering
          ? '0 12px 40px rgba(44,44,44,0.1), 0 2px 8px rgba(44,44,44,0.06)'
          : '0 2px 8px rgba(44,44,44,0.04)',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      style={{ transformStyle: 'preserve-3d', perspective: 800 }}
    >
      {/* Glare/light effect on hover */}
      {isHovering && (
        <div
          className="absolute inset-0 pointer-events-none rounded-lg"
          style={{
            background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.15) 0%, transparent 50%)`,
          }}
        />
      )}

      {/* Ink spread effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-lg pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovering ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{
          background:
            'radial-gradient(circle at center, rgba(44,44,44,0.02) 0%, transparent 60%)',
        }}
      />

      <SealStamp text={level} size="sm" />
      <div className="text-5xl relative z-10">{illustration}</div>
      <h3
        className="text-ink text-xl font-bold text-center leading-relaxed relative z-10"
        style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 500 }}
      >
        {title}
      </h3>
      <p className="text-ink-light text-sm text-center leading-relaxed relative z-10">
        {frontSummary}
      </p>
      <p className="text-ink-pale text-xs mt-auto relative z-10">双击查看详情 →</p>
    </motion.div>
  );
}
