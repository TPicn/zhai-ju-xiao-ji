import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import InkBackground from '../components/ui/InkBackground';
import BottomNav from '../components/ui/BottomNav';
import BrushDivider from '../components/ui/BrushDivider';
import SealStamp from '../components/ui/SealStamp';
import { knowledgeCards } from '../data/knowledge';

function parseContent(raw: string) {
  const blocks: { type: 'h2' | 'h3' | 'p' | 'bullet' | 'numbered' | 'empty'; text: string; boldLead?: string }[] = [];
  const lines = raw.split('\n');

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      blocks.push({ type: 'empty', text: '' });
      continue;
    }

    // ### heading
    if (/^###\s+/.test(trimmed)) {
      blocks.push({ type: 'h3', text: trimmed.replace(/^###\s+/, '') });
    }
    // ## heading
    else if (/^##\s+/.test(trimmed)) {
      blocks.push({ type: 'h2', text: trimmed.replace(/^##\s+/, '') });
    }
    // bullet with bold lead: - **key**：value or - **key**: value
    else if (/^-\s+\*\*/.test(trimmed)) {
      const clean = trimmed.replace(/^-\s+/, '');
      const match = clean.match(/^\*\*(.+?)\*\*[：:]\s*(.*)/);
      if (match) {
        blocks.push({ type: 'bullet', text: match[2], boldLead: match[1] });
      } else {
        blocks.push({ type: 'bullet', text: clean.replace(/\*\*/g, '') });
      }
    }
    // bullet
    else if (/^-\s+/.test(trimmed)) {
      blocks.push({ type: 'bullet', text: trimmed.replace(/^-\s+/, '') });
    }
    // numbered
    else if (/^\d+\.\s/.test(trimmed)) {
      blocks.push({ type: 'numbered', text: trimmed.replace(/^\d+\.\s*/, '') });
    }
    // paragraph
    else {
      blocks.push({ type: 'p', text: trimmed });
    }
  }

  return blocks;
}

export default function KnowledgeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const card = knowledgeCards.find((c) => c.id === Number(id));

  if (!card) {
    return (
      <InkBackground>
        <div className="min-h-dvh flex flex-col items-center justify-center gap-4 px-6 pb-24">
          <p className="text-ink-light text-lg">卡片未找到</p>
          <button onClick={() => navigate('/knowledge')} className="text-indigo text-sm hover:underline">
            ← 返回册页
          </button>
          <BottomNav />
        </div>
      </InkBackground>
    );
  }

  const currentIndex = knowledgeCards.indexOf(card);
  const prevCard = currentIndex > 0 ? knowledgeCards[currentIndex - 1] : null;
  const nextCard = currentIndex < knowledgeCards.length - 1 ? knowledgeCards[currentIndex + 1] : null;

  const blocks = parseContent(card.detail);

  return (
    <InkBackground>
      <div className="max-w-lg mx-auto px-4 sm:px-6 py-6 sm:py-8 pb-24">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button
            onClick={() => navigate('/knowledge')}
            className="text-ink-light hover:text-ink transition-colors text-sm"
          >
            ← 册页
          </button>
          <SealStamp text={card.level} size="sm" />
        </motion.div>

        {/* Title section */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-5xl mb-4">{card.illustration}</div>
          <h1
            className="text-ink text-xl sm:text-2xl font-bold mb-3"
            style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 500 }}
          >
            {card.title}
          </h1>
          <p className="text-ink-light text-sm leading-relaxed">{card.frontSummary}</p>
        </motion.div>

        <BrushDivider />

        {/* Article content */}
        <motion.div
          className="mt-4 space-y-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {blocks.map((block, idx) => {
            const delay = 0.25 + idx * 0.03;

            switch (block.type) {
              case 'h2':
                return (
                  <motion.h2
                    key={idx}
                    className="text-ink text-lg sm:text-xl font-bold pt-6 pb-3"
                    style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 500 }}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay, duration: 0.4 }}
                  >
                    {block.text}
                  </motion.h2>
                );

              case 'h3':
                return (
                  <motion.h3
                    key={idx}
                    className="text-ink-heavy text-base sm:text-lg font-bold pt-4 pb-2"
                    style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 600 }}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay, duration: 0.35 }}
                  >
                    {block.text}
                  </motion.h3>
                );

              case 'bullet':
                return (
                  <motion.div
                    key={idx}
                    className="flex gap-2 ml-2"
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay, duration: 0.3 }}
                  >
                    <span className="text-cinnabar flex-shrink-0 mt-0.5">•</span>
                    <span className="text-ink-heavy text-sm leading-relaxed">
                      {block.boldLead && (
                        <strong className="text-ink">{block.boldLead}：</strong>
                      )}
                      {block.text}
                    </span>
                  </motion.div>
                );

              case 'numbered':
                return (
                  <motion.div
                    key={idx}
                    className="flex gap-2 ml-2"
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay, duration: 0.3 }}
                  >
                    <span className="text-cinnabar flex-shrink-0 text-xs font-bold mt-0.5">
                      {idx}
                    </span>
                    <span className="text-ink-heavy text-sm leading-relaxed">{block.text}</span>
                  </motion.div>
                );

              case 'empty':
                return <div key={idx} className="h-2" />;

              case 'p':
              default:
                return (
                  <motion.p
                    key={idx}
                    className="text-ink-heavy text-sm leading-loose"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay, duration: 0.3 }}
                  >
                    {block.text}
                  </motion.p>
                );
            }
          })}
        </motion.div>

        <BrushDivider />

        {/* Prev / Next navigation */}
        <div className="flex justify-between mt-8">
          {prevCard ? (
            <button
              onClick={() => navigate(`/knowledge/${prevCard.id}`)}
              className="text-ink-light hover:text-ink transition-colors text-sm text-left"
            >
              ← {prevCard.title}
            </button>
          ) : (
            <div />
          )}
          {nextCard ? (
            <button
              onClick={() => navigate(`/knowledge/${nextCard.id}`)}
              className="text-ink-light hover:text-ink transition-colors text-sm text-right"
            >
              {nextCard.title} →
            </button>
          ) : (
            <div />
          )}
        </div>

        <BottomNav />
      </div>
    </InkBackground>
  );
}
