import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import InkBackground from '../components/ui/InkBackground';
import BottomNav from '../components/ui/BottomNav';
import CardStack from '../components/cards/CardStack';
import FiveElementsWheel from '../components/instruments/FiveElementsWheel';
import { knowledgeCards } from '../data/knowledge';

export default function KnowledgePage() {
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
            册页
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
          <p className="text-ink-light text-sm tracking-wider">风水知识卡片</p>
          <p className="text-ink-pale text-xs mt-1">左右滑动浏览 · 双击卡片进入详情</p>
        </motion.div>

        {/* Decorative elements wheel */}
        <div className="flex justify-center mb-4 opacity-25">
          <FiveElementsWheel size={80} />
        </div>

        {/* Card stack */}
        <motion.div
          className="flex-1 flex items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <CardStack
            cards={knowledgeCards}
            onCardClick={(id) => navigate(`/knowledge/${id}`)}
          />
        </motion.div>

        <BottomNav />
      </div>
    </InkBackground>
  );
}
