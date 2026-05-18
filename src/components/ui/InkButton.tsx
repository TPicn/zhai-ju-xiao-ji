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
  const baseClasses =
    variant === 'cinnabar'
      ? 'bg-cinnabar text-parchment border-cinnabar'
      : 'bg-transparent text-ink-heavy border-ink-pale';

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`relative font-kai text-base sm:text-lg tracking-wider border px-6 sm:px-8 py-3 cursor-pointer ${baseClasses} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      style={{
        boxShadow: variant === 'cinnabar' ? '0 2px 12px rgba(196,58,49,0.25)' : 'none',
      }}
    >
      {/* Ink spread effect on hover */}
      <span className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <span className="absolute inset-0 bg-current opacity-5" />
      </span>
      {children}
    </motion.button>
  );
}
