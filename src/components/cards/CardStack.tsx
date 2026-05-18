import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import KnowledgeCard from './KnowledgeCard';
import type { KnowledgeItem } from '../../data/knowledge';

interface CardStackProps {
  cards: KnowledgeItem[];
  onCardClick: (id: number) => void;
}

export default function CardStack({ cards, onCardClick }: CardStackProps) {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const cardOffset = isMobile ? 276 : 312;

  const handleDragEnd = (_: any, info: { offset: { x: number } }) => {
    if (info.offset.x < -50 && currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (info.offset.x > 50 && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="flex flex-col items-center w-full" ref={constraintsRef}>
      <motion.div
        className="flex gap-4 sm:gap-6 px-4 sm:px-8 py-4 cursor-grab active:cursor-grabbing overflow-x-visible touch-pan-x"
        drag="x"
        dragConstraints={constraintsRef}
        onDragEnd={handleDragEnd}
        animate={{ x: -currentIndex * cardOffset }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {cards.map((card) => (
          <KnowledgeCard
            key={card.id}
            {...card}
            onDoubleClick={() => onCardClick(card.id)}
          />
        ))}
      </motion.div>

      {/* Progress dots */}
      <div className="flex gap-3 mt-8">
        {cards.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === currentIndex
                ? 'bg-ink w-4'
                : 'bg-ink-pale/40 hover:bg-ink-pale/60'
            }`}
          />
        ))}
      </div>

      <p className="text-ink-pale text-xs mt-4 text-center">
        {cards.length} 张卡片 · 左右滑动浏览 · 双击进入详情
      </p>
    </div>
  );
}
