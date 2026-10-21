import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Camera,
  Image as ImageIcon,
  Sparkles,
  RefreshCw,
  X,
  RotateCcw,
  Dice5,
  Bot,
  CheckCircle2,
  XCircle,
  Gift,
  History,
  AlertCircle,
  ChevronRight,
  Sparkle,
} from 'lucide-react';
import { DailyMission, MissionType, VerificationResult, PreviewTestHistoryItem } from '../types';
import { MISSIONS_LIST } from '../data/gameData';

interface PreviewPhotoTestModalProps {
  onClose: () => void;
  onClaimReward: (mission: DailyMission) => void;
  history: PreviewTestHistoryItem[];
  onAddHistory: (item: PreviewTestHistoryItem) => void;
}

export const PreviewPhotoTestModal: React.FC<PreviewPhotoTestModalProps> = ({
  onClose,
  onClaimReward,
  history,
  onAddHistory,
}) => {
  const [selectedMissionId, setSelectedMissionId] = useState<MissionType>('shampoo');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [base64Data, setBase64Data] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('image/jpeg');
  const [isDragging, setIsDragging] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showHistoryDetail, setShowHistoryDetail] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const currentMission = MISSIONS_LIST.find((m) => m.id === selectedMissionId) || MISSIONS_LIST[0];

  // Select a random mission
  const handleRandomizeMission = () => {
    const otherMissions = MISSIONS_LIST.filter((m) => m.id !== selectedMissionId);
    const randomPick = otherMissions[Math.floor(Math.random() * otherMissions.length)] || MISSIONS_LIST[0];
    setSelectedMissionId(randomPick.id);
    handleResetPhoto();
  };

  // Handle image upload / selection
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
      const res = e.target?.result as string;
      setPreviewUrl(res);
      setBase64Data(res);
      setResult(null); // Clear previous result on new photo
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

  const handleResetPhoto = () => {
    setPreviewUrl(null);
    setBase64Data(null);
    setResult(null);
    setErrorMsg(null);
  };

  // Run real Gemini Verification API call
  const handleVerify = async () => {
    if (!base64Data) {
      setErrorMsg('写真を撮影または選択してください');
      return;
    }

    setIsVerifying(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/verify-mission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageBase64: base64Data,
          mimeType: mimeType,
          missionId: currentMission.id,
          missionName: currentMission.name,
          targetKeyword: currentMission.targetKeyword,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const data: VerificationResult = await response.json();
      setResult(data);

      // Record to in-memory test history
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
      onAddHistory({
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        timestamp: timeStr,
        missionId: currentMission.id,
        missionName: currentMission.name,
        isMatch: data.isMatch,
        detectedObject: data.detectedObject,
        reason: data.reason || data.comment,
        comment: data.comment,
        confidence: data.confidence,
      });
    } catch (err: any) {
      console.error('Gemini test verification error:', err);
      setErrorMsg('うまく判定できませんでした。通信環境を確認してもう一度お試しください。');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-sky-200/80 overflow-hidden flex flex-col my-auto max-h-[94vh]"
      >
        {/* Header */}
        <div className="p-3.5 sm:p-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-white/20 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
            </span>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="font-black text-sm tracking-wide">
                  AI写真判定テスト
                </h2>
                <span className="bg-pink-400/30 text-pink-100 border border-pink-200/30 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                  PREVIEW MODE
                </span>
              </div>
              <p className="text-[10px] text-white/80 mt-0.5">
                何度でも撮影・Gemini画像判定を検証できます
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 active:scale-95 text-white transition-all"
            title="閉じる"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          {/* 1. Mission Target Selection */}
          <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-black text-slate-600 flex items-center gap-1">
                <span>🎯</span>
                <span>判定対象ミッションを選択</span>
              </span>
              <button
                onClick={handleRandomizeMission}
                className="flex items-center gap-1 text-[11px] font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200/60 px-2 py-0.5 rounded-lg active:scale-95 transition-all"
              >
                <Dice5 className="w-3.5 h-3.5" />
                <span>🎲 ランダムミッション</span>
              </button>
            </div>

            {/* Mission Selector Pills */}
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
              {MISSIONS_LIST.map((m) => {
                const isSelected = m.id === selectedMissionId;
                return (
                  <button
                    key={m.id}
                    onClick={() => {
                      setSelectedMissionId(m.id);
                      handleResetPhoto();
                    }}
                    className={`py-2 px-1 rounded-xl text-center font-black text-xs transition-all flex flex-col items-center gap-0.5 border ${
                      isSelected
                        ? 'bg-gradient-to-b from-indigo-500 to-purple-600 text-white border-indigo-400 shadow-md ring-2 ring-indigo-200'
                        : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    <span className="text-base">{m.icon}</span>
                    <span className="text-[11px] leading-tight truncate max-w-full">
                      {m.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Current Target Instruction Description */}
            <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="text-xl shrink-0">{currentMission.icon}</span>
                <div>
                  <span className="font-extrabold text-slate-800 block">
                    「{currentMission.name}」を撮影してください
                  </span>
                  <span className="text-[10px] text-slate-500 block">
                    対象: {currentMission.targetKeyword}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Photo Capture / Preview Box */}
          {!result && !isVerifying && (
            <div>
              {previewUrl ? (
                /* Image Preview Mode */
                <div className="space-y-3">
                  <div className="relative rounded-2xl overflow-hidden border-2 border-indigo-200 bg-slate-950 aspect-[4/3] flex items-center justify-center shadow-inner group">
                    <img
                      src={previewUrl}
                      alt="Preview test"
                      className="w-full h-full object-contain"
                    />
                    <button
                      onClick={handleResetPhoto}
                      className="absolute top-3 right-3 bg-black/70 hover:bg-black/90 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm flex items-center gap-1.5 transition-all shadow-md active:scale-95"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>撮り直す</span>
                    </button>
                  </div>

                  {/* AI Judgment Trigger Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleVerify}
                    className="w-full py-3.5 px-5 rounded-2xl font-black text-base flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all cursor-pointer"
                  >
                    <Sparkles className="w-5 h-5 text-amber-300" />
                    <span>AIに判定してもらう</span>
                  </motion.button>
                </div>
              ) : (
                /* No Photo Upload/Capture Zone */
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all aspect-[4/3] flex flex-col items-center justify-center ${
                    isDragging
                      ? 'border-indigo-500 bg-indigo-50/70'
                      : 'border-slate-300 hover:border-indigo-400 bg-slate-50/50'
                  }`}
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-100 to-purple-100 text-indigo-600 flex items-center justify-center mb-3 shadow-inner">
                    <Camera className="w-7 h-7" />
                  </div>
                  <p className="text-sm font-extrabold text-slate-800">
                    「{currentMission.name}」の写真を撮影
                  </p>
                  <p className="text-xs text-slate-400 mt-1 max-w-[240px]">
                    スマホはカメラ起動、PCは写真選択またはドラッグ＆ドロップ
                  </p>

                  {/* Dual Action Buttons */}
                  <div className="flex gap-2.5 mt-4 w-full max-w-xs">
                    <button
                      type="button"
                      onClick={() => cameraInputRef.current?.click()}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 active:scale-95 text-white text-xs font-black flex items-center justify-center gap-1.5 shadow-sm transition-all"
                    >
                      <Camera className="w-4 h-4" />
                      <span>カメラ起動</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 active:scale-95 text-slate-700 text-xs font-black flex items-center justify-center gap-1.5 shadow-sm transition-all"
                    >
                      <ImageIcon className="w-4 h-4 text-slate-500" />
                      <span>写真を選択</span>
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
            </div>
          )}

          {/* 3. Scanning Animation (During Gemini API call) */}
          {isVerifying && (
            <div className="border-2 border-indigo-200 rounded-2xl p-8 text-center bg-slate-900 text-white aspect-[4/3] flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
              <div className="relative w-28 h-28 flex items-center justify-center mb-4">
                {/* Radar pulse rings */}
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.8, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                  className="absolute inset-0 rounded-full border-2 border-indigo-400 shadow-[0_0_25px_rgba(129,140,248,0.5)]"
                />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
                  className="absolute inset-2 rounded-full border border-dashed border-pink-400/70"
                />
                <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                  <Bot className="w-9 h-9 text-white animate-bounce" />
                </div>
              </div>

              <h3 className="text-base font-black text-white drop-shadow">
                AIが写真をチェックしています…
              </h3>
              <p className="text-xs text-indigo-200 mt-1">
                Geminiが「{currentMission.name}」を画像解析中
              </p>

              <div className="w-40 h-1.5 bg-slate-800 rounded-full overflow-hidden mt-4">
                <motion.div
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                  className="w-full h-full bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 rounded-full"
                />
              </div>
            </div>
          )}

          {/* 4. Verification Result (CLEAR vs FAILED) */}
          {result && !isVerifying && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              {result.isMatch ? (
                /* ================= SUCCESS CLEAR ================= */
                <div className="bg-emerald-50/90 border-2 border-emerald-300 rounded-2xl p-4 sm:p-5 text-center space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-black shadow-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>MISSION CLEAR!</span>
                  </div>

                  <h3 className="text-xl font-black text-slate-800">
                    {result.detectedObject || currentMission.name}を発見！✨
                  </h3>

                  {/* Gemini's Reason / Comment */}
                  <div className="bg-white/90 rounded-xl p-3 text-left border border-emerald-200 text-xs text-slate-700 space-y-1.5">
                    <div className="flex items-center gap-1 font-bold text-emerald-800">
                      <Sparkle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Geminiの判定理由:</span>
                    </div>
                    <p className="leading-relaxed pl-1 text-slate-700">
                      {result.reason || result.comment}
                    </p>
                    {result.comment && result.reason && result.comment !== result.reason && (
                      <p className="text-[11px] text-slate-500 pl-1 border-t border-slate-100 pt-1">
                        💬 {result.comment}
                      </p>
                    )}
                  </div>

                  {/* Action Buttons for Clear */}
                  <div className="space-y-2 pt-1">
                    {/* View Reward Animation */}
                    <button
                      onClick={() => onClaimReward(currentMission)}
                      className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:to-indigo-600 active:scale-95 text-white font-black text-sm shadow-md shadow-pink-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <Gift className="w-4 h-4" />
                      <span>報酬演出を見る（ガチャ・EXP獲得）</span>
                    </button>

                    {/* Retake & Test Another Grid */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={handleResetPhoto}
                        className="py-2.5 px-3 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 active:scale-95 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
                      >
                        <Camera className="w-3.5 h-3.5 text-indigo-600" />
                        <span>📸 もう一度撮影する</span>
                      </button>

                      <button
                        onClick={() => {
                          handleResetPhoto();
                          handleRandomizeMission();
                        }}
                        className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                      >
                        <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                        <span>別のミッションを試す</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* ================= FAILURE FAILED ================= */
                <div className="bg-amber-50/90 border-2 border-amber-300 rounded-2xl p-4 sm:p-5 text-center space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-600 text-white text-xs font-black shadow-sm">
                    <XCircle className="w-4 h-4" />
                    <span>MISSION FAILED</span>
                  </div>

                  <h3 className="text-lg font-black text-slate-800">
                    {currentMission.name}が見つからなかったみたい…
                  </h3>

                  {/* Gemini's Reason / Comment */}
                  <div className="bg-white/90 rounded-xl p-3 text-left border border-amber-200 text-xs text-slate-700 space-y-1.5">
                    <div className="flex items-center gap-1 font-bold text-amber-800">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                      <span>Geminiの判定結果:</span>
                    </div>
                    <p className="leading-relaxed pl-1 text-slate-700">
                      {result.reason || result.comment}
                    </p>
                    <p className="text-[11px] text-slate-500 pl-1 border-t border-slate-100 pt-1">
                      検出物体: <span className="font-bold text-slate-700">{result.detectedObject}</span>
                    </p>
                  </div>

                  {/* Helpful Tip */}
                  <p className="text-[11px] text-slate-500">
                    💡 {currentMission.hint}
                  </p>

                  {/* Action Buttons for Failure */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={handleResetPhoto}
                      className="py-3 px-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 active:scale-95 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
                    >
                      <Camera className="w-4 h-4" />
                      <span>📸 もう一度撮影する</span>
                    </button>

                    <button
                      onClick={() => {
                        handleResetPhoto();
                        handleRandomizeMission();
                      }}
                      className="py-3 px-3 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 active:scale-95 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                      <span>別のミッションを試す</span>
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Error Message */}
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* 5. In-Memory Test History Section (直近5件の判定履歴) */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
            <button
              onClick={() => setShowHistoryDetail(!showHistoryDetail)}
              className="w-full px-3.5 py-2.5 flex items-center justify-between text-left hover:bg-slate-100 transition-colors"
            >
              <div className="flex items-center gap-2">
                <History className="w-3.5 h-3.5 text-indigo-600" />
                <span className="text-xs font-black text-slate-700">
                  TEST HISTORY（判定履歴）
                </span>
                <span className="bg-slate-200 text-slate-700 text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full">
                  {history.length}件
                </span>
              </div>
              <ChevronRight
                className={`w-3.5 h-3.5 text-slate-400 transition-transform ${
                  showHistoryDetail ? 'rotate-90' : ''
                }`}
              />
            </button>

            {/* History List */}
            {history.length > 0 ? (
              <div className="p-2.5 pt-0 space-y-1.5">
                {history.slice(0, 5).map((item) => (
                  <div
                    key={item.id}
                    className={`p-2 rounded-xl text-xs flex items-start justify-between gap-2 border ${
                      item.isMatch
                        ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
                        : 'bg-amber-50/80 border-amber-200 text-amber-900'
                    }`}
                  >
                    <div className="space-y-0.5 flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span>{item.isMatch ? '✅' : '❌'}</span>
                        <span className="font-extrabold">{item.missionName}</span>
                        <span className="text-[10px] opacity-60 font-mono">
                          {item.timestamp}
                        </span>
                      </div>
                      <p className="text-[11px] opacity-80 truncate">
                        「{item.reason}」
                      </p>
                    </div>
                    <span
                      className={`text-[9px] font-black px-1.5 py-0.5 rounded shrink-0 ${
                        item.isMatch ? 'bg-emerald-200 text-emerald-800' : 'bg-amber-200 text-amber-800'
                      }`}
                    >
                      {item.isMatch ? 'CLEAR' : 'FAILED'}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-3.5 pb-3 text-[11px] text-slate-400">
                まだ写真テストの履歴がありません。上のボタンから撮影してAI判定を試してみてね！
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>※PREVIEW MODE内のデータは保存されません</span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 active:scale-95 text-slate-700 font-bold transition-all"
          >
            テスト画面を閉じる
          </button>
        </div>
      </motion.div>
    </div>
  );
};
