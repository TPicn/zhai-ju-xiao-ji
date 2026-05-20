const STORAGE_KEY = 'zhai_ju_usage_log';

export interface UsageEntry {
  type: 'bazi-chat' | 'fengshui-report';
  timestamp: number;
  date: string; // ISO date string for grouping
}

export interface UsageStats {
  total: number;
  baziChats: number;
  fengshuiReports: number;
  today: number;
  last7Days: number;
  entries: UsageEntry[];
}

function getEntries(): UsageEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function trackUsage(type: UsageEntry['type']): void {
  const entries = getEntries();
  entries.push({
    type,
    timestamp: Date.now(),
    date: new Date().toISOString().split('T')[0],
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export function getUsageStats(): UsageStats {
  const entries = getEntries();
  const now = Date.now();
  const todayStart = new Date(new Date().toISOString().split('T')[0]).getTime();
  const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;

  return {
    total: entries.length,
    baziChats: entries.filter((e) => e.type === 'bazi-chat').length,
    fengshuiReports: entries.filter((e) => e.type === 'fengshui-report').length,
    today: entries.filter((e) => e.timestamp >= todayStart).length,
    last7Days: entries.filter((e) => e.timestamp >= sevenDaysAgo).length,
    entries,
  };
}
