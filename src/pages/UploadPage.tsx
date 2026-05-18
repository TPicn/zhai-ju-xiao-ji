import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import InkBackground from '../components/ui/InkBackground';
import InkButton from '../components/ui/InkButton';
import BottomNav from '../components/ui/BottomNav';
import CompassWheel from '../components/compass/CompassWheel';
import FengShuiRuler from '../components/instruments/FengShuiRuler';
import { useAppStore, type Room, type BaziData } from '../store/useAppStore';
import type { Direction } from '../config/theme';

type Step = 'upload' | 'annotate' | 'bazi';

export default function UploadPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState<Step>('upload');
  const [dragOver, setDragOver] = useState(false);

  const {
    uploadedImage,
    setUploadedImage,
    doorDirection,
    setDoorDirection,
    rooms,
    setRooms,
    bazi,
    setBazi,
  } = useAppStore();

  const [baziForm, setBaziForm] = useState<BaziData>(bazi || { year: 1990, month: 1, day: 1, hour: 12 });

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedImage(url);
      setStep('annotate');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setUploadedImage(url);
      setStep('annotate');
    }
  };

  const handleDirectionSelect = (dir: Direction) => {
    setDoorDirection(dir.label);
  };

  const handleRoomLabelChange = (id: string, newLabel: string) => {
    setRooms(rooms.map((r) => (r.id === id ? { ...r, label: newLabel } : r)));
  };

  const handleStartAnalysis = () => {
    navigate('/loading');
  };

  const handleSkipBazi = () => {
    setBazi(null);
    navigate('/loading');
  };

  return (
    <InkBackground>
      <div className="min-h-dvh px-4 sm:px-6 py-6 sm:py-8 max-w-lg mx-auto pb-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/')}
            className="text-ink-light hover:text-ink transition-colors text-sm"
          >
            ← 首页
          </button>
          <h2 className="text-ink text-lg font-bold">落墨</h2>
          <div className="w-10" />
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Upload */}
          {step === 'upload' && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex flex-col items-center"
            >
              {/* Upload area with brush stroke border */}
              <div
                className={`w-full aspect-[4/3] border-2 border-dashed rounded-lg flex flex-col items-center justify-center gap-4 cursor-pointer transition-colors duration-300 ${
                  dragOver ? 'border-cinnabar bg-cinnabar/5' : 'border-ink-pale/40 hover:border-ink-pale/60'
                }`}
                style={{
                  borderImage:
                    'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22%3E%3Ccircle cx=%2210%22 cy=%2210%22 r=%221.5%22 fill=%22%23BFB8AF%22 opacity=%220.4%22/%3E%3C/svg%3E") 10 repeat',
                }}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
              >
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  className="text-ink-pale"
                >
                  <path
                    d="M24 8C24 8 12 16 12 28C12 34.6274 17.3726 40 24 40C30.6274 40 36 34.6274 36 28C36 16 24 8 24 8Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M24 20V32M18 26H30"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <p
                  className="text-ink-light text-sm sm:text-base"
                  style={{
                    fontFamily: "'ZCOOL KuaiLe', 'Ma Shan Zheng', 'STXingkai', cursive",
                  }}
                >
                  以图入宅
                </p>
                <p className="text-ink-pale text-xs">点击或拖拽户型图至此</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageSelect}
                />
              </div>

              {/* Decorative ruler */}
              <div className="mt-8 opacity-25">
                <FengShuiRuler width={240} />
              </div>

              {/* Bottom action buttons */}
              <div className="flex items-center gap-8 mt-10">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="w-14 h-14 rounded-full bg-silk border border-ink-pale/30 flex items-center justify-center group-hover:border-ink-pale/60 transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-ink-light">
                      <rect x="4" y="6" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </div>
                  <span className="text-ink-light text-xs">拍照</span>
                </button>

                <div className="w-px h-10 bg-ink-pale/30" />

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="w-14 h-14 rounded-full bg-silk border border-ink-pale/30 flex items-center justify-center group-hover:border-ink-pale/60 transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-ink-light">
                      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M3 15L8 10L12 14L16 8L21 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-ink-light text-xs">从相册选择</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Annotate */}
          {step === 'annotate' && uploadedImage && (
            <motion.div
              key="annotate"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex flex-col gap-6"
            >
              {/* Image preview with simulated brush stroke overlay */}
              <div className="relative rounded-lg overflow-hidden border border-ink-pale/30">
                <img src={uploadedImage} alt="户型图" className="w-full aspect-[4/3] object-contain bg-silk" />
                {/* Simulated cinnabar brush stroke overlay */}
                <svg
                  className="absolute inset-0 pointer-events-none"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <rect
                    x="5"
                    y="5"
                    width="90"
                    height="90"
                    rx="3"
                    fill="none"
                    stroke="#C43A31"
                    strokeWidth="0.5"
                    strokeDasharray="3 2"
                    opacity="0.5"
                  />
                </svg>
              </div>

              {/* Compass */}
              <div className="bg-silk rounded-lg p-6 border border-ink-pale/20">
                <CompassWheel onSelect={handleDirectionSelect} selected={doorDirection} />
              </div>

              {/* Room labels */}
              <div className="bg-silk rounded-lg p-4 border border-ink-pale/20">
                <p className="text-ink-light text-sm mb-3 text-center">确认各房间用途</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {rooms.map((room) => (
                    <div key={room.id} className="flex items-center gap-2">
                      <span className="text-ink text-sm w-12">{room.name}</span>
                      <input
                        type="text"
                        value={room.label}
                        onChange={(e) => handleRoomLabelChange(room.id, e.target.value)}
                        className="flex-1 bg-parchment border border-ink-pale/30 rounded px-2 py-1 text-sm text-ink-heavy focus:outline-none focus:border-ink-pale/60"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Next: go to bazi (optional) */}
              <div className="flex gap-4">
                <InkButton variant="outline" onClick={() => setStep('bazi')} className="flex-1">
                  添加八字（可选）
                </InkButton>
                <InkButton onClick={handleStartAnalysis} className="flex-1">
                  开始分析
                </InkButton>
              </div>
            </motion.div>
          )}

          {/* Step 3: Bazi (optional) */}
          {step === 'bazi' && (
            <motion.div
              key="bazi"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex flex-col gap-6"
            >
              <div className="bg-silk rounded-lg p-6 border border-ink-pale/20">
                <p
                  className="text-ink text-lg text-center mb-6"
                  style={{
                    fontFamily: "'ZCOOL KuaiLe', 'Ma Shan Zheng', 'STXingkai', cursive",
                  }}
                >
                  八字命理
                </p>
                <p className="text-ink-light text-sm text-center mb-6">
                  输入出生信息，系统将结合八字给出更精准的"宅命相配"建议
                </p>

                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="text-ink-light text-xs mb-1 block">出生年</label>
                    <input
                      type="number"
                      value={baziForm.year}
                      onChange={(e) =>
                        setBaziForm({ ...baziForm, year: parseInt(e.target.value) || 1990 })
                      }
                      className="w-full bg-parchment border border-ink-pale/30 rounded px-3 py-2 text-sm text-ink-heavy focus:outline-none focus:border-ink-pale/60"
                      placeholder="1990"
                    />
                  </div>
                  <div>
                    <label className="text-ink-light text-xs mb-1 block">出生月</label>
                    <input
                      type="number"
                      value={baziForm.month}
                      onChange={(e) =>
                        setBaziForm({ ...baziForm, month: parseInt(e.target.value) || 1 })
                      }
                      min={1}
                      max={12}
                      className="w-full bg-parchment border border-ink-pale/30 rounded px-3 py-2 text-sm text-ink-heavy focus:outline-none focus:border-ink-pale/60"
                      placeholder="1"
                    />
                  </div>
                  <div>
                    <label className="text-ink-light text-xs mb-1 block">出生日</label>
                    <input
                      type="number"
                      value={baziForm.day}
                      onChange={(e) =>
                        setBaziForm({ ...baziForm, day: parseInt(e.target.value) || 1 })
                      }
                      min={1}
                      max={31}
                      className="w-full bg-parchment border border-ink-pale/30 rounded px-3 py-2 text-sm text-ink-heavy focus:outline-none focus:border-ink-pale/60"
                      placeholder="1"
                    />
                  </div>
                  <div>
                    <label className="text-ink-light text-xs mb-1 block">出生时辰（时）</label>
                    <input
                      type="number"
                      value={baziForm.hour}
                      onChange={(e) =>
                        setBaziForm({ ...baziForm, hour: parseInt(e.target.value) || 12 })
                      }
                      min={0}
                      max={23}
                      className="w-full bg-parchment border border-ink-pale/30 rounded px-3 py-2 text-sm text-ink-heavy focus:outline-none focus:border-ink-pale/60"
                      placeholder="12"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <InkButton variant="outline" onClick={handleSkipBazi} className="flex-1">
                  跳过
                </InkButton>
                <InkButton
                  onClick={() => {
                    setBazi(baziForm);
                    navigate('/loading');
                  }}
                  className="flex-1"
                >
                  确认并开始分析
                </InkButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <BottomNav />
      </div>
    </InkBackground>
  );
}
