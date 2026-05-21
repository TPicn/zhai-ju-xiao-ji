import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import InkBackground from '../components/ui/InkBackground';
import BottomNav from '../components/ui/BottomNav';
import BrushDivider from '../components/ui/BrushDivider';
import { getDaoismCategoryById } from '../data/daoism';

export default function DaoismCategoryPage() {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();

  const cat = category ? getDaoismCategoryById(category) : undefined;

  if (!cat) {
    return (
      <InkBackground>
        <div className="min-h-dvh flex flex-col items-center justify-center gap-4 px-6 pb-24">
          <p className="text-ink-light text-lg">分类未找到</p>
          <button onClick={() => navigate('/daojia')} className="text-cinnabar text-sm hover:underline">
            ← 返回道藏
          </button>
          <BottomNav />
        </div>
      </InkBackground>
    );
  }

  return (
    <InkBackground>
      <div className="min-h-dvh flex flex-col px-4 sm:px-6 py-6 sm:py-8 max-w-lg mx-auto pb-24">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button
            onClick={() => navigate('/daojia')}
            className="text-ink-light hover:text-ink transition-colors text-sm"
          >
            ← 道藏
          </button>
          <h2
            className="text-ink text-lg font-bold"
            style={{ fontFamily: "'ZCOOL KuaiLe', 'Ma Shan Zheng', 'STXingkai', cursive" }}
          >
            {cat.title}
          </h2>
          <div className="w-10" />
        </motion.div>

        {/* Category hero */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          <div className="text-5xl mb-3">{cat.illustration}</div>
          <p className="text-ink-light text-sm tracking-wider">{cat.subtitle}</p>
        </motion.div>

        {/* Category description */}
        <motion.div
          className="bg-silk p-5 mb-6"
          style={{ borderRadius: '4px', boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)' }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-ink-heavy text-xs sm:text-sm leading-relaxed">{cat.description}</p>
        </motion.div>

        <BrushDivider />

        {/* Chapter list */}
        <div className="space-y-3 mt-4">
          {cat.chapters.map((ch, i) => (
            <motion.button
              key={ch.id}
              onClick={() => navigate(`/daojia/${cat.id}/${ch.id}`)}
              className="w-full text-left bg-silk p-4 hover:bg-[#ECE8DE] transition-colors flex items-start gap-4"
              style={{ borderRadius: '4px', boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)' }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.05 }}
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#F2EFE9] flex items-center justify-center border border-ink-pale/20">
                <span
                  className="text-sm font-bold text-cinnabar"
                  style={{ fontFamily: "'ZCOOL KuaiLe', 'Ma Shan Zheng', 'STXingkai', cursive" }}
                >
                  {ch.chapterNumber}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <h4
                  className="text-ink text-sm font-bold mb-0.5"
                  style={{ fontFamily: "'Noto Serif SC', serif" }}
                >
                  {ch.title}
                </h4>
                <p className="text-ink-light text-xs leading-relaxed truncate">{ch.subtitle}</p>
              </div>

              <svg className="flex-shrink-0 w-4 h-4 text-ink-pale mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </motion.button>
          ))}
        </div>

        <p className="text-ink-pale text-xs text-center mt-6">
          {cat.chapters.length} 篇文章
        </p>

        <BottomNav />
      </div>
    </InkBackground>
  );
}
