"use client";

import { X, Play, Volume2, ShieldCheck, CheckCircle2 } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VideoModal({ isOpen, onClose }: VideoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl shadow-red-500/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center font-bold text-sm border border-red-500/30">
              汉
            </div>
            <div>
              <h4 className="text-sm font-black text-white">Extrait de Cours &bull; Méthode Solo</h4>
              <span className="text-[11px] text-slate-400">Leçon 1: Les Pinyins & Tons en Mandarin</span>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 flex items-center justify-center transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Container */}
        <div className="relative aspect-video bg-black flex items-center justify-center group overflow-hidden">
          {/* Simulated HTML5 Player Preview */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 z-10" />
          
          <div className="relative z-20 text-center space-y-4 max-w-md px-6">
            <div className="w-20 h-20 mx-auto rounded-full bg-red-600/90 hover:bg-red-500 text-white flex items-center justify-center shadow-xl shadow-red-600/40 cursor-pointer transform hover:scale-110 transition">
              <Play className="w-9 h-9 fill-current translate-x-0.5" />
            </div>
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-slate-200 backdrop-blur mb-2 border border-white/10">
                Aperçu Vidéo HD (1080p)
              </span>
              <h3 className="text-lg font-bold text-white">Comment prononcer les 4 tons du Mandarin</h3>
              <p className="text-xs text-slate-300 mt-1">Explications claires en Français & Darija avec exemples audio</p>
            </div>
          </div>

          {/* Bottom Bar Info */}
          <div className="absolute bottom-4 left-6 right-6 z-20 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-emerald-400" />
              <span>Audio studio HD</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-red-400" />
              <span>Méthode Vidéo Autonome</span>
            </div>
          </div>
        </div>

        {/* Modal Footer Features */}
        <div className="p-6 bg-slate-900/95 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold text-slate-300">
          <div className="flex items-center gap-2.5 bg-slate-800/50 p-3 rounded-xl border border-slate-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Explications adaptées au public algérien</span>
          </div>
          <div className="flex items-center gap-2.5 bg-slate-800/50 p-3 rounded-xl border border-slate-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Support de cours PDF téléchargeable</span>
          </div>
          <div className="flex items-center gap-2.5 bg-slate-800/50 p-3 rounded-xl border border-slate-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Accès illimité à vie (4 500 DA)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
