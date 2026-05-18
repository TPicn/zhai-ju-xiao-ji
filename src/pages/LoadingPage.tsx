import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';

// Simulated report data - comprehensive with detailed analysis and encouragement
const mockReport = {
  overall:
    '你的户型整体格局方正，南北通透，采光条件相当不错。进门后客厅开阔，有让人"眼前一亮"的感觉——这在风水中是一个很好的信号，说明气能顺畅地进入并铺展开来。不过也正因为太开阔了，进门后缺少一个缓冲过渡区，气来得有些直接。这就像一个人兴冲冲地回到家，还没来得及换鞋、放下包、喘口气，就已经站在了整个空间的正中央——少了一点"缓慢切换状态"的过程。简单来说：你的房子是一个热情外向的性格，不设防地欢迎每一个人和每一股气。这有它的好（明亮、温馨、不压抑），也有可以优化的地方（气来得快、走得也快，不够"留人"）。以下的分析会帮你在不砸墙、不大动干戈的前提下，用最小的调整让它变得更舒适、更养人。',
  baziMatch:
    '从你提供的八字来看，命局中木的能量相对偏弱。木在五行中代表生长、舒展、创造力和向上的生命力——就像春天破土而出的嫩芽，需要合适的土壤和阳光来滋养。而你的家，恰好有南北通透的格局，光线充足，这本身就是很好的"木"生长环境。接下来的宅命相配建议，核心思路就是：用家居布置来补充你八字中偏弱的木气。不需要大刀阔斧——几盆绿植、一块浅绿色的桌布、一张木质小边几、或者把床单换成偏绿的色调——这些微小的改变，会在你每天的生活中不知不觉地给你"充电"。想象一下：每天早上醒来，第一眼看到的是柔和的绿色床单和窗台上生机勃勃的植物——你的木气从一早就开始被滋养了。这就是"宅命相配"的意义：不是玄学，是让环境成为你能量系统的外挂。',
  rooms: [
    {
      name: '客厅',
      advice:
        '客厅是你家最开阔的区域，采光充足，这是整个户型最大的亮点。大面积的落地窗让客厅明亮通透，白天不需要开灯就很舒服。但好的采光也带来了一个可以优化的点——如果沙发摆在窗户正对面或者被光直射，会让人坐着的时候觉得"后背没有靠"。建议把主沙发靠墙摆放，形成"坐实朝空"的格局。如果受限于空间必须把沙发放在窗前，也没关系——在沙发背后放一张矮柜（高度在沙发靠背一半左右），柜上摆一排绿植，这样就有了一个视觉上的"靠"。另外，客厅的咖啡桌面积不宜过大，保持客厅正中央相对开阔（这在风水中叫"明堂开阔"），气才能在这里聚散自如。如果客厅里已经有电视墙，不看的时候用一块好看的布盖起来——电视机在风水中属"火"，关着的时候是一块黑镜，会"吸"掉客厅的一部分能量。',
    },
    {
      name: '主卧',
      advice:
        '主卧的窗户很大，光线条件非常好——白天阳光进来的时候整个房间都很温暖。但大窗户也意味着睡觉的时候光线和外界的声音容易进来。从风水的角度，卧室需要"藏风聚气"，太大面积的玻璃会让能量散得比较快。建议配一套遮光性好的窗帘（推荐米色或浅绿色，既能遮光又不压抑），睡觉时拉上。床头最好靠一面实墙，如果目前床头靠的是隔断墙或窗户，可以考虑调整方向。如果格局不允许，一个高一点的实木床头板（至少比床垫高40-50cm）也能起到类似的作用——它在你睡着的时候给你一个实实在在的"靠"。另外，主卧不要放太多电子产品——至少睡前一个小时，把手机放在床够不到的地方充电，让卧室真正成为一个"休息的容器"而非"另一个玩手机的角落"。如果你喜欢在卧室放香薰，推荐木质调或柑橘调的精油（柠檬、佛手柑、雪松、檀木），木的能量会在睡梦中轻柔地滋养你。',
    },
    {
      name: '厨房',
      advice:
        '厨房是家里"水火并存"的地方——水槽代表水，灶台代表火。从功能上说，水槽和灶台挨得近是方便操作的（洗好菜转个身就能下锅），但从五行的角度，水火紧挨着会让两种能量互相消耗。一个简单又美观的解决方案是：在水槽和灶台之间放一块木质砧板（最好是实木的，不要塑料的），或者养几盆小香草（薄荷、罗勒、迷迭香）。木在五行中能调和水火——相当于在水和火之间放了一个"和事佬"。另外，厨房如果正对大门或客厅，建议在厨房门口挂一个半帘（半透明的纱帘或竹帘），让厨房的火气不会直接冲向整个家。最后提醒一句：厨房是家里烟火气最重的地方，也是最需要"明亮"的地方——灶台上方的灯光一定要充足，这既是风水（火需要光明），也是安全（切菜炒菜都要看得清）。',
    },
    {
      name: '卫生间',
      advice:
        '卫生间在风水中属"水"，是家里湿气最集中的地方。对你家来说，卫生间的位置本身没什么硬伤——主要需要注意的是通风和干燥。每次洗完澡后，开窗或开排风扇至少20分钟，让湿气彻底排出去。如果卫生间门正对着卧室门或厨房门，平时尽量把门关着——这不是什么大忌讳，就是一个很朴素的生活经验：你总不希望睡觉或做饭的时候，一眼看到的是卫生间。门口放一块好看的吸水地垫（选深色或米色），出浴时踩一踩，水就不会被带到其他房间。马桶盖用完就盖上——不只是风水，从卫生角度看也该如此。如果想在卫生间里放一盆植物，选耐阴喜湿的品种——绿萝、常春藤、蕨类——它们能在卫生间活得很好，还能帮吸收湿气。',
    },
    {
      name: '玄关',
      advice:
        '你家进门后直接面对开阔的客厅，缺少一个明确的玄关区域。这不是什么硬伤——很多现代公寓都有这个特点——但可以通过简单的布置来"造"一个玄关。在进门的一侧放一个窄鞋柜（深度15-20cm的翻斗鞋柜就足够），上面放一盏暖色的小台灯（色温2700-3000K），进门第一眼看到的是温暖的光，感觉就不一样了。鞋柜上方可以挂一面小镜子——但不要正对大门，挂在侧面的墙上，出门前最后看一下自己。如果你有空间，进门处铺一块小地垫，踩上去脚感不一样，潜意识就知道"到家了"。每个月清理一次玄关区域的杂物，保持干净明亮——这在风水中比任何摆件都重要。',
    },
  ],
  tips: [
    '在入户门正对的墙上挂一幅浅色的画（风景或抽象都可以），让进门的气有一个视觉上的"落脚点"，不至于直冲到客厅深处',
    '客厅角落放一盆龟背竹或琴叶榕——这两种植物叶片宽大、姿态舒展，木的能量很足，而且好养活',
    '床单换成浅绿色或米白色——不是让你把整个卧室刷成绿色，床上用品的颜色切换是最简单也最高效的色彩调整',
    '厨房台面上放一小盆薄荷，好看又能随时摘来泡茶，木气调和了水火的关系',
    '每个月至少清理一次入门处的杂物——玄关是家的"气口"，保持整洁比任何风水摆件都管用',
    '在客厅放一个木质小边几（而非金属或玻璃的），木的能量会默默滋养你八字中偏弱的木气',
    '定期开窗通风——每天至少一次，每次10分钟。让家里的气"流动"起来，带走沉闷的能量',
    '如果条件允许，在阳台养两盆开花植物（长寿花、海棠、茉莉），花是"火"的象征，能温暖整个家的氛围',
  ],
  conclusion:
    '家不是用来"展示"的，是用来"相处"的。上面这些建议，不需要你一次性全部做完。挑一两个你觉得最容易、最想做的，先试试看。可能是一盆绿植、一块新床单、或者一次彻底的玄关清理。观察一下变化——不是房子变了，而是你在这个空间里的感觉变了。这就是风水最朴素的本质：通过调整环境，让你在这里过得更舒服、更自在。记住：最好的风水，是你真心喜欢待在家里。',
};

export default function LoadingPage() {
  const navigate = useNavigate();
  const { setReport, bazi } = useAppStore();
  const [phase, setPhase] = useState(0);
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    // Phase 0: drop falls
    const t1 = setTimeout(() => setPhase(1), 800);
    // Phase 1: spread
    const t2 = setTimeout(() => {
      setPhase(2);
      setTextVisible(true);
    }, 1800);
    // Navigate to report
    const t3 = setTimeout(() => {
      // Customize report based on input
      const customizedReport = {
        ...mockReport,
        baziMatch: bazi ? mockReport.baziMatch : undefined,
      };
      setReport(customizedReport);
      navigate('/report');
    }, 4500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [navigate, setReport, bazi]);

  const chars = ['观', '其', '形', '，', '察', '其', '气', '，', '问', '其', '心'];

  return (
    <div className="min-h-dvh bg-parchment flex flex-col items-center justify-center relative overflow-hidden">
      {/* Ink drop animation area */}
      <div className="relative w-40 h-40 flex items-center justify-center">
        {/* Ripple rings - multiple waves */}
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full"
            style={{
              border: '1px solid rgba(44,44,44,0.12)',
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: phase >= 1 ? [0, 2.0 + i * 0.5] : [0, 0.5],
              opacity: phase >= 1 ? [0.5, 0] : [0.3, 0],
            }}
            transition={{
              duration: 2.5,
              delay: i * 0.7 + 0.3,
              repeat: Infinity,
              repeatDelay: 0,
            }}
          />
        ))}

        {/* Central ink drop */}
        <motion.div
          className="w-2.5 h-2.5 bg-ink rounded-full absolute"
          animate={
            phase === 0
              ? { y: [0, 20], opacity: 1 }
              : phase === 1
              ? { scale: [1, 1.8, 3], opacity: [1, 0.6, 0.2] }
              : { scale: 2, opacity: 0.15 }
          }
          transition={
            phase === 0
              ? { duration: 0.6, ease: 'easeIn' }
              : { duration: 0.8, ease: 'easeOut' }
          }
        />

        {/* Ink spread blob */}
        {phase >= 1 && (
          <motion.div
            className="absolute w-32 h-32 rounded-full"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, rgba(44,44,44,0.2) 0%, rgba(44,44,44,0.06) 40%, transparent 70%)',
            }}
            initial={{ scale: 0 }}
            animate={{
              scale: [0.2, 1.6, 1.3, 1.5, 1.4],
              rotate: [0, 90, 180, 270, 360],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}

        {/* Emerging floor plan contour */}
        {phase >= 2 && (
          <motion.svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <motion.rect
              x="15"
              y="10"
              width="70"
              height="80"
              rx="2"
              fill="none"
              stroke="#2C2C2C"
              strokeWidth="0.8"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />
            <motion.line
              x1="15"
              y1="45"
              x2="85"
              y2="45"
              stroke="#2C2C2C"
              strokeWidth="0.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.3 }}
            />
            <motion.line
              x1="50"
              y1="45"
              x2="50"
              y2="90"
              stroke="#2C2C2C"
              strokeWidth="0.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
          </motion.svg>
        )}
      </div>

      {/* Text revealing character by character */}
      <div className="mt-20 flex">
        {textVisible &&
          chars.map((char, i) => (
            <motion.span
              key={i}
              className="text-ink-light text-base mx-[2px]"
              initial={{ opacity: 0, filter: 'blur(4px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
            >
              {char}
            </motion.span>
          ))}
      </div>

      {/* Ambient floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-ink-pale/15 rounded-full"
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
