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

// Simulated AI analysis responses - comprehensive with encouragement and summary
const encouragement = '\n\n---\n\n**🍃 最后想对你说**\n\n命理分析从来不是为了给你的人生"下判决"，而是帮你看清自己身上的能量分布，然后更有意识地去生活。八字里显示的所谓"好"与"不好"，很大程度上取决于你怎么使用自己的能量——就像同样是木旺的人，有人拿它去创造、去学习、去建设，有人拿它去焦虑、去内耗、去和自己较劲。\n\n你已经做了一件很勇敢的事——花时间来了解自己。这本身就值得被肯定。\n\n记住：八字是你的底色，但你才是那个拿笔作画的人。';

const summaryHeader = '\n\n---\n\n**📜 本次分析要点汇总**\n\n';

const baziResponses = [
  {
    trigger: ['运势', '事业', '工作', '发展'],
    response: `根据您的八字来看，日主为甲木，生于春月，木气旺盛，有蓬勃向上的生命力。但木太旺也需要"泄秀"——也就是把内在的能量和想法转化为外在的实际成果。这是一个"从想到做"的命题。

**八字格局中的事业线索**

你的八字中，甲木参天，说明你天生有领导潜质和学习能力。木主仁，你很可能是一个有理想、有情怀的人——不是那种冷冰冰的"卷王"，而是会思考"我做这件事有什么意义"的类型。这是你很大的优势，但也可能成为困扰：因为太在意意义感，反而迟迟不开始行动。

从十神配置来看，你的食伤星有一定力量，这意味着你的创意和表达能力是你的核心武器。你可能在某些时刻发现：同样一件事，你学得比别人快、理解得比别人深、或者能说出别人说不清楚的东西。请珍惜这个天赋——它可能比你想象得更值钱。

**当前大运和流年**

从大运走势来看，你正处于一个重要转换期。上一个十年可能是在打基础、积累经验，接下来的三年是关键——不是在"要不要换赛道"的问题上纠结，而是在现有的土壤里深耕下去，把根扎稳。

今年下半年的流年运势中，"火"的元素开始抬头。火对于你的木来说，是一个很好的泄秀渠道——意味着你之前想过但没做的那些计划，现在有了一个"被点燃"的契机。注意观察今年秋天之后出现的机会，特别是和互联网、教育、文化创意、新能源等"火"相关领域的信息。不一定是要换工作——可能是一个副业机会、一个学习方向、或者一个让你展现自己的平台。

**职场中的相处之道**

木旺之人有时候说话比较直接，因为你的思维快、逻辑强，容易觉得"我已经想得很清楚了，你怎么还不明白"。但工作中大部分事情不是对错问题，而是沟通问题。给身边的人多留一些理解的空间——不是让你委屈自己，而是让你的"木"不要在不必要的地方把关系"克"得太紧。木克土，土代表人际关系和平台——你的事业离不开土的支持，所以善待你身边的"土"（团队、领导、平台），就是善待自己的未来。

**具体可操作的建议**

- 今年年底之前，把你"想了很多次但一直没开始"的那个计划，拆成三个具体的小步骤。第一步必须是本周就能做的
- 在工作中找一个比你年长、经验丰富的"土"属性导师（性格稳重、做事有条理的人），定期向他请教。木需要土来扎根
- 每天早上花5分钟写下当天最重要的三件事，优先做最不想做的那件——这是克服"想多做少"的实战训练${summaryHeader}1. 你的八字日主甲木，在事业上适合做"能发挥创造力"的工作，而非纯执行型岗位\n2. 当前处于大运转换期，未来三年适合"在现有领域深耕"，而非频繁跳槽\n3. 今年秋冬季是重要机遇期，关注"火"属性行业（互联网、教育、文创、能源）\n4. 说话注意方式，多和"土"属性的人合作（稳重、靠谱、有经验的同事/前辈）\n5. 把你的大计划拆成本周就能执行的小步骤，立刻行动${encouragement}`,
  },
  {
    trigger: ['感情', '婚姻', '恋爱', '桃花', '另一半'],
    response: `从您的八字来看，日支坐巳火——巳是四正桃花星之一。这意味着你天生有不错的异性缘，在人群中比较容易被注意到。但桃花星也有两面性：它可能带来很多选择，也可能让你在"烂桃花"里打转，花了很多时间在不对的人身上。

**感情格局的深层分析**

从夫妻宫（日支）的能量来看，巳火本身是一个充满活力和变化的宫位。这说明你的感情历程不会太平淡——你喜欢的人往往是有个性、有主见的类型，那种"什么都好、什么都随便"的人对你来说可能缺乏吸引力。但这也意味着在感情中，双方都需要更多的磨合和包容。

你的正官星藏在时柱——时柱代表"晚"和"远"。这在传统命理中叫"正官藏时"，通常意味着正缘来得相对较晚，或者你的另一半比你年长、成熟、社会阅历更丰富。从五行来看，对方很可能带有"土"（稳重、包容）或"金"（果断、理性）的特质——正好能中和你的木火之气，给你一种"终于遇到一个能接住我的人"的感觉。

**如果目前单身**

明年春季（木旺之时）你的感情运有一波比较明显的上升。值得留意的是，这段缘分很可能不是"陌生人"，而是一个你之前认识但不算很熟的人——可能是通过工作场合认识的、或者是朋友的朋友。保持开放的心态，不要因为"不是我的理想型"就过早关闭可能性。八字有时候给我们安排的人，和我们的想象并不一样——但往往更对。

另外想提醒一句：桃花星旺的人，容易因为"一时的好感"而快速进入一段关系。慢一点。木火型人格容易燃烧得快，但真正的感情是炭火不是烟花——慢慢烧，才暖和很久。

**如果已经有伴侣**

你的八字中木火偏旺，说话直接、情绪来得快去得也快。伴侣可能会觉得你"有时候像变了一个人"——这不是你的错，是能量起伏的自然表现。但可以有意识地练习：当你发现自己说话越来越快、声音越来越大时，停下来深呼吸三次。木气太足时说的话，往往事后会后悔。

从两人八字的配比来看（虽然没有对方的具体八字，但可以看你的夫妻宫需求），你需要一个能给你"稳定感"的伴侣。对方不需要和你一样有趣——对方的存在本身就让你觉得"回到家了"。如果你的伴侣正好是这样的人，请珍惜这份"土"的能量。如果不是，思考一下：这段关系是不是在消耗你的"木"，让你的能量无处安放？${summaryHeader}1. 八字带巳火桃花星，人缘好、感情机会不少，但要学会辨别"烂桃花"\n2. 夫妻宫（日支）能量活跃，正缘偏晚，对方大概率比你成熟稳重，五行属土或金\n3. 单身者注意明年春季，缘分可能来自"不算很熟的熟人"\n4. 有伴侣者要练习"话到嘴边留半句"，避免木火旺盛时的冲动沟通\n5. 感情中的安全感来自"踏实"而非"刺激"，选人时多用心，少用眼${encouragement}`,
  },
  {
    trigger: ['健康', '身体', '注意'],
    response: `从八字五行的平衡来看，你的命局中木气明显偏旺，木在五行中对应的是肝胆系统和筋骨。木克土——土对应脾胃——所以你的身体能量天然地偏向"木"而消耗"土"。这不是说你现在就有病，而是提醒你：这两类是你需要长期温柔对待的身体部位。

**脾胃系统：你的重点养护对象**

木克土，土被你的木气天然压制。反映在身体上，可能是：吃饭不规律（有时候忙起来就跳过一餐）、吃东西偏快、容易胃胀或消化不良、夏天贪凉吃冰的之后肚子不舒服。这些都不是什么大问题，但它们是你身体的"黄灯预警"——提醒你该多关照脾胃了。

具体来说：早餐一定要吃温的（粥、豆浆、热牛奶这类），不要空腹喝冰美式。午餐尽量定时，哪怕只是简单的便当。晚餐少吃一点，给脾胃留出休息的时间。这些听起来像奶奶的唠叨，但木旺之人最容易在"吃饭"这件事上偷懒——因为你的能量总是往外跑，不太关注身体内部的需要。

**肝胆与情绪的关系**

木主肝胆。肝胆不畅时，身体会通过情绪告诉你——容易烦躁、看什么都不顺眼、睡前脑子里停不下来。这不是你性格不好，是能量堵住了。

最伤肝胆的不是吃的东西，是熬夜和情绪压抑。晚上11点到凌晨3点是肝胆经当令的时间，如果你在这个时间段还没睡着，肝胆就没有机会做"自我清洁"。日积月累下来，你会发现皮肤变差、眼睛干涩、容易偏头痛——这些都是肝胆在喊"我累了"。

**适合你的运动类型**

木旺之人适合"以土制木"的运动——不是那种高强度、拼速度的类型（那会火上浇油），而是沉稳、接地气的：散步、爬山、太极、瑜伽、站桩、八段锦。这些运动有一个共同特点：它们让你把能量从"往上冲"（木性）收回到"往下沉"（土性）。每次运动后你应该感到"踏实了、安静了"，而不是"更兴奋了"——后者说明你选错了运动类型。

**最重要的养生建议**

你最大的养生，不是吃什么保健品，而是每天给自己留10-15分钟完全安静的时间。不看手机、不看书、不听音乐——就是安静地坐着或躺着。木旺之人最缺的不是"做更多"，而是"什么都不做"。在这15分钟里，你的肝胆和神经系统会得到真正的休息，比睡一小时还有用。试试看，坚持一周，你会感觉到不同。${summaryHeader}1. 木旺克土，脾胃是终身需要温柔对待的部位，先从规律吃早餐开始\n2. 肝胆经当令时间是晚11点到凌晨3点，尽量在这个时段入睡\n3. 运动选"接地气"的类型：散步、太极、瑜伽，而非高强度竞技型运动\n4. 情绪问题（烦躁、焦虑）的根源往往是肝气不畅，少熬夜比什么都管用\n5. 每天给自己10-15分钟的完全安静时间，不刷手机，这是你最好的"补药"${encouragement}`,
  },
  {
    trigger: ['财运', '财富', '收入', '钱'],
    response: `从您的八字来看，日主甲木，财星为土（甲木以戊土为偏财、己土为正财）。土在你的命局中有一定的力量，不是弱财的命——说明你的财运基础是存在的，这辈子不会缺衣少食。但关键在于：木克土，你的木太旺了，会天然地"消耗"土。用通俗的话说：你赚钱的能力不错，但花钱的欲望和冲动可能更强。

**正财与偏财的分析**

八字中财分两种：正财（己土）代表稳定的工资收入、劳动所得；偏财（戊土）代表投资回报、副业、意外之财。

从你的命局来看，正财星有一定的根基——你是一个能通过专业能力稳定赚钱的人。但偏财星的波动性较大——这意味着你可能有过"突然赚了一笔"的经历，也有过"不知道花哪儿去了"的困惑。偏财型的人不适合把钱全部放在一个篮子里，也不适合做过于长期、缺乏流动性的投资——因为你的能量本身就是"流动"的，和你的命局对着干会很累。

**你适合的财富赛道**

木旺之人适合做和"木"属性相关的行业和收入来源——教育、培训、文化、设计、内容创作、健康养生、绿色环保、植物花卉。这不是说其他行业你赚不到钱，而是说在和"木"相关的领域里，你赚钱会更轻松、更顺手——因为能量是"同气相求"的。如果你目前的工作和木无关，可以考虑在主业之外发展一个和木相关的副业——教别人一个技能、做一个内容账号、甚至养花卖花，都是"木"的出路。

**财富管理的行为建议**

木旺之人在钱财上最大的挑战不是"赚不到"，而是"守不住"——因为木的能量特性决定了它不喜欢"不动"的东西，包括不动的钱。所以你的理财策略要顺应自己的本性：不是你强迫自己"不花钱"，而是把钱"花在能生钱的地方"。

具体建议：
- 每月收入到账后，立刻将20%转入另一个不常用的账户（或定投指数基金），把它当作"不存在"的钱。这是在你的财务系统中人为增加"土"的能量
- 大额消费（超过月收入20%的东西）给自己设一个48小时的冷静期。木旺之人容易被新鲜感驱动，48小时后大部分的冲动就过去了
- 找到一个你觉得可靠的"土"属性理财伙伴（稳重、风险意识强的人），在重大财务决定前和TA聊一聊。你不一定完全听TA的，但TA的观点会让你看到自己注意不到的盲区

**今年和明年的财运节奏**

从流年来看，今年下半年偏财运不错，但也伴随着波动——机会来了别犹豫，但不要因为"听说了一个消息"就盲目行动。明年春季木旺之时，花销会增大（你可能会想换电脑、报课程、或者出去玩），提前预留好这笔钱。

最重要的不是具体的买卖时机，而是你对待钱的态度本身。如果你一直觉得"钱不够花"，这个信念比任何八字组合都更能影响你的财运。试着在每次花钱的时候说一声"谢谢"——谢谢钱帮你换来了这个东西或体验——而不是带着焦虑和匮乏感去花钱。这听起来有点玄，但你的心态决定了你和金钱的关系，而关系决定了结果。${summaryHeader}1. 日主甲木，正财有根、偏财波动，赚钱能力不差，但花钱势头也很猛\n2. 最适合的赚钱领域：教育、文化、设计、内容创作、健康养生等"木"属性行业\n3. 每月到账后立刻转出20%到独立账户，人为增加"土"的稳固能量\n4. 大额消费设48小时冷静期，找"土"属性伙伴做财务决策参谋\n5. 今年下半年偏财有机会但波动大，明年春季花销会增大，提前预留预算\n6. 对待金钱的心态，比你八字里的财星更重要——丰盛感创造丰盛${encouragement}`,
  },
];

const fallbackResponse = `感谢您的提问。从您提供的八字信息来看，您的命局具有比较鲜明的个人特点——日主的能量分布有其独特的倾向性，这意味着您的性格和人生走向并不是"随大流"的类型。

八字分析是一门系统性的学问，需要综合考虑日主强弱、五行平衡、十神配置、大运走势、流年变化等多个维度。您当前关心的问题，从命理的角度来看，往往和您八字中某个特定五行能量的过强或过弱有关。命理的意义不在于"算命"——而在于通过了解自己的能量地图，找到更适合自己的生活方式和决策节奏。

**一些通用的观察**

从五行分布来看，每个人的八字都有其"偏性"——没有完美平衡的命局，就像没有完美平衡的人生。这种偏性不是缺陷，而是特点：它决定了你在哪些方面天然顺手，在哪些方面需要多花一些力气。

比如木旺的人，天然的创造力和学习力很强，但耐心和持续性可能需要刻意练习；火旺的人，行动力和感染力出色，但有时候容易急躁；土旺的人，稳重可靠让人安心，但可能不太喜欢变化；金旺的人，逻辑清晰做事有条理，但有时显得过于冷静；水旺的人，直觉敏锐适应力强，但情绪起伏可能比较大。

**可以尝试的日常调整**

根据五行生克的原理，在日常生活中做一些小小的调整——不是"改命"，而是"顺势"：

- 如果你觉得最近容易焦虑、静不下来（可能是木或火偏旺），试试增加一些"土"和"水"的活动：散步、泡脚、听安静的音乐、减少咖啡和茶
- 如果你觉得最近萎靡、提不起劲（可能是土或水偏旺），试试增加一些"木"和"火"的能量：早上晒晒太阳、穿鲜艳一点的颜色、去健身房出一身汗
- 在家居环境里，用颜色来做微调也很有效——不需要重新装修，换一个靠垫套、铺一块桌布、或者在某个角落放一盆植物，都能微妙地调整空间的能量

**最后想对你说**

命理最有价值的不是告诉你"哪年哪月会怎样"，而是帮你理解：你的能量配置决定了你对不同事物的反应模式。一旦你看到了自己的模式，你就有了选择——是继续按惯性走，还是有意识地调整一下方向。

感谢你愿意花时间来了解自己。如果你有更具体的问题（比如最近面临一个重要的决定、想了解接下来几个月的运势走向、或者想知道自己适合什么类型的工作和伴侣），请继续问我。越具体的问题，命理能给出的参考就越有针对性。\n\n---\n\n**📜 要点汇总**\n\n1. 八字分析不是为了"算命"，而是帮你了解自己的能量地图\n2. 每个人的命局都有偏性——这不是缺陷，是你的特点\n3. 五行的过强或过弱可以通过日常小调整来平衡（作息、饮食、运动、家居颜色）\n4. 命理是工具，你是主人——了解它、使用它，而不是被它定义\n5. 如果正在面临具体问题，欢迎继续提问，越具体越有参考价值${encouragement}`;

function generateResponse(query: string): string {
  const lowerQuery = query.toLowerCase();
  for (const preset of baziResponses) {
    if (preset.trigger.some((t) => lowerQuery.includes(t))) {
      return preset.response;
    }
  }
  return fallbackResponse;
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

    const info = `乾造/坤造：${birthYear}年${birthMonth}月${birthDay}日${birthHour}时 · ${gender === '男' ? '乾造' : '坤造'}`;
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

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time (1.5-3 seconds)
    const delay = 1500 + Math.random() * 1500;
    setTimeout(() => {
      const response = generateResponse(userMsg.content);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, delay);
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
              <div className="bg-silk rounded-lg p-6 border border-ink-pale/20">
                <p
                  className="text-ink text-xl text-center mb-2"
                  style={{
                    fontFamily: "'ZCOOL KuaiLe', 'Ma Shan Zheng', 'STXingkai', cursive",
                  }}
                >
                  八字命理
                </p>
                <p className="text-ink-light text-sm text-center mb-6">
                  请输入您的出生信息，系统将为您排出八字命盘
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="text-ink-light text-xs mb-1 block">出生年份</label>
                    <input
                      type="text"
                      value={birthYear}
                      onChange={(e) => setBirthYear(e.target.value)}
                      className="w-full bg-parchment border border-ink-pale/30 rounded px-3 py-2.5 text-sm text-ink-heavy focus:outline-none focus:border-cinnabar/50 transition-colors"
                      placeholder="如 1990"
                    />
                  </div>
                  <div>
                    <label className="text-ink-light text-xs mb-1 block">出生月份</label>
                    <input
                      type="text"
                      value={birthMonth}
                      onChange={(e) => setBirthMonth(e.target.value)}
                      className="w-full bg-parchment border border-ink-pale/30 rounded px-3 py-2.5 text-sm text-ink-heavy focus:outline-none focus:border-cinnabar/50 transition-colors"
                      placeholder="农历或公历月"
                    />
                  </div>
                  <div>
                    <label className="text-ink-light text-xs mb-1 block">出生日</label>
                    <input
                      type="text"
                      value={birthDay}
                      onChange={(e) => setBirthDay(e.target.value)}
                      className="w-full bg-parchment border border-ink-pale/30 rounded px-3 py-2.5 text-sm text-ink-heavy focus:outline-none focus:border-cinnabar/50 transition-colors"
                      placeholder="如 15"
                    />
                  </div>
                  <div>
                    <label className="text-ink-light text-xs mb-1 block">出生时辰</label>
                    <input
                      type="text"
                      value={birthHour}
                      onChange={(e) => setBirthHour(e.target.value)}
                      className="w-full bg-parchment border border-ink-pale/30 rounded px-3 py-2.5 text-sm text-ink-heavy focus:outline-none focus:border-cinnabar/50 transition-colors"
                      placeholder="如 子时(23-1点)"
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
              <div className="bg-silk rounded-lg px-4 py-3 border border-ink-pale/20 mb-4 text-center relative">
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
                  className="flex-1 bg-silk border border-ink-pale/30 rounded-full px-5 py-3 text-sm text-ink-heavy focus:outline-none focus:border-cinnabar/50 transition-colors"
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

