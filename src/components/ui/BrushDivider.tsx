export default function BrushDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center py-8 ${className}`}>
      <svg width="120" height="12" viewBox="0 0 120 12" fill="none" className="opacity-30">
        <path
          d="M0,6 Q8,2 16,6 Q24,10 32,5 Q40,0 48,6 Q56,12 64,5 Q72,-2 80,6 Q88,14 96,5 Q104,-4 112,6 Q116,10 120,6"
          stroke="#BFB8AF"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
