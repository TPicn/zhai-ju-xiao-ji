import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import InkBackground from '../components/ui/InkBackground';
import BottomNav from '../components/ui/BottomNav';
import BrushDivider from '../components/ui/BrushDivider';
import ReportIllustration from '../components/report/ReportIllustration';
import { useAppStore } from '../store/useAppStore';

const illustrationTypes = ['plant', 'curtain', 'mirror', 'light', 'general'] as const;

export default function ReportPage() {
  const navigate = useNavigate();
  const reportRef = useRef<HTMLDivElement>(null);
  const { report, doorDirection, reset } = useAppStore();

  if (!report) {
    return (
      <InkBackground>
        <div className="min-h-dvh flex flex-col items-center justify-center gap-6 px-6 pb-24">
          <p className="text-ink-light text-lg">暂无诊断报告</p>
          <p className="text-ink-pale text-sm text-center leading-relaxed">
            您还没有上传户型图进行风水分析，
            <br />
            或者报告数据已过期。
          </p>
          <div className="flex gap-6 mt-4">
            <button
              onClick={() => navigate('/upload')}
              className="w-18 h-18 sm:w-20 sm:h-20 border-2 border-cinnabar text-cinnabar rounded-full flex flex-col items-center justify-center text-xs sm:text-sm font-bold cursor-pointer hover:shadow-[0_4px_16px_rgba(196,58,49,0.2)] transition-all"
              style={{
                fontFamily: "'ZCOOL KuaiLe', 'Ma Shan Zheng', 'STXingkai', cursive",
                rotate: '-3deg',
              }}
            >
              去诊宅
            </button>
          </div>
          <BottomNav />
        </div>
      </InkBackground>
    );
  }

  const handleSaveImage = async () => {
    if (!reportRef.current) return;
    try {
      const canvas = await html2canvas(reportRef.current, {
        backgroundColor: '#F7F3ED',
        scale: 2,
        useCORS: true,
      });
      const link = document.createElement('a');
      link.download = '宅居小记-诊断报告.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch {
      alert('保存失败，请重试');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '宅居小记 · 诊断报告',
          text: '来看看我的户型风水分析报告',
          url: window.location.href,
        });
      } catch {
        // user cancelled
      }
    } else {
      handleSaveImage();
    }
  };

  return (
    <InkBackground>
      <div className="max-w-lg mx-auto px-4 sm:px-6 py-6 sm:py-8 pb-24" ref={reportRef}>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
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
            诊断长卷
          </h2>
          <div className="w-10" />
        </div>

        {/* "天头" - top margin */}
        <div className="h-16" />

        {/* Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
        >
          <h1
            className="text-ink text-2xl sm:text-3xl font-bold tracking-[0.2em] mb-4"
            style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 500 }}
          >
            宅居诊断
          </h1>
          <p className="text-ink-light text-sm">为您专属定制的居家风水分析</p>
          {doorDirection && (
            <div className="inline-block mt-3 px-4 py-1 bg-silk border border-ink-pale/20 rounded-full">
              <span className="text-ink-light text-xs">大门朝向：</span>
              <span className="text-cinnabar text-sm font-bold">{doorDirection}</span>
            </div>
          )}
        </motion.div>

        {/* Section 1: Overall impression */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1.0] }}
        >
          <BrushDivider />
          <div className="flex items-start gap-4">
            <ReportIllustration type="general" className="flex-shrink-0 mt-2" />
            <div>
              <h3
                className="text-ink text-lg sm:text-xl font-bold mb-4"
                style={{
                  fontFamily: "'ZCOOL KuaiLe', 'Ma Shan Zheng', 'STXingkai', cursive",
                }}
              >
                整体感觉
              </h3>
              <p className="text-ink-heavy text-base leading-loose">{report.overall}</p>
            </div>
          </div>
        </motion.div>

        {/* Section 2: Bazi match (if provided) */}
        {report.baziMatch && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: [0.25, 0.1, 0.25, 1.0] }}
          >
            <BrushDivider />
            <div className="flex items-start gap-4">
              <ReportIllustration type="plant" className="flex-shrink-0 mt-2" />
              <div>
                <h3
                  className="text-ink text-lg sm:text-xl font-bold mb-4"
                  style={{
                    fontFamily: "'ZCOOL KuaiLe', 'Ma Shan Zheng', 'STXingkai', cursive",
                  }}
                >
                  宅命相配
                </h3>
                <p className="text-ink-heavy text-base leading-loose">{report.baziMatch}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Section 3: Room-by-room analysis */}
        <BrushDivider />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
        >
          <h3
            className="text-ink text-lg sm:text-xl font-bold mb-6 text-center"
            style={{
              fontFamily: "'ZCOOL KuaiLe', 'Ma Shan Zheng', 'STXingkai', cursive",
            }}
          >
            各房间详析
          </h3>
          {report.rooms.map((room, i) => (
            <motion.div
              key={room.name}
              className="mb-8 bg-silk rounded-lg p-5 border border-ink-pale/20"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.15 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <ReportIllustration type={illustrationTypes[i % illustrationTypes.length]} />
                <h4
                  className="text-ink text-lg font-bold"
                  style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 500 }}
                >
                  {room.name}
                </h4>
              </div>
              <p className="text-ink-heavy text-sm leading-relaxed pl-14 sm:pl-20">{room.advice}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Section 4: Actionable tips */}
        <BrushDivider />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.3, ease: [0.25, 0.1, 0.25, 1.0] }}
        >
          <h3
            className="text-ink text-lg sm:text-xl font-bold mb-6 text-center"
            style={{
              fontFamily: "'ZCOOL KuaiLe', 'Ma Shan Zheng', 'STXingkai', cursive",
            }}
          >
            可操作的小调整
          </h3>
          <div className="bg-silk rounded-lg p-5 border border-ink-pale/20">
            {report.tips.map((tip, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-3 py-3 border-b border-ink-pale/10 last:border-b-0"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4 + i * 0.1 }}
              >
                <span className="text-cinnabar text-lg flex-shrink-0 mt-0.5">•</span>
                <span className="text-ink-heavy text-sm leading-relaxed">{tip}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Section 5: Conclusion */}
        {report.conclusion && (
          <>
            <BrushDivider />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.6, ease: [0.25, 0.1, 0.25, 1.0] }}
            >
              <h3
                className="text-ink text-lg sm:text-xl font-bold mb-6 text-center"
                style={{
                  fontFamily: "'ZCOOL KuaiLe', 'Ma Shan Zheng', 'STXingkai', cursive",
                }}
              >
                写在最后
              </h3>
              <div className="bg-silk rounded-lg p-5 border border-ink-pale/20">
                <p className="text-ink-heavy text-sm leading-loose">{report.conclusion}</p>
              </div>
            </motion.div>
          </>
        )}

        {/* Footer with action buttons */}
        <div className="mt-16 mb-8 flex flex-col items-center gap-6">
          <p
            className="text-ink-light text-sm"
            style={{
              fontFamily: "'ZCOOL KuaiLe', 'Ma Shan Zheng', 'STXingkai', cursive",
            }}
          >
            此报告仅供娱乐参考，保持轻松心态
          </p>

          <div className="flex gap-6">
            <button
              onClick={handleSaveImage}
              className="w-18 h-18 sm:w-20 sm:h-20 border-2 border-cinnabar text-cinnabar rounded-full flex flex-col items-center justify-center text-xs sm:text-sm font-bold cursor-pointer transition-all hover:shadow-[0_4px_16px_rgba(196,58,49,0.2)]"
              style={{
                fontFamily: "'ZCOOL KuaiLe', 'Ma Shan Zheng', 'STXingkai', cursive",
                rotate: '-3deg',
              }}
            >
              保存
              <span className="text-[9px] sm:text-[10px]">长图</span>
            </button>

            <button
              onClick={handleShare}
              className="w-18 h-18 sm:w-20 sm:h-20 border-2 border-cinnabar text-cinnabar rounded-full flex flex-col items-center justify-center text-xs sm:text-sm font-bold cursor-pointer transition-all hover:shadow-[0_4px_16px_rgba(196,58,49,0.2)]"
              style={{
                fontFamily: "'ZCOOL KuaiLe', 'Ma Shan Zheng', 'STXingkai', cursive",
                rotate: '5deg',
              }}
            >
              分享
              <span className="text-[9px] sm:text-[10px]">好友</span>
            </button>
          </div>

          {/* Reset button */}
          <button
            onClick={() => {
              reset();
              navigate('/');
            }}
            className="text-ink-pale text-xs hover:text-ink-light transition-colors mt-4"
          >
            重新诊断
          </button>
        </div>

        <BottomNav />
      </div>
    </InkBackground>
  );
}
