import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import InkBackground from '../components/ui/InkBackground';
import BottomNav from '../components/ui/BottomNav';
import BrushDivider from '../components/ui/BrushDivider';
import SealStamp from '../components/ui/SealStamp';
import { getChapterById, getTrackById } from '../data/learning';
import type { LearningBlock } from '../data/learning';

function BlockRenderer({ block, idx }: { block: LearningBlock; idx: number }) {
  const delay = 0.25 + idx * 0.03;

  switch (block.type) {
    case 'h2':
      return (
        <motion.h2
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
          className="flex gap-2 ml-2"
          initial={{ opacity: 0, x: -4 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay, duration: 0.3 }}
        >
          <span className="text-cinnabar flex-shrink-0 text-xs font-bold min-w-[1.2em] mt-0.5">
            {idx}
          </span>
          <span className="text-ink-heavy text-sm leading-relaxed">{block.text}</span>
        </motion.div>
      );

    case 'p':
    default:
      return (
        <motion.p
          className="text-ink-heavy text-sm leading-loose"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay, duration: 0.3 }}
        >
          {block.text}
        </motion.p>
      );
  }
}

export default function LearningDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const chapter = id ? getChapterById(id) : undefined;

  if (!chapter) {
    return (
      <InkBackground>
        <div className="min-h-dvh flex flex-col items-center justify-center gap-4 px-6 pb-24">
          <p className="text-ink-light text-lg">课程未找到</p>
          <button onClick={() => navigate('/learning')} className="text-cinnabar text-sm hover:underline">
            ← 返回修学
          </button>
          <BottomNav />
        </div>
      </InkBackground>
    );
  }

  const track = getTrackById(chapter.track);
  const allChapters = track?.chapters ?? [];
  const currentIndex = allChapters.indexOf(chapter);
  const prevChapter = currentIndex > 0 ? allChapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < allChapters.length - 1 ? allChapters[currentIndex + 1] : null;

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
            onClick={() => navigate('/learning')}
            className="text-ink-light hover:text-ink transition-colors text-sm"
          >
            ← 修学
          </button>
          <div className="flex items-center gap-2">
            <span className="text-ink-pale text-xs">{track?.title}</span>
            <SealStamp text={chapter.level} size="sm" />
          </div>
        </motion.div>

        {/* Title section */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-5xl mb-4">{chapter.illustration}</div>
          <div className="flex items-center justify-center gap-2 mb-3">
            <span
              className="text-cinnabar text-sm font-bold"
              style={{ fontFamily: "'ZCOOL KuaiLe', 'Ma Shan Zheng', 'STXingkai', cursive" }}
            >
              第{chapter.chapterNumber}章
            </span>
          </div>
          <h1
            className="text-ink text-xl sm:text-2xl font-bold mb-3"
            style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 500 }}
          >
            {chapter.title}
          </h1>
          <p className="text-ink-light text-sm leading-relaxed">{chapter.subtitle}</p>
        </motion.div>

        <BrushDivider />

        {/* Classical reference card */}
        {chapter.classicalRef && (
          <motion.div
            className="mt-4 bg-[#F7F3ED] border border-ink-pale/20 p-4 sm:p-5"
            style={{ borderRadius: '4px' }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm">📜</span>
              <span className="text-ink text-xs font-bold tracking-wider">经典原文</span>
              <span className="text-ink-pale text-[10px]">——{chapter.classicalRef.book} · {chapter.classicalRef.author}</span>
            </div>
            <blockquote className="text-ink-heavy text-sm leading-relaxed italic border-l-2 border-cinnabar/30 pl-3 my-2">
              {chapter.classicalRef.quote}
            </blockquote>
            <div className="mt-3 pt-3 border-t border-ink-pale/15">
              <span className="text-ink-pale text-[10px]">白话译文：</span>
              <p className="text-ink-light text-xs leading-relaxed mt-1">{chapter.classicalRef.translation}</p>
            </div>
          </motion.div>
        )}

        {/* Article content */}
        <motion.div
          className="mt-4 space-y-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {chapter.content.map((block, idx) => (
            <BlockRenderer key={idx} block={block} idx={idx} />
          ))}
        </motion.div>

        {/* Extended content (if any) */}
        {chapter.extendedContent && chapter.extendedContent.length > 0 && (
          <>
            <BrushDivider />
            <motion.div
              className="mt-4 space-y-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {chapter.extendedContent.map((block, idx) => (
                <BlockRenderer key={`ext-${idx}`} block={block} idx={idx} />
              ))}
            </motion.div>
          </>
        )}

        <BrushDivider />

        {/* Life application box */}
        <motion.div
          className="mt-6 bg-cinnabar/5 border border-cinnabar/20 p-4 sm:p-5"
          style={{ borderRadius: '4px' }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm">💡</span>
            <span className="text-cinnabar text-xs font-bold tracking-wider">生活应用</span>
          </div>
          <p className="text-ink-heavy text-sm leading-relaxed">{chapter.lifeApplication}</p>
        </motion.div>

        {/* Key takeaway */}
        <motion.div
          className="mt-4 bg-silk p-4 sm:p-5 text-center"
          style={{ borderRadius: '4px', boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)' }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <span className="text-ink-pale text-[10px] block mb-1">本章核心</span>
          <p
            className="text-ink text-base font-bold leading-relaxed"
            style={{ fontFamily: "'Noto Serif SC', serif" }}
          >
            {chapter.keyTakeaway}
          </p>
        </motion.div>

        {/* Feynman Exercise */}
        {chapter.feynmanExercise && (
          <motion.div
            className="mt-6 bg-[#F7F3ED] border border-ink-pale/20 p-4 sm:p-5"
            style={{ borderRadius: '4px' }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm">🧠</span>
              <span className="text-ink text-xs font-bold tracking-wider">费曼练习</span>
              <span className="text-ink-pale text-[10px]">——以教为学，输出倒逼输入</span>
            </div>
            <p className="text-ink-light text-xs leading-relaxed mb-3">
              核心概念：<span className="text-ink-heavy font-bold">{chapter.feynmanExercise.concept}</span>
            </p>
            <div className="space-y-3">
              {chapter.feynmanExercise.steps.map((s) => (
                <div key={s.step} className="bg-silk p-3 rounded">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-5 h-5 rounded-full bg-cinnabar/10 text-cinnabar text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                      {s.step}
                    </span>
                    <span className="text-ink text-xs font-bold">{s.title}</span>
                  </div>
                  <p className="text-ink-heavy text-xs leading-relaxed ml-7">{s.instruction}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Practical Task */}
        {chapter.practicalTask && (
          <motion.div
            className="mt-4 bg-cinnabar/5 border border-cinnabar/20 p-4 sm:p-5"
            style={{ borderRadius: '4px' }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm">✋</span>
              <span className="text-cinnabar text-xs font-bold tracking-wider">实操任务</span>
              <span className="text-ink-pale text-[10px]">——{chapter.practicalTask.time}</span>
            </div>
            <h4 className="text-ink text-sm font-bold mb-2">{chapter.practicalTask.title}</h4>
            {chapter.practicalTask.materials.length > 0 && (
              <div className="mb-3">
                <span className="text-ink-pale text-[10px] block mb-1">所需材料：</span>
                <div className="flex flex-wrap gap-1.5">
                  {chapter.practicalTask.materials.map((m, i) => (
                    <span key={i} className="text-ink-heavy text-[10px] bg-silk px-2 py-0.5 rounded-full">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="space-y-2">
              {chapter.practicalTask.steps.map((s, i) => (
                <div key={i} className="flex gap-2">
                  <span className="w-4 h-4 rounded-full bg-cinnabar/20 text-cinnabar text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-ink-heavy text-xs leading-relaxed">{s}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-cinnabar/15">
              <span className="text-ink-pale text-[10px] block mb-1">✅ 检验点：</span>
              <p className="text-ink-heavy text-xs leading-relaxed italic">{chapter.practicalTask.checkIn}</p>
            </div>
          </motion.div>
        )}

        {/* Prev / Next navigation */}
        <div className="flex justify-between mt-8">
          {prevChapter ? (
            <button
              onClick={() => navigate(`/learning/${prevChapter.id}`)}
              className="text-ink-light hover:text-ink transition-colors text-sm text-left"
            >
              ← 第{prevChapter.chapterNumber}章：{prevChapter.title}
            </button>
          ) : (
            <div />
          )}
          {nextChapter ? (
            <button
              onClick={() => navigate(`/learning/${nextChapter.id}`)}
              className="text-ink-light hover:text-ink transition-colors text-sm text-right"
            >
              第{nextChapter.chapterNumber}章：{nextChapter.title} →
            </button>
          ) : (
            <div />
          )}
        </div>

        {/* Back to track */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/learning')}
            className="text-ink-pale hover:text-ink-light transition-colors text-xs"
          >
            返回修学首页
          </button>
        </div>

        <BottomNav />
      </div>
    </InkBackground>
  );
}
