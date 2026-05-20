import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAppStore, type ReportData } from '../store/useAppStore';

const DEEPSEEK_API_KEY = 'sk-cde7b9b704b448f9bb1007b542d26012';
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

async function callDeepSeekForReport(
  rooms: { name: string; label: string }[],
  doorDirection: string | null,
  bazi: { year: number; month: number; day: number; hour: number } | null,
  houseType: 'normal' | 'dorm',
): Promise<ReportData> {
  const roomList = rooms.map((r) => r.label || r.name).join('、');
  const baziStr = bazi
    ? `${bazi.year}年${bazi.month}月${bazi.day}日${bazi.hour}时`
    : '未提供';

  const houseContext =
    houseType === 'dorm'
      ? '这是一间宿舍（学生宿舍/员工宿舍/合租单间），不是标准住宅。用户的生活场景是住宿，而非居家。分析应围绕床位摆放、书桌布局、储物收纳、个人空间优化等宿舍特有的风水场景展开。不要提及厨房和客厅，宿舍里没有这些。'
      : '这是一套标准住宅（商品房/公寓/自建房），用户在这里进行完整的居家生活。分析应覆盖客厅、卧室、厨房、卫生间等标准住宅空间。';

  const systemPrompt = `你是一位经验丰富的风水顾问，你的分析风格温暖、注重生活细节、不堆砌术语。你会根据用户提供的真实户型信息给出个性化、可操作的建议。

## 用户提供的户型信息
- 房屋类型：${houseType === 'dorm' ? '宿舍' : '标准住宅'}
- 大门朝向：${doorDirection || '未指定'}
- 空间/房间列表：${roomList}
- 八字信息：${baziStr}

${houseContext}

## 你的任务
根据上述信息，生成一份完整的居家风水分析报告。你必须**严格根据用户提供的房间列表**来写分析——用户有几个房间就分析几个，房间名使用用户提供的名称。不要分析用户没有提到的房间，也不要使用"客厅""厨房"等用户列表中没有的房间名。

## 输出格式要求
请严格输出以下 JSON 格式（不要加 markdown 代码块标记，直接输出纯 JSON）：

{
  "overall": "整体格局分析，200-400字。根据实际朝向和空间布局给出个性化评价，语言温暖有画面感",
  "rooms": [
    { "name": "房间名（使用用户提供的名称）", "advice": "针对这个房间的具体风水建议，150-250字，包含可操作的调整方法" }
  ],
  "tips": [
    "具体可操作的小调整1",
    "具体可操作的小调整2",
    "具体可操作的小调整3",
    "具体可操作的小调整4",
    "具体可操作的小调整5"
  ],
  "conclusion": "温暖鼓励的结束语，100-150字，让用户感到这个空间是可以变好的"
}

## 分析原则
1. 基于实际房间布局和朝向来写，不要套用模板
2. 每个房间的建议要具体、可操作——用户看完就能动手改
3. 语言温暖，有画面感，像朋友在聊天而不是大师在说教
4. 宿舍类型的分析要特别关注：床位朝向与睡眠质量、书桌摆放与学习/工作效率、储物空间的整洁与能量流动
5. 如果提供了八字，可在 overall 中简要提及五行适配（一两句即可）
6. 每条 tip 要简洁有力，20-40字
7. 不要使用任何 markdown 格式标记

重要：只输出 JSON，不要加 \`\`\`json 或其他标记，纯 JSON 文本。`;

  const response = await fetch(DEEPSEEK_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: '请为我的户型生成风水分析报告。' },
      ],
      temperature: 0.85,
      max_tokens: 3000,
    }),
  });

  if (!response.ok) {
    throw new Error(`API error ${response.status}`);
  }

  const data = await response.json();
  const content: string = data.choices[0].message.content;

  // Parse JSON — handle possible markdown wrapping
  let jsonStr = content.trim();
  // Remove ```json ... ``` if present
  const codeBlockMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (codeBlockMatch) {
    jsonStr = codeBlockMatch[1].trim();
  }
  // Try to find the first { and last }
  const firstBrace = jsonStr.indexOf('{');
  const lastBrace = jsonStr.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1) {
    jsonStr = jsonStr.slice(firstBrace, lastBrace + 1);
  }

  const report: ReportData = JSON.parse(jsonStr);

  // Validate required fields
  if (!report.overall || !report.rooms || !report.tips) {
    throw new Error('Report missing required fields');
  }

  return report;
}

export default function LoadingPage() {
  const navigate = useNavigate();
  const { setReport, rooms, doorDirection, bazi } = useAppStore();
  const [phase, setPhase] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    if (doneRef.current) return;

    // Determine house type from rooms — if rooms include 床位/书桌/储物, it's dorm
    const roomNames = rooms.map((r) => r.label || r.name).join('');
    const isDorm = /床位|书桌|储物|宿舍|寝/.test(roomNames);
    const houseType: 'normal' | 'dorm' = isDorm ? 'dorm' : 'normal';

    // Fire API call immediately
    const apiPromise = callDeepSeekForReport(rooms, doorDirection, bazi, houseType);

    // Animation phase timers
    const t1 = setTimeout(() => setPhase(1), 300);
    const t2 = setTimeout(() => setPhase(2), 700);
    const t3 = setTimeout(() => setPhase(3), 1100);

    // Wait for both: minimum animation time AND API response
    const minAnimationMs = 3500;
    const startTime = Date.now();

    apiPromise
      .then((report) => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, minAnimationMs - elapsed);

        setTimeout(() => {
          doneRef.current = true;
          setReport(report);
          navigate('/report');
        }, remaining);
      })
      .catch((err) => {
        console.error('Report generation failed:', err);
        // Wait for min animation before showing error
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, minAnimationMs - elapsed);
        setTimeout(() => {
          setError(err instanceof Error ? err.message : '生成失败');
        }, remaining);
      });

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [navigate, setReport, rooms, doorDirection, bazi]);

  const chars = ['观', '其', '形', '，', '察', '其', '气', '，', '问', '其', '心'];

  return (
    <div className="min-h-dvh bg-parchment flex flex-col items-center justify-center relative overflow-hidden">
      {/* Ink drop animation area */}
      <div className="relative w-40 h-40 flex items-center justify-center">
        {/* Water surface line */}
        <div className="absolute top-[55%] left-0 w-full h-px opacity-0" />

        {/* ① The falling drop */}
        <motion.div
          className="absolute w-3 h-5 bg-ink/70"
          style={{
            borderRadius: '45% 55% 50% 50%',
            top: '20%',
          }}
          animate={
            phase < 2
              ? { y: [0, 65], opacity: [0.9, 0.7] }
              : { y: 65, opacity: 0 }
          }
          transition={
            phase < 2
              ? { duration: 0.7, ease: [0.4, 0.0, 0.6, 1.0] }
              : { duration: 0.2 }
          }
        />

        {/* ② Splash dots */}
        {phase >= 1 && (
          <>
            <motion.div
              className="absolute w-1.5 h-1.5 rounded-full bg-ink/50"
              style={{ top: '55%', left: '42%' }}
              initial={{ y: 0, x: 0, opacity: 0.8 }}
              animate={{ y: -24, x: -8, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.2, 0.0, 0.0, 1.0] }}
            />
            <motion.div
              className="absolute w-1 h-1 rounded-full bg-ink/40"
              style={{ top: '55%', left: '53%' }}
              initial={{ y: 0, x: 0, opacity: 0.7 }}
              animate={{ y: -18, x: 6, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.2, 0.0, 0.0, 1.0] }}
            />
          </>
        )}

        {/* ③ Horizontal spread */}
        {phase >= 2 && (
          <motion.div
            className="absolute"
            style={{
              top: '53%',
              width: '40px',
              height: '4px',
              background:
                'radial-gradient(ellipse at center, rgba(94,85,75,0.3) 0%, transparent 70%)',
              borderRadius: '50%',
            }}
            initial={{ scaleX: 0.3, scaleY: 1.5, opacity: 0.5 }}
            animate={{ scaleX: 3, scaleY: 0.5, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1.0] }}
          />
        )}

        {/* Text revealing character by character */}
        <div className="absolute mt-40 flex">
          {phase >= 1 &&
            chars.map((char, i) => (
              <motion.span
                key={i}
                className="text-ink-light text-base mx-[2px]"
                initial={{ opacity: 0, filter: 'blur(4px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
              >
                {char}
              </motion.span>
            ))}
        </div>
      </div>

      {/* Floor plan contour emerging */}
      {phase >= 3 && !error && (
        <motion.svg
          className="absolute top-[20%] w-40 h-40"
          viewBox="0 0 100 100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.25 }}
          transition={{ duration: 0.8 }}
        >
          <motion.rect
            x="15" y="10" width="70" height="80" rx="2"
            fill="none" stroke="#5E554B" strokeWidth="0.8"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: [0.2, 0.0, 0.0, 1.0] }}
          />
          <motion.line
            x1="15" y1="45" x2="85" y2="45"
            stroke="#5E554B" strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
          />
          <motion.line
            x1="50" y1="45" x2="50" y2="90"
            stroke="#5E554B" strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
        </motion.svg>
      )}

      {/* Error state */}
      {error && (
        <motion.div
          className="absolute mt-60 text-center px-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-cinnabar text-sm mb-4">分析生成失败，请检查网络后重试</p>
          <button
            onClick={() => {
              setError(null);
              setPhase(0);
              doneRef.current = false;
              // Re-trigger by forcing re-render
              window.location.reload();
            }}
            className="px-6 py-2 bg-cinnabar text-parchment rounded-full text-sm"
          >
            重新生成
          </button>
        </motion.div>
      )}

      {/* Ambient floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#BFB8AF]/15 rounded-full"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              delay: i * 0.5,
              repeat: Infinity,
            }}
          />
        ))}
      </div>
    </div>
  );
}
