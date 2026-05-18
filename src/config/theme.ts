export const colors = {
  parchment: '#F7F3ED',
  silk: '#F2EFE9',
  ink: '#2C2C2C',
  inkHeavy: '#4A4A4A',
  inkLight: '#8C8C8C',
  inkPale: '#BFB8AF',
  cinnabar: '#C43A31',
  indigo: '#4A6B8A',
} as const;

export const pageTransition = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] as const },
};

export const elementReveal = {
  initial: { opacity: 0, y: 4 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.18, ease: 'easeOut' },
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
