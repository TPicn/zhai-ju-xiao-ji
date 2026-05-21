import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import InkBackground from '../components/ui/InkBackground';
import BottomNav from '../components/ui/BottomNav';
import BrushDivider from '../components/ui/BrushDivider';
import { daoismCategories } from '../data/daoism';

const categoryColors: Record<string, string> = {
  origin: 'from-amber-50 to-orange-50 border-amber-200/30',
  history: 'from-blue-50 to-indigo-50 border-blue-200/30',
  schools: 'from-emerald-50 to-teal-50 border-emerald-200/30',
  deities: 'from-purple-50 to-violet-50 border-purple-200/30',
};

export default function DaoismPage() {
  const navigate = useNavigate();

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
            道藏
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
          <div className="text-5xl mb-3">☯️</div>
          <p className="text-ink-light text-sm tracking-wider">溯源千年道家智慧，遍览神仙谱系</p>
          <p className="text-ink-pale text-xs mt-1">起源 · 历史 · 门派 · 神祇——四卷通读道家文化</p>
        </motion.div>

        <BrushDivider />

        {/* Category cards */}
        <div className="space-y-4 mt-4">
          {daoismCategories.map((cat, i) => (
            <motion.button
              key={cat.id}
              onClick={() => navigate(`/daojia/${cat.id}`)}
              className={`w-full text-left bg-gradient-to-br ${categoryColors[cat.id]} p-5 sm:p-6 border hover:shadow-md transition-all duration-300`}
              style={{ borderRadius: '4px' }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl flex-shrink-0">{cat.illustration}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3
                      className="text-ink text-base sm:text-lg font-bold"
                      style={{ fontFamily: "'Noto Serif SC', serif" }}
                    >
                      {cat.title}
                    </h3>
                    <span className="text-ink-pale text-xs">
                      {cat.chapters.length} 章
                    </span>
                  </div>
                  <p className="text-ink-light text-xs sm:text-sm leading-relaxed mb-2">
                    {cat.subtitle}
                  </p>
                  <p className="text-ink-pale text-xs leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>
                </div>
                <svg className="flex-shrink-0 w-4 h-4 text-ink-pale mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Footer info */}
        <p className="text-ink-pale text-xs text-center mt-8">
          {daoismCategories.reduce((sum, c) => sum + c.chapters.length, 0)} 篇文章 · 涵盖道家起源、发展历史、主要门派、正神谱系
        </p>

        <BottomNav />
      </div>
    </InkBackground>
  );
}
