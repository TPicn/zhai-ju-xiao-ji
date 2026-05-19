interface SealStampProps {
  text: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  sm: 'w-8 h-8 text-[10px]',
  md: 'w-12 h-12 text-xs',
  lg: 'w-16 h-16 text-sm',
};

export default function SealStamp({ text, size = 'md', className = '' }: SealStampProps) {
  return (
    <div
      className={`${sizeMap[size]} border-2 border-cinnabar text-cinnabar rounded-full flex items-center justify-center font-bold select-none ${className}`}
      style={{
        rotate: '-8deg',
        fontFamily: "'ZCOOL KuaiLe', 'Ma Shan Zheng', 'STXingkai', cursive",
        textShadow: '0 1px 0 #8B1E1A, 0 -1px 0 #E87572',
        boxShadow: '0 1px 3px rgba(139,30,26,0.15)',
      }}
    >
      {text}
    </div>
  );
}
