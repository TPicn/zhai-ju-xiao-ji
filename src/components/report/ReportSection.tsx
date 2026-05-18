import { motion } from 'framer-motion';
import BrushDivider from '../ui/BrushDivider';

interface ReportSectionProps {
  title: string;
  children: React.ReactNode;
  delay?: number;
  useVertical?: boolean;
}

export default function ReportSection({
  title,
  children,
  delay = 0,
  useVertical = false,
}: ReportSectionProps) {
  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1.0] }}
    >
      <BrushDivider />
      <div className={useVertical ? 'vertical-text items-center' : ''}>
        <h3
          className="text-ink text-xl font-bold mb-4 text-center"
          style={{
            fontFamily: "'ZCOOL KuaiLe', 'Ma Shan Zheng', 'STXingkai', cursive",
          }}
        >
          {title}
        </h3>
        <div
          className={`${
            useVertical ? 'text-ink-heavy text-base leading-loose' : 'text-ink-heavy text-base leading-loose'
          }`}
        >
          {children}
        </div>
      </div>
    </motion.div>
  );
}
