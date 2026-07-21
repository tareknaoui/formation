"use client";

import { useState, useEffect } from "react";
import { Loader2, PlayCircle, AlertCircle } from "lucide-react";

interface VideoPlayerProps {
  videoUrl: string;
  onComplete: () => void;
  isCompleted: boolean;
  hasNext: boolean;
}

export function getGoogleDrivePreviewUrl(urlOrId: string): string {
  if (!urlOrId) return "";
  
  const trimmed = urlOrId.trim();
  
  // Test if it's already just a raw Google Drive ID
  const isIdOnly = /^[a-zA-Z0-9_-]{15,}$/.test(trimmed);
  if (isIdOnly) {
    return `https://drive.google.com/file/d/${trimmed}/preview`;
  }
  
  // Match standard link formats:
  // https://drive.google.com/file/d/1_5T73-7xHwFpBvKSwtZ1hS9xMec3gq9q/view
  const regD = /\/file\/d\/([a-zA-Z0-9_-]{15,})/;
  const matchD = trimmed.match(regD);
  if (matchD && matchD[1]) {
    return `https://drive.google.com/file/d/${matchD[1]}/preview`;
  }
  
  // Match alternative query formats:
  // https://drive.google.com/open?id=1_5T73-7xHwFpBvKSwtZ1hS9xMec3gq9q
  const regId = /[?&]id=([a-zA-Z0-9_-]{15,})/;
  const matchId = trimmed.match(regId);
  if (matchId && matchId[1]) {
    return `https://drive.google.com/file/d/${matchId[1]}/preview`;
  }
  
  return trimmed;
}

export default function VideoPlayer({
  videoUrl,
  onComplete,
  isCompleted,
  hasNext,
}: VideoPlayerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const previewUrl = getGoogleDrivePreviewUrl(videoUrl);
  
  useEffect(() => {
    // Reset loader state whenever the video URL changes
    setIsLoading(true);
  }, [videoUrl]);

  if (!videoUrl) {
    return (
      <div className="aspect-video w-full bg-slate-900 rounded-2xl flex flex-col items-center justify-center text-slate-400 p-6 border border-slate-800">
        <AlertCircle className="h-10 w-10 text-slate-500 mb-2" />
        <p className="text-sm font-semibold">Aucune vidéo associée à cette leçon.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Video Container */}
      <div className="relative aspect-video w-full bg-slate-950 rounded-2xl overflow-hidden shadow-lg border border-slate-200/50">
        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950 text-slate-400 z-10">
            <Loader2 className="h-8 w-8 text-blue-500 animate-spin mb-3" />
            <p className="text-xs tracking-wide">Chargement du lecteur Google Drive...</p>
          </div>
        )}

        <iframe
          src={previewUrl}
          title="Lecteur de cours"
          className="w-full h-full border-none"
          allow="autoplay; encrypted-media"
          allowFullScreen
          onLoad={() => setIsLoading(false)}
        />
      </div>

      {/* Completion Control Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-2xl border border-slate-100 shadow-sm gap-3">
        <div className="flex items-center gap-2">
          <div className={`h-2.5 w-2.5 rounded-full ${isCompleted ? "bg-emerald-500" : "bg-amber-400"}`}></div>
          <span className="text-xs font-semibold text-slate-500">
            Statut : {isCompleted ? "Complété" : "En cours de lecture"}
          </span>
        </div>

        <button
          onClick={onComplete}
          className={`w-full sm:w-auto font-bold text-sm px-6 py-2.5 rounded-xl shadow-sm transition-all duration-200 flex items-center justify-center gap-2 ${
            isCompleted
              ? "bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200"
              : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/10"
          }`}
        >
          <PlayCircle className="h-4.5 w-4.5" />
          {isCompleted ? (hasNext ? "Leçon complétée (Passer à la suite)" : "Marquer comme non complété") : (hasNext ? "Terminer & Leçon suivante" : "Terminer la formation")}
        </button>
      </div>
    </div>
  );
}
