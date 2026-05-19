interface BrushDividerProps {
  variant?: 'light' | 'heavy' | 'flying-white';
  className?: string;
}

const variantStyles = {
  light: { color: '#D9D1C5', opacity: 0.7, width: 120, strokeWidth: 1.2 },
  heavy: { color: '#B0A698', opacity: 0.85, width: 160, strokeWidth: 2 },
  'flying-white': { color: '#D9D1C5', opacity: 0.55, width: 140, strokeWidth: 1 },
};

export default function BrushDivider({ variant = 'light', className = '' }: BrushDividerProps) {
  const s = variantStyles[variant];

  return (
    <div className={`flex items-center justify-center py-8 ${className}`}>
      <svg
        width={s.width}
        height="16"
        viewBox="0 0 120 16"
        fill="none"
        style={{ opacity: s.opacity, overflow: 'visible' }}
      >
        <defs>
          <filter id={`ink-bleed-${variant}`} x="-10%" y="-50%" width="120%" height="200%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>

        {/* Main brush stroke — thicker in middle, tapering to fine tips */}
        <path
          d="M0,8 Q4,6 10,7 Q20,4 40,5.5 Q60,7 80,5.5 Q100,4 110,7 Q116,6 120,8"
          stroke={s.color}
          strokeWidth={s.strokeWidth}
          fill="none"
          strokeLinecap="round"
          filter={`url(#ink-bleed-${variant})`}
        />

        {/* Flying white — intentional gaps in the stroke */}
        {variant === 'flying-white' && (
          <>
            <path
              d="M0,8 Q6,6 15,7 Q22,5 28,5.5"
              stroke={s.color}
              strokeWidth={0.8}
              fill="none"
              strokeLinecap="round"
              filter={`url(#ink-bleed-${variant})`}
            />
            <path
              d="M50,6 Q60,7 70,5.5 Q80,4 90,6"
              stroke={s.color}
              strokeWidth={0.9}
              fill="none"
              strokeLinecap="round"
              filter={`url(#ink-bleed-${variant})`}
            />
            <path
              d="M98,5.5 Q108,7 120,8"
              stroke={s.color}
              strokeWidth={0.7}
              fill="none"
              strokeLinecap="round"
              filter={`url(#ink-bleed-${variant})`}
            />
          </>
        )}
      </svg>
    </div>
  );
}
