import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import InkBackground from '../components/ui/InkBackground';
import BottomNav from '../components/ui/BottomNav';
import { learningTracks } from '../data/learning';

export default function LearningPage() {
  const navigate = useNavigate();
  const [activeTrack, setActiveTrack] = useState<string>('fengshui');

  const track = learningTracks.find((t) => t.id === activeTrack)!;

  return (
    <InkBackground>
      <div className="min-h-dvh flex flex-col px-4 sm:px-6 py-6 sm:py-8 max-w-lg mx-auto pb-24">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            onClick={() => navigate('/')}
            className="text-ink-light hover:text-ink transition-colors text-sm"
          >
            ← 首页
          </button>
          <h2
            className="text-ink text-lg font-bold"
            style={{
              fontFamily: "'ZCOOL KuaiLe', 'Ma Shan Zheng', 'STXingkai', cursive",
            }}
          >
            修学
          </h2>
          <div className="w-10" />
        </motion.div>

        {/* Title area */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-ink-light text-sm tracking-wider">从零开始，系统学习风水与八字</p>
          <p className="text-ink-pale text-xs mt-1">选择一门课程 · 八章循序渐进</p>
        </motion.div>

        {/* Track tabs */}
        <div className="flex justify-center gap-0 bg-silk rounded-full p-0.5 border border-ink-pale/20 mb-8" style={{ boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.04)' }}>
          {learningTracks.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTrack(t.id)}
              className={`flex-1 max-w-40 py-2.5 px-4 rounded-full text-sm transition-all duration-200 ${
                activeTrack === t.id
                  ? 'bg-cinnabar text-parchment font-bold shadow-[0_2px_8px_rgba(199,62,58,0.25)]'
                  : 'text-ink-light hover:text-ink'
              }`}
            >
              {t.illustration} {t.title}
            </button>
          ))}
        </div>

        {/* Track description */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTrack}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            {/* Track hero */}
            <div className="bg-silk p-6 mb-6" style={{ borderRadius: '4px', boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)' }}>
              <div className="flex items-start gap-4">
                <span className="text-4xl">{track.illustration}</span>
                <div>
                  <h3 className="text-ink text-lg font-bold mb-1" style={{ fontFamily: "'Noto Serif SC', serif" }}>
                    {track.title}
                  </h3>
                  <p className="text-ink-light text-sm leading-relaxed">{track.subtitle}</p>
                </div>
              </div>
              <p className="text-ink-heavy text-xs leading-relaxed mt-4 pt-4 border-t border-ink-pale/15">
                {track.description}
              </p>
            </div>

            {/* Chapter list */}
            <div className="space-y-3">
              {track.chapters.map((ch, i) => (
                <motion.button
                  key={ch.id}
                  onClick={() => navigate(`/learning/${ch.id}`)}
                  className="w-full text-left bg-silk p-4 hover:bg-[#ECE8DE] transition-colors flex items-start gap-4"
                  style={{ borderRadius: '4px', boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)' }}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  {/* Chapter number badge */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#F2EFE9] flex items-center justify-center border border-ink-pale/20">
                    <span
                      className="text-sm font-bold text-cinnabar"
                      style={{ fontFamily: "'ZCOOL KuaiLe', 'Ma Shan Zheng', 'STXingkai', cursive" }}
                    >
                      {ch.chapterNumber}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h4 className="text-ink text-sm font-bold truncate" style={{ fontFamily: "'Noto Serif SC', serif" }}>
                        {ch.title}
                      </h4>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-cinnabar/10 text-cinnabar flex-shrink-0">
                        {ch.level}
                      </span>
                    </div>
                    <p className="text-ink-light text-xs leading-relaxed truncate">{ch.subtitle}</p>
                  </div>

                  <svg className="flex-shrink-0 w-4 h-4 text-ink-pale mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </motion.button>
              ))}
            </div>

            <p className="text-ink-pale text-xs text-center mt-6">
              {track.chapters.length} 章课程 · {track.chapters.filter((c) => c.level === '入门').length} 章入门 + {track.chapters.filter((c) => c.level === '进阶').length} 章进阶 + {track.chapters.filter((c) => c.level === '精通').length} 章精通
            </p>
          </motion.div>
        </AnimatePresence>

        <BottomNav />
      </div>
    </InkBackground>
  );
}
