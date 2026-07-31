"use client";

import { useState } from "react";
import { Sparkles, MessageCircle, PlayCircle, CheckCircle, ArrowRight, Video, FileText, Infinity as InfinityIcon } from "lucide-react";
import { VideoModal } from "./VideoModal";

export function HeroSection() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const coachWhatsappNumber = "213550000000";

  return (
    <section id="hero" className="relative pt-12 pb-24 bg-[#0B0F19] text-white overflow-hidden">
      
      {/* Dynamic Animated Radial Orbs */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-red-600/15 rounded-full blur-[150px] pointer-events-none animate-glow-pulse" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Top Glowing Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 border border-red-500/30 text-xs font-black text-slate-200 shadow-xl backdrop-blur-md">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
              <span className="text-red-400 font-extrabold uppercase tracking-wider">Formation Autonome 🇩🇿🇨🇳</span>
              <span className="text-slate-400 font-normal">| Méthode Solo (自学)</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.12] tracking-tight">
              Apprenez le Mandarin <br className="hidden sm:block" />
              vite & efficacement.{" "}
              <span className="bg-gradient-to-r from-red-500 via-amber-400 to-red-400 bg-clip-text text-transparent block sm:inline">
                4 500 DA à vie.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              La méthode autonome n°1 en Algérie conçue pour parler chinois sans contrainte de temps. Vidéos HD, carnet d&apos;écriture PDF et accompagnement WhatsApp inclus.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs font-bold text-slate-200">
              <div className="flex items-center gap-2 bg-slate-900/80 px-3.5 py-2 rounded-xl border border-slate-800 backdrop-blur">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Accès illimité 24/7 à vie</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/80 px-3.5 py-2 rounded-xl border border-slate-800 backdrop-blur">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Paiement unique (CCP / BaridiMob)</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/80 px-3.5 py-2 rounded-xl border border-slate-800 backdrop-blur">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Support Coach WhatsApp</span>
              </div>
            </div>

            {/* Main Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#inscri"
                className="w-full sm:w-auto btn-primary px-8 py-4 text-sm sm:text-base font-extrabold flex items-center justify-center gap-3 shadow-xl hover:scale-[1.02] transition-all cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-white" />
                <span>S&apos;inscrire à 4 500 DA</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => setVideoModalOpen(true)}
                className="w-full sm:w-auto bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-red-500/40 rounded-full px-7 py-4 text-sm font-bold flex items-center justify-center gap-2.5 transition shadow-lg backdrop-blur cursor-pointer"
              >
                <PlayCircle className="w-5 h-5 text-red-400" />
                <span>Voir la vidéo démo</span>
              </button>
            </div>

          </div>

          {/* Right Column: Sleek Interactive Card Preview */}
          <div className="lg:col-span-5">
            <div className="glass-card-static p-8 border border-slate-800 bg-slate-900/90 shadow-2xl relative overflow-hidden group">
              
              {/* Top Card Badge */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-5 mb-6">
                <div>
                  <span className="text-[10px] font-black tracking-wider text-red-400 uppercase bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-full">
                    PACK COMPLET SOLO
                  </span>
                  <h3 className="text-xl font-black text-white mt-2">Méthode Autonome</h3>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black text-red-500">4 500 DA</div>
                  <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-widest block">
                    Paiement unique
                  </span>
                </div>
              </div>

              {/* Video Player Card Preview Trigger */}
              <div 
                onClick={() => setVideoModalOpen(true)}
                className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white rounded-2xl p-6 mb-6 border border-slate-800/80 shadow-inner relative cursor-pointer overflow-hidden group/video"
              >
                <div className="absolute inset-0 bg-red-600/10 opacity-0 group-hover/video:opacity-100 transition-opacity duration-300 pointer-events-none" />
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
                    Aperçu Espace Membre
                  </span>
                </div>

                <div className="text-center py-6">
                  <div className="text-5xl font-black text-amber-400 font-serif mb-1 group-hover/video:scale-110 transition-transform">
                    自学
                  </div>
                  <div className="text-xs text-slate-400 font-mono mb-4">
                    [zì xué] &bull; Apprentissage Autonome
                  </div>
                  
                  <div className="inline-flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 px-4 py-2.5 rounded-full text-xs font-extrabold border border-red-500/40 transition shadow-lg">
                    <PlayCircle className="w-4.5 h-4.5 text-red-400" />
                    Regarder un extrait de leçon (HD)
                  </div>
                </div>
              </div>

              {/* Quick Deliverable Summary */}
              <div className="space-y-2.5 text-xs text-slate-300 font-medium">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="flex items-center gap-2">
                    <Video className="w-4 h-4 text-red-400" /> Vidéos HD
                  </span>
                  <strong className="text-white font-bold">25+ Capsules HSK 1-3</strong>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-400" /> Support PDF
                  </span>
                  <strong className="text-white font-bold">Cahier d&apos;écriture Hanzi</strong>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="flex items-center gap-2">
                    <InfinityIcon className="w-4 h-4 text-amber-400" /> Accès
                  </span>
                  <strong className="text-emerald-400 font-bold">Illimité à vie 24/7</strong>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Video Modal Component */}
      <VideoModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
      />
    </section>
  );
}
