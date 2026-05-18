import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import InkBackground from '../components/ui/InkBackground';
import BottomNav from '../components/ui/BottomNav';
import BaguaMirror from '../components/instruments/BaguaMirror';

const titleChars = ['宅', '居', '小', '记'];

export default function HomePage() {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <InkBackground>
      {/* Background Bagua mirror - subtly rotating */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.06 }}
          transition={{ delay: 0.5, duration: 2 }}
        >
          <BaguaMirror size={320} autoRotate />
        </motion.div>
      </div>

      <div className="min-h-dvh flex flex-col items-center justify-center relative px-6 pb-24 z-10">
        {/* Corner seals */}
        <motion.div
          className="fixed top-4 sm:top-8 right-4 sm:right-8 z-10"
          initial={{ opacity: 0, scale: 0.5, rotate: 15 }}
          animate={{ opacity: 1, scale: 1, rotate: 5 }}
          transition={{ delay: 1.0, duration: 0.7, ease: 'easeOut' }}
        >
          <div
            className="w-12 h-12 border-2 border-cinnabar/60 text-cinnabar/70 rounded-full flex items-center justify-center text-xs font-bold select-none"
            style={{
              fontFamily: "'ZCOOL KuaiLe', 'Ma Shan Zheng', 'STXingkai', cursive",
            }}
          >
            心安
          </div>
        </motion.div>
        <motion.div
          className="fixed bottom-20 sm:bottom-24 right-3 sm:right-6 z-10"
          initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
          animate={{ opacity: 1, scale: 1, rotate: -8 }}
          transition={{ delay: 1.3, duration: 0.7, ease: 'easeOut' }}
        >
          <div
            className="w-12 h-12 border-2 border-cinnabar/60 text-cinnabar/70 rounded-full flex items-center justify-center text-xs font-bold select-none"
            style={{
              fontFamily: "'ZCOOL KuaiLe', 'Ma Shan Zheng', 'STXingkai', cursive",
            }}
          >
            即是
          </div>
        </motion.div>

        {/* Left decorative seal */}
        <motion.div
          className="fixed top-1/2 left-6 -translate-y-1/2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.6, duration: 1 }}
        >
          <div className="vertical-text text-ink-pale/20 text-sm tracking-[1em] select-none">
            山静日长
          </div>
        </motion.div>

        <div className="flex flex-col items-center">
          {/* Title - characters appear one by one with ink effect */}
          <div className="mb-8">
            <h1 className="text-ink text-3xl sm:text-4xl tracking-[0.4em] leading-loose font-bold flex flex-col items-center">
              {titleChars.map((char, i) => (
                <motion.span
                  key={i}
                  initial={{
                    opacity: 0,
                    filter: 'blur(8px)',
                    y: -10,
                  }}
                  animate={{
                    opacity: 1,
                    filter: 'blur(0px)',
                    y: 0,
                  }}
                  transition={{
                    delay: 0.3 + i * 0.15,
                    duration: 0.7,
                    ease: [0.25, 0.1, 0.25, 1.0],
                  }}
                  style={{
                    fontFamily: "'Noto Serif SC', 'Source Han Serif SC', serif",
                    fontWeight: 500,
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </h1>
          </div>

          {/* Subtitle with brush reveal */}
          <motion.div
            className="mb-16 overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: 'auto' }}
            transition={{ delay: 1.0, duration: 1, ease: [0.25, 0.1, 0.25, 1.0] }}
          >
            <motion.p
              className="text-ink-light text-sm sm:text-base tracking-[0.3em] whitespace-nowrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              style={{
                fontFamily: "'ZCOOL KuaiLe', 'Ma Shan Zheng', 'STXingkai', cursive",
              }}
            >
              择一宅，安一身
            </motion.p>
          </motion.div>

          {/* Two main entry buttons */}
          {showContent && (
            <motion.div
              className="flex gap-6 sm:gap-8 mb-10"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.5 }}
            >
              {/* Feng Shui entry */}
              <motion.button
                onClick={() => navigate('/upload')}
                className="w-24 h-24 sm:w-26 sm:h-26 border-2 border-cinnabar text-cinnabar rounded-full flex flex-col items-center justify-center gap-0.5 cursor-pointer relative group"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.93 }}
              >
                {/* Ink splash effect on hover */}
                <motion.span
                  className="absolute inset-0 rounded-full"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileHover={{
                    scale: [0.8, 1.4, 1.2],
                    opacity: [0, 0.12, 0.06],
                    transition: { duration: 0.6 },
                  }}
                  style={{ background: '#C43A31' }}
                />
                <span
                  className="text-lg sm:text-xl font-bold relative z-10"
                  style={{
                    fontFamily: "'ZCOOL KuaiLe', 'Ma Shan Zheng', 'STXingkai', cursive",
                  }}
                >
                  诊宅
                </span>
                <span className="text-[9px] opacity-50 relative z-10">风水</span>
              </motion.button>

              {/* Bazi entry */}
              <motion.button
                onClick={() => navigate('/bazi')}
                className="w-24 h-24 sm:w-26 sm:h-26 border-2 border-indigo text-indigo rounded-full flex flex-col items-center justify-center gap-0.5 cursor-pointer relative group"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.93 }}
              >
                <motion.span
                  className="absolute inset-0 rounded-full"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileHover={{
                    scale: [0.8, 1.4, 1.2],
                    opacity: [0, 0.12, 0.06],
                    transition: { duration: 0.6 },
                  }}
                  style={{ background: '#4A6B8A' }}
                />
                <span
                  className="text-lg sm:text-xl font-bold relative z-10"
                  style={{
                    fontFamily: "'ZCOOL KuaiLe', 'Ma Shan Zheng', 'STXingkai', cursive",
                  }}
                >
                  命理
                </span>
                <span className="text-[9px] opacity-50 relative z-10">八字</span>
              </motion.button>
            </motion.div>
          )}

          {/* Secondary link */}
          {showContent && (
            <motion.button
              onClick={() => navigate('/knowledge')}
              className="text-ink-light text-sm tracking-wider hover:text-ink-heavy transition-colors group flex items-center gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
              style={{ fontFamily: "'Noto Serif SC', serif" }}
            >
              <span>浏览风水知识</span>
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.button>
          )}
        </div>

        <BottomNav />
      </div>
    </InkBackground>
  );
}
