interface ReportIllustrationProps {
  type: 'plant' | 'curtain' | 'mirror' | 'light' | 'general';
  className?: string;
}

const illustrations: Record<string, string> = {
  plant: '🪴',
  curtain: '🪟',
  mirror: '🪞',
  light: '💡',
  general: '🏠',
};

export default function ReportIllustration({ type, className = '' }: ReportIllustrationProps) {
  return (
    <div
      className={`flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-silk border border-ink-pale/20 ${className}`}
    >
      <span className="text-2xl">{illustrations[type] || illustrations.general}</span>
    </div>
  );
}
