import { motion } from 'framer-motion';
import InkParticles from './InkParticles';

interface InkBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export default function InkBackground({ children, className = '' }: InkBackgroundProps) {
  return (
    <div className={`paper-texture min-h-dvh relative ${className}`}>
      <InkParticles />

      {/* Mountain silhouette — boneless style (没骨法) with heavy blur, no hard outlines */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Far mountain — lightest, most blurred, slowest parallax */}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-40"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.06, y: 0 }}
          transition={{ duration: 2, ease: [0.2, 0.0, 0.0, 1.0] }}
          style={{ filter: 'blur(15px)' }}
        >
          <svg viewBox="0 0 1440 160" preserveAspectRatio="none" className="w-full h-full">
            <path
              d="M0,160 L0,100 Q100,50 200,80 Q320,110 440,60 Q560,10 680,55 Q800,100 920,45 Q1040,-10 1160,50 Q1280,110 1440,45 L1440,160 Z"
              fill="#5E554B"
            />
          </svg>
        </motion.div>

        {/* Mid mountain layer */}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-44 opacity-[0.05]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 0.05, y: 0 }}
          transition={{ duration: 2, delay: 0.2, ease: [0.2, 0.0, 0.0, 1.0] }}
          style={{ filter: 'blur(10px)' }}
        >
          <svg viewBox="0 0 1440 180" preserveAspectRatio="none" className="w-full h-full">
            <path
              d="M0,180 L0,120 Q80,80 180,100 Q300,120 400,70 Q500,20 600,90 Q720,160 840,60 Q960,-40 1080,70 Q1200,160 1320,85 Q1400,40 1440,60 L1440,180 Z"
              fill="#5E554B"
            />
          </svg>
        </motion.div>

        {/* Near mountain — slightly more defined */}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-48 opacity-[0.04]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 0.04, y: 0 }}
          transition={{ duration: 2, delay: 0.4, ease: [0.2, 0.0, 0.0, 1.0] }}
          style={{ filter: 'blur(6px)' }}
        >
          <svg viewBox="0 0 1440 200" preserveAspectRatio="none" className="w-full h-full">
            <path
              d="M0,200 L0,150 Q60,100 180,130 Q300,160 420,90 Q540,20 660,110 Q780,180 900,70 Q1020,-40 1140,85 Q1260,190 1380,100 L1440,80 L1440,200 Z"
              fill="#5E554B"
            />
          </svg>
        </motion.div>

        {/* Misty fog band */}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.04 }}
          transition={{ duration: 3, delay: 0.6 }}
          style={{
            background:
              'linear-gradient(to top, rgba(94,85,75,0.3) 0%, rgba(94,85,75,0.08) 40%, transparent 100%)',
            filter: 'blur(8px)',
          }}
        />
      </div>

      {children}
    </div>
  );
}
