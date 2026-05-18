import { useRef } from 'react';
import { motion } from 'framer-motion';

const PARTICLE_COUNT = 12;

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

function generateParticles() {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    startX: randomBetween(5, 95),
    startY: randomBetween(5, 95),
    size: randomBetween(1.5, 4),
    duration: randomBetween(6, 14),
    delay: randomBetween(0, 8),
    driftX: randomBetween(-30, 30),
    driftY: randomBetween(-40, 40),
    opacity: randomBetween(0.04, 0.12),
  }));
}

export default function InkParticles() {
  const particles = useRef(generateParticles());

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.current.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.startX}%`,
            top: `${p.startY}%`,
            background:
              'radial-gradient(circle, rgba(44,44,44,0.6) 0%, rgba(44,44,44,0.1) 50%, transparent 70%)',
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, p.opacity, p.opacity, 0],
            scale: [0.5, 1.2, 1.5, 2],
            x: [0, p.driftX * 0.5, p.driftX],
            y: [0, p.driftY * 0.5, p.driftY],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
