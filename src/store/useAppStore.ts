import { create } from 'zustand';

export interface Room {
  id: string;
  name: string;
  label: string;
}

export interface BaziData {
  year: number;
  month: number;
  day: number;
  hour: number;
}

export interface ReportSection {
  title: string;
  content: string;
  illustration?: string;
}

export interface ReportData {
  overall: string;
  baziMatch?: string;
  rooms: { name: string; advice: string }[];
  tips: string[];
  conclusion?: string;
}

interface AppState {
  uploadedImage: string | null;
  doorPosition: { x: number; y: number } | null;
  doorDirection: string | null;
  rooms: Room[];
  bazi: BaziData | null;
  report: ReportData | null;

  setUploadedImage: (image: string | null) => void;
  setDoorPosition: (pos: { x: number; y: number } | null) => void;
  setDoorDirection: (dir: string | null) => void;
  setRooms: (rooms: Room[]) => void;
  setBazi: (bazi: BaziData | null) => void;
  setReport: (report: ReportData | null) => void;
  reset: () => void;
}

const defaultRooms: Room[] = [
  { id: '1', name: '客厅', label: '客厅' },
  { id: '2', name: '主卧', label: '主卧' },
  { id: '3', name: '厨房', label: '厨房' },
  { id: '4', name: '卫生间', label: '卫生间' },
];

export const useAppStore = create<AppState>((set) => ({
  uploadedImage: null,
  doorPosition: null,
  doorDirection: null,
  rooms: defaultRooms,
  bazi: null,
  report: null,

  setUploadedImage: (image) => set({ uploadedImage: image }),
  setDoorPosition: (pos) => set({ doorPosition: pos }),
  setDoorDirection: (dir) => set({ doorDirection: dir }),
  setRooms: (rooms) => set({ rooms }),
  setBazi: (bazi) => set({ bazi }),
  setReport: (report) => set({ report }),
  reset: () =>
    set({
      uploadedImage: null,
      doorPosition: null,
      doorDirection: null,
      rooms: defaultRooms,
      bazi: null,
      report: null,
    }),
}));
