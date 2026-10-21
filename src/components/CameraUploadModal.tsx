import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Camera, Image as ImageIcon, Sparkles, RefreshCw, ArrowLeft, Check, AlertCircle } from 'lucide-react';
import { DailyMission } from '../types';

interface CameraUploadModalProps {
  mission: DailyMission;
  onVerifyPhoto: (imageBase64: string, mimeType: string) => void;
  onBack: () => void;
}

export const CameraUploadModal: React.FC<CameraUploadModalProps> = ({
  mission,
  onVerifyPhoto,
  onBack,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [base64Data, setBase64Data] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('image/jpeg');
  const [isDragging, setIsDragging] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg('画像ファイル（JPEG, PNG等）を選択してください');
      return;
    }

    setErrorMsg(null);
    setMimeType(file.type || 'image/jpeg');

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreviewUrl(result);
      setBase64Data(result);
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileChange(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleStartCheck = () => {
    if (!base64Data) {
      setErrorMsg('写真を選択または撮影してください');
      return;
    }
    onVerifyPhoto(base64Data, mimeType);
  };

  const handleResetPhoto = () => {
    setPreviewUrl(null);
    setBase64Data(null);
    setErrorMsg(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl border border-sky-100 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-sky-50 via-teal-50 to-emerald-50 border-b border-sky-100 flex items-center justify-between">
          <button
            onClick={onBack}
            className="p-1.5 rounded-full bg-white text-slate-600 hover:bg-slate-100 shadow-sm transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="text-center">
            <span className="text-[10px] font-black text-sky-600 tracking-widest uppercase block">
              PHOTO MISSION
            </span>
            <h2 className="text-sm font-extrabold text-slate-800">
              {mission.name}を撮影
            </h2>
          </div>
          <div className="w-7" />
        </div>

        {/* Content Area */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {/* Mission Instruction Card */}
          <div className="bg-sky-50/80 border border-sky-100 rounded-2xl p-3.5 flex items-center gap-3">
            <div className="text-3xl shrink-0">{mission.icon}</div>
            <div>
              <div className="text-xs font-extrabold text-slate-800">
                {mission.title}
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">
                {mission.hint}
              </p>
            </div>
          </div>

          {/* Photo Capture / Preview Box */}
          {previewUrl ? (
            <div className="relative rounded-2xl overflow-hidden border-2 border-sky-200 bg-slate-950 aspect-[4/3] flex items-center justify-center group shadow-inner">
              <img
                src={previewUrl}
                alt="Captured bath item preview"
                className="w-full h-full object-contain"
              />
              <button
                onClick={handleResetPhoto}
                className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm flex items-center gap-1.5 transition-all shadow-md"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                撮り直す
              </button>
            </div>
          ) : (
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all aspect-[4/3] flex flex-col items-center justify-center ${
                isDragging
                  ? 'border-sky-500 bg-sky-50/70'
                  : 'border-slate-200 hover:border-sky-300 bg-slate-50/50'
              }`}
            >
              <div className="w-14 h-14 rounded-2xl bg-sky-100/80 text-sky-600 flex items-center justify-center mb-3 shadow-inner">
                <Camera className="w-7 h-7" />
              </div>
              <p className="text-sm font-extrabold text-slate-700">
                写真を撮影またはアップロード
              </p>
              <p className="text-xs text-slate-400 mt-1 max-w-[220px]">
                お風呂で使ったアイテムを枠内に収めて撮影してください
              </p>

              {/* Action Buttons */}
              <div className="flex gap-2.5 mt-4 w-full max-w-xs">
                {/* Direct Camera Button (Mobile) */}
                <button
                  type="button"
                  onClick={() => cameraInputRef.current?.click()}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-sm transition-all"
                >
                  <Camera className="w-4 h-4" />
                  カメラ起動
                </button>
                {/* File Picker Button (PC/Gallery) */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-sm transition-all"
                >
                  <ImageIcon className="w-4 h-4 text-slate-500" />
                  写真を選択
                </button>
              </div>

              {/* Hidden Inputs */}
              <input
                type="file"
                ref={cameraInputRef}
                accept="image/*"
                capture="environment"
                onChange={handleInputChange}
                className="hidden"
              />
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleInputChange}
                className="hidden"
              />
            </div>
          )}

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        {/* Footer Action */}
        <div className="p-4 bg-slate-50 border-t border-slate-100">
          <motion.button
            whileHover={previewUrl ? { scale: 1.02 } : {}}
            whileTap={previewUrl ? { scale: 0.98 } : {}}
            onClick={handleStartCheck}
            disabled={!previewUrl}
            className={`w-full py-3.5 px-5 rounded-2xl font-black text-base flex items-center justify-center gap-2 transition-all shadow-md ${
              previewUrl
                ? 'bg-gradient-to-r from-sky-500 to-teal-400 text-white shadow-sky-400/30 hover:shadow-sky-400/50'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Sparkles className="w-5 h-5" />
            <span>この写真でチェック！</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};
