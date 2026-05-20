import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import InkBackground from '../components/ui/InkBackground';
import BottomNav from '../components/ui/BottomNav';
import IChingCoins from '../components/instruments/IChingCoins';
import FiveElementsWheel from '../components/instruments/FiveElementsWheel';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

// DeepSeek API integration for real AI-powered Bazi analysis
const DEEPSEEK_API_KEY = 'sk-cde7b9b704b448f9bb1007b542d26012';
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

async function callDeepSeekAPI(
  baziInfo: string,
  chatHistory: { role: string; content: string }[],
  userQuery: string,
): Promise<string> {
  const systemPrompt = `你是一位专业的八字命理顾问，精通传统八字排盘、五行生克、十神配置、大运流年分析。你的回答风格温暖、有深度、充满人文关怀。

用户提供的出生信息：${baziInfo}

注意：用户的出生时间可能是口语化表达（如"上午9点""晚上8点半"）而非传统时辰（如"巳时""戌时"），请自行转换为对应的时辰再排盘。出生日期可能是农历（如"三月初五"）或公历（如"3月15日"），请根据语境判断并在分析中说明你使用的是哪种历法。

分析原则：
1. 首先明确告知用户你识别到的八字命盘（四柱天干地支），让用户确认基本信息
2. 基于八字理论框架（日主强弱、五行平衡、十神关系、大运走势、流年变化），但不堆砌术语——用生活化的语言解释
3. 给出具体、可操作的建议，而非空洞的断言
4. 保持温暖鼓励的语气，结合具体的命理依据
5. 回答要有清晰的结构：先给出核心分析，再展开细节
6. 在回答末尾，用"📜 本次分析要点汇总"作为标题，列出3-5条核心要点
7. 最后用"🍃 最后想对你说"作为结尾，给用户一段温暖鼓励的话

重要：请只基于用户提供的出生信息进行分析。如果信息不足以做出判断，坦诚说明。

请用中文回复，使用 Markdown 格式。`;

  const messages = [
    { role: 'system', content: systemPrompt },
    ...chatHistory,
    { role: 'user', content: userQuery },
  ];

  const response = await fetch(DEEPSEEK_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages,
      temperature: 0.8,
      max_tokens: 2000,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Unknown error');
    throw new Error(`API error ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

export default function BaziPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'input' | 'chat'>('input');
  const [birthYear, setBirthYear] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [birthHour, setBirthHour] = useState('');
  const [gender, setGender] = useState<'男' | '女'>('男');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [baziInfo, setBaziInfo] = useState('');

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleStartChat = () => {
    if (!birthYear || !birthMonth || !birthDay || !birthHour) return;

    const info = `出生：${birthYear}年${birthMonth}月${birthDay}日 ${birthHour} · ${gender === '男' ? '乾造' : '坤造'}`;
    setBaziInfo(info);

    const welcomeMsg: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: `已为您排出八字命盘。

**${info}**

您好，我是您的专属命理助手。根据您提供的出生信息，系统已经完成了八字排盘和初步的五行分析。

从命盘来看，您的日主能量分布有其独特之处——这意味着您的人生走向和性格特质不是"随大流"的类型，有着自己鲜明的节奏。

**我可以帮您分析的方向**

- **运势与事业**：了解当前大运走势、适合的行业方向、职场人际关系
- **感情与婚姻**：分析夫妻宫能量、正缘特征、感情中的注意事项
- **健康与养生**：根据五行偏性，给出针对性的身体养护建议
- **财运与理财**：正财偏财的配置、适合的财富赛道、理财行为建议

**小提示**：您的问题越具体，分析的参考价值越高。比如"我适合转行吗"就比"看看我的运势"能得到更有针对性的回答。

准备好了吗？请随意提出您关心的问题。`,
      timestamp: Date.now(),
    };

    setMessages([welcomeMsg]);
    setStep('chat');
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      const chatHistory = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const response = await callDeepSeekAPI(baziInfo, chatHistory, userMsg.content);

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '抱歉，命理分析服务暂时不可用，请稍后再试。\n\n如持续遇到此问题，请检查网络连接后刷新页面。',
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <InkBackground>
      <div className="min-h-dvh flex flex-col max-w-lg mx-auto px-4 sm:px-6 py-6 sm:py-8 pb-24">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
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
            命理
          </h2>
          <div className="w-10" />
        </motion.div>

        <AnimatePresence mode="wait">
          {step === 'input' && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex flex-col gap-6"
            >
              <div className="bg-silk p-6" style={{ borderRadius: '4px', boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)' }}>
                <p
                  className="text-ink text-xl text-center mb-2"
                  style={{
                    fontFamily: "'ZCOOL KuaiLe', 'Ma Shan Zheng', 'STXingkai', cursive",
                  }}
                >
                  八字命理
                </p>
                <p className="text-ink-light text-sm text-center mb-6">
                  请输入出生年月日和时间，农历或公历均可
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="text-ink-light text-xs mb-1 block">出生年份</label>
                    <input
                      type="text"
                      value={birthYear}
                      onChange={(e) => setBirthYear(e.target.value)}
                      className="w-full bg-transparent border-0 border-b border-[#D9D1C5] px-0 py-2.5 text-sm text-ink-heavy focus:outline-none focus:border-b-2 focus:border-cinnabar transition-all placeholder:text-ink-pale" style={{ borderRadius: 0, transition: 'border-color 0.25s cubic-bezier(0.2, 0.0, 0.0, 1.0), border-width 0.25s cubic-bezier(0.2, 0.0, 0.0, 1.0)' }}
                      placeholder="如 1990 或 九零年"
                    />
                  </div>
                  <div>
                    <label className="text-ink-light text-xs mb-1 block">出生月份</label>
                    <input
                      type="text"
                      value={birthMonth}
                      onChange={(e) => setBirthMonth(e.target.value)}
                      className="w-full bg-transparent border-0 border-b border-[#D9D1C5] px-0 py-2.5 text-sm text-ink-heavy focus:outline-none focus:border-b-2 focus:border-cinnabar transition-all placeholder:text-ink-pale" style={{ borderRadius: 0, transition: 'border-color 0.25s cubic-bezier(0.2, 0.0, 0.0, 1.0), border-width 0.25s cubic-bezier(0.2, 0.0, 0.0, 1.0)' }}
                      placeholder="如 3月 或 三月初五"
                    />
                  </div>
                  <div>
                    <label className="text-ink-light text-xs mb-1 block">出生日</label>
                    <input
                      type="text"
                      value={birthDay}
                      onChange={(e) => setBirthDay(e.target.value)}
                      className="w-full bg-transparent border-0 border-b border-[#D9D1C5] px-0 py-2.5 text-sm text-ink-heavy focus:outline-none focus:border-b-2 focus:border-cinnabar transition-all placeholder:text-ink-pale" style={{ borderRadius: 0, transition: 'border-color 0.25s cubic-bezier(0.2, 0.0, 0.0, 1.0), border-width 0.25s cubic-bezier(0.2, 0.0, 0.0, 1.0)' }}
                      placeholder="如 15 或 初八"
                    />
                  </div>
                  <div>
                    <label className="text-ink-light text-xs mb-1 block">出生时间 <span className="text-ink-pale font-normal">(几点)</span></label>
                    <input
                      type="text"
                      value={birthHour}
                      onChange={(e) => setBirthHour(e.target.value)}
                      className="w-full bg-transparent border-0 border-b border-[#D9D1C5] px-0 py-2.5 text-sm text-ink-heavy focus:outline-none focus:border-b-2 focus:border-cinnabar transition-all placeholder:text-ink-pale" style={{ borderRadius: 0, transition: 'border-color 0.25s cubic-bezier(0.2, 0.0, 0.0, 1.0), border-width 0.25s cubic-bezier(0.2, 0.0, 0.0, 1.0)' }}
                      placeholder="如 上午9点 或 晚上8点半"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="text-ink-light text-xs mb-2 block text-center">性别</label>
                  <div className="flex justify-center gap-4">
                    {(['男', '女'] as const).map((g) => (
                      <button
                        key={g}
                        onClick={() => setGender(g)}
                        className={`w-20 py-2 rounded-full text-sm border transition-all ${
                          gender === g
                            ? 'border-cinnabar text-cinnabar bg-cinnabar/5'
                            : 'border-ink-pale/30 text-ink-light hover:border-ink-pale/60'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleStartChat}
                  disabled={!birthYear || !birthMonth || !birthDay || !birthHour}
                  className="w-full py-3 bg-cinnabar text-parchment rounded-lg text-base font-bold tracking-wider disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-[0_4px_16px_rgba(196,58,49,0.25)] transition-all"
                  style={{
                    fontFamily: "'ZCOOL KuaiLe', 'Ma Shan Zheng', 'STXingkai', cursive",
                  }}
                >
                  开始排盘
                </button>
              </div>

              <p className="text-ink-pale text-xs text-center leading-relaxed">
                您的出生信息仅用于本次命理分析，不会上传或保存到任何服务器。
                <br />
                分析结果由AI生成，仅供娱乐参考。
              </p>

              {/* Decorative five elements wheel */}
              <div className="flex justify-center mt-4 opacity-40">
                <FiveElementsWheel size={100} />
              </div>
            </motion.div>
          )}

          {step === 'chat' && (
            <motion.div
              key="chat"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col flex-1"
            >
              {/* Bazi info banner */}
              <div className="bg-silk px-4 py-3 mb-4 text-center relative" style={{ borderRadius: '4px', boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)' }}>
                <div className="absolute -top-3 right-3 opacity-30">
                  <IChingCoins size={48} />
                </div>
                <span className="text-ink-light text-xs">{baziInfo}</span>
              </div>

              {/* Messages area */}
              <div className="flex-1 space-y-4 mb-4 max-h-[55vh] overflow-y-auto scrollbar-hide">
                {messages.map((msg, idx) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: 0.4,
                      delay: idx === messages.length - 1 ? 0 : 0,
                      ease: [0.25, 0.1, 0.25, 1.0],
                    }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[90%] sm:max-w-[85%] px-3 sm:px-4 py-3 ${
                        msg.role === 'user'
                          ? 'bg-cinnabar/5 border border-cinnabar/20 rounded-2xl rounded-br-md'
                          : 'bg-silk border border-ink-pale/20 rounded-2xl rounded-bl-md'
                      }`}
                    >
                      {msg.role === 'assistant' ? (
                        <div className="text-ink-heavy text-sm leading-relaxed">
                          {msg.content.split('\n').map((line, i) => {
                            const trimmed = line.trim();
                            if (!trimmed) return <br key={i} />;
                            if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
                              return (
                                <h4
                                  key={i}
                                  className="text-ink font-bold mt-3 mb-1"
                                  style={{
                                    fontFamily: "'Noto Serif SC', serif",
                                    fontWeight: 500,
                                  }}
                                >
                                  {trimmed.replace(/\*\*/g, '')}
                                </h4>
                              );
                            }
                            if (trimmed.startsWith('- **')) {
                              const clean = trimmed.replace(/^-\s*/, '');
                              const match = clean.match(/^\*\*(.+?)\*\*[：:]?\s*(.*)/);
                              if (match) {
                                return (
                                  <div key={i} className="flex gap-2 ml-1 mt-1">
                                    <span className="text-cinnabar flex-shrink-0">•</span>
                                    <span className="text-ink-heavy text-sm">
                                      <strong>{match[1]}</strong>
                                      {match[2] ? `：${match[2]}` : ''}
                                    </span>
                                  </div>
                                );
                              }
                            }
                            return (
                              <p key={i} className="text-ink-heavy text-sm leading-relaxed mb-1">
                                {trimmed}
                              </p>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="text-ink text-sm leading-relaxed">{msg.content}</p>
                      )}
                    </div>
                  </motion.div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-silk border border-ink-pale/20 rounded-2xl rounded-bl-md px-5 py-3">
                      <div className="flex gap-1.5">
                        <div className="ink-dot" />
                        <div className="ink-dot" />
                        <div className="ink-dot" />
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Input area */}
              <div className="flex gap-3 mt-auto">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="输入您想了解的问题…"
                  className="flex-1 bg-silk px-5 py-3 text-sm text-ink-heavy focus:outline-none placeholder:text-ink-pale" style={{ borderRadius: '4px', boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)' }}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="w-12 h-12 rounded-full bg-cinnabar text-parchment flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-[0_2px_12px_rgba(196,58,49,0.3)] transition-all flex-shrink-0"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M22 2L11 13M22 2L15 22L11 13L2 9L22 2Z" />
                  </svg>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <BottomNav />
      </div>
    </InkBackground>
  );
}
