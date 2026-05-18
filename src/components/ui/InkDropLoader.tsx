import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function InkDropLoader() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setPhase(1), 600);
    const timer2 = setTimeout(() => setPhase(2), 1500);
    const timer3 = setTimeout(() => navigate('/report'), 4500);
    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [navigate]);

  const chars = ['观', '其', '形', '，', '察', '其', '气', '，', '问', '其', '心'];

  return (
    <div className="min-h-dvh bg-parchment flex flex-col items-center justify-center relative overflow-hidden">
      {/* Ink drop animation */}
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Ripple rings */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full border border-ink-pale/30"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1.8 + i * 0.4],
              opacity: [0.6, 0],
            }}
            transition={{
              duration: 2,
              delay: i * 0.6 + 0.4,
              repeat: Infinity,
              repeatDelay: 0,
            }}
          />
        ))}

        {/* Central ink dot */}
        <motion.div
          className="w-3 h-3 bg-ink rounded-full"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 0.9, 1] }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />

        {/* Ink spread blob */}
        {phase >= 1 && (
          <motion.div
            className="absolute w-24 h-24 rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(44,44,44,0.15) 0%, rgba(44,44,44,0.05) 50%, transparent 70%)',
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0.3, 1.4, 1.2, 1.3],
              opacity: [0.8, 0.4, 0.2, 0.1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </div>

      {/* Emerging text */}
      <div className="mt-16 vertical-text text-ink-light text-lg tracking-[0.5em] leading-loose">
        {chars.map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0 }}
            animate={phase >= 2 ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
          >
            {char}
          </motion.span>
        ))}
      </div>

      {/* Subtle floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-ink-pale/20 rounded-full"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: i * 0.4,
              repeat: Infinity,
            }}
          />
        ))}
      </div>
    </div>
  );
}
