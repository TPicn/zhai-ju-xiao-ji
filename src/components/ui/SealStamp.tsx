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
      className={`${sizeMap[size]} border-2 border-cinnabar text-cinnabar rounded-full flex items-center justify-center font-bold select-none opacity-80 ${className}`}
      style={{
        rotate: '-8deg',
        fontFamily: "'ZCOOL KuaiLe', 'Ma Shan Zheng', 'STXingkai', cursive",
      }}
    >
      {text}
    </div>
  );
}
