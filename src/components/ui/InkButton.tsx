import { useRef } from 'react';
import { motion } from 'framer-motion';

interface InkButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'cinnabar' | 'outline';
  className?: string;
  type?: 'button' | 'submit';
}

export default function InkButton({
  children,
  onClick,
  variant = 'cinnabar',
  className = '',
  type = 'button',
}: InkButtonProps) {
  const rippleRef = useRef<HTMLSpanElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    if (!rippleRef.current) return;
    const rect = rippleRef.current.parentElement!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    rippleRef.current.style.left = `${x}px`;
    rippleRef.current.style.top = `${y}px`;
    rippleRef.current.style.width = '0px';
    rippleRef.current.style.height = '0px';
    rippleRef.current.style.opacity = '1';
    rippleRef.current.animate(
      [
        { width: '0px', height: '0px', opacity: 0.5, offset: 0 },
        { width: '80px', height: '80px', opacity: 0, offset: 1 },
      ],
      { duration: 400, easing: 'cubic-bezier(0.2, 0.0, 0.0, 1.0)' },
    );
    onClick?.();
  };

  const baseStyle: React.CSSProperties =
    variant === 'cinnabar'
      ? {
          background: '#C73E3A',
          color: '#F9F6F0',
          borderColor: '#C73E3A',
          boxShadow: '0 2px 4px rgba(180,40,30,0.3)',
        }
      : {
          background: 'transparent',
          color: '#5E554B',
          borderColor: '#D9D1C5',
          boxShadow: 'none',
        };

  return (
    <motion.button
      type={type}
      onClick={handleClick}
      className={`relative overflow-hidden font-kai text-base sm:text-lg tracking-wider border px-6 sm:px-8 py-3 cursor-pointer ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{
        ...baseStyle,
        borderRadius: '2px 3px 2px 2px',
        borderWidth: '1.5px',
        fontFamily: "'ZCOOL KuaiLe', 'Ma Shan Zheng', 'STXingkai', cursive",
      }}
    >
      {/* Noise grain overlay */}
      {variant === 'cinnabar' && (
        <span
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 64 64\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
            backgroundSize: '64px 64px',
          }}
        />
      )}

      {/* Non-continuous inner brush stroke border */}
      {variant === 'cinnabar' && (
        <span className="absolute inset-[2px] pointer-events-none opacity-30" style={{ borderRadius: '1px 2px 1px 1px' }}>
          <svg width="100%" height="100%" className="absolute inset-0">
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="none"
              stroke="#F9F6F0"
              strokeWidth="0.5"
              strokeDasharray="4 6"
              strokeLinecap="round"
              rx="1"
            />
          </svg>
        </span>
      )}

      {/* Ink ripple */}
      <span
        ref={rippleRef}
        className="ink-ripple absolute -translate-x-1/2 -translate-y-1/2"
        style={{ width: 0, height: 0, opacity: 0 }}
      />

      {children}
    </motion.button>
  );
}
