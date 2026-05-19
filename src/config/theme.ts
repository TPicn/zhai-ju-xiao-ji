export const colors = {
  parchment: '#F9F6F0',
  silk: '#F5F1EA',
  ink: '#1E1E1E',
  inkHeavy: '#5E554B',
  inkLight: '#6B635B',
  inkPale: '#BFB8AF',
  cinnabar: '#C73E3A',
  cinnabarDeep: '#8B1E1A',
  cinnabarLight: '#E87572',
  indigo: '#4A6B8A',
  paperEdge: '#E0D8CC',
  divider: '#D9D1C5',
  dividerHeavy: '#B0A698',
} as const;

export const pageTransition = {
  initial: { opacity: 1, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -10, scale: 0.98 },
  transition: {
    x: { duration: 0.25, ease: [0.2, 0.0, 0.0, 1.0] as const },
    opacity: { duration: 0.15, ease: [0.2, 0.0, 0.0, 1.0] as const },
    scale: { duration: 0.15, ease: [0.2, 0.0, 0.0, 1.0] as const },
  },
};

export const elementReveal = {
  initial: { opacity: 0, y: 4 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.25, ease: [0.2, 0.0, 0.0, 1.0] as const },
};

export const staggerContainer = {
  animate: { transition: { staggerChildren: 0.08 } },
};

export const directions = [
  { label: '东', angle: 0, element: '木' },
  { label: '东南', angle: 45, element: '木' },
  { label: '南', angle: 90, element: '火' },
  { label: '西南', angle: 135, element: '土' },
  { label: '西', angle: 180, element: '金' },
  { label: '西北', angle: 225, element: '金' },
  { label: '北', angle: 270, element: '水' },
  { label: '东北', angle: 315, element: '土' },
] as const;

export type Direction = (typeof directions)[number];
