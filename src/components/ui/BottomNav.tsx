import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const navItems = [
  { path: '/', label: '首页' },
  { path: '/knowledge', label: '册页' },
  { path: '/upload', label: '落墨' },
  { path: '/bazi', label: '命理' },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  // Hide on loading page
  if (location.pathname === '/loading') return null;

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <motion.nav
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-center items-center py-3 sm:py-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div
        className="flex items-center gap-3 sm:gap-6 px-3 sm:px-6 py-2 rounded-full"
        style={{
          background: 'rgba(247, 243, 237, 0.85)',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 1px 8px rgba(44,44,44,0.04)',
        }}
      >
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`text-xs sm:text-sm tracking-wider transition-colors duration-200 ${
                active
                  ? 'text-cinnabar font-bold'
                  : 'text-ink-light hover:text-ink-heavy'
              }`}
              style={{
                fontFamily: active
                  ? "'ZCOOL KuaiLe', 'Ma Shan Zheng', 'STXingkai', cursive"
                  : "'Noto Serif SC', serif",
              }}
            >
              {item.label}
              {active && (
                <motion.div
                  className="h-0.5 bg-cinnabar/50 rounded-full mt-0.5"
                  layoutId="nav-indicator"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
}
