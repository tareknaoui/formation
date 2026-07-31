"use client";

import { Sparkles, MessageCircle, PlayCircle, CheckCircle } from "lucide-react";

export function HeroSection() {
  const coachWhatsappNumber = "213550000000";

  return (
    <section id="hero" className="relative pt-16 pb-24 bg-[#F8FAFC] overflow-hidden">
      
      {/* Subtle Background Accent */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Copy & Direct Action */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-bold text-[#0A083B]">
              <span className="w-2 h-2 rounded-full bg-[#FA4949]" />
              <span>Formation Unique &bull; Méthode Solo (自学)</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0A083B] leading-[1.15] tracking-tight">
              Maîtrisez le Mandarin <br className="hidden sm:block" />
              à votre rythme.{" "}
              <span className="text-[#FA4949] block sm:inline">
                4 500 DA à vie.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Une méthode 100% autonome pensée pour les Algériens. Manuel vidéo interactif, exercices progressifs et carnet d&apos;écriture PDF inclus.
            </p>

            {/* Highlight Bullets */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-bold text-slate-700">
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Accès illimité 24/7</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Zéro abonnement</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Mises à jour incluses</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#formation"
                className="w-full sm:w-auto btn-primary px-8 py-4 text-sm sm:text-base font-extrabold flex items-center justify-center gap-2.5 shadow-lg hover:scale-[1.02] transition-transform"
              >
                <Sparkles className="w-5 h-5 text-white" />
                Découvrir l&apos;Offre Solo (4 500 DA)
              </a>

              <a
                href={`https://wa.me/${coachWhatsappNumber}?text=Bonjour%20Coach!%20Je%20souhaite%20commander%20la%20Méthode%20Solo%20à%204500%20DA.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 rounded-full px-7 py-4 text-sm font-bold flex items-center justify-center gap-2.5 transition shadow-sm"
              >
                <MessageCircle className="w-5 h-5 text-emerald-600 fill-current" />
                Commander par WhatsApp
              </a>
            </div>

          </div>

          {/* Right Column: Clean Premium Course Card Visual */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl relative overflow-hidden">
              
              {/* Top Card Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-5 mb-6">
                <div>
                  <span className="text-[11px] font-extrabold tracking-wider text-[#FA4949] uppercase bg-red-50 px-3 py-1 rounded-full border border-red-100">
                    PACK COMPLET SOLO
                  </span>
                  <h3 className="text-xl font-black text-[#0A083B] mt-2">Méthode Autonome</h3>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-[#FA4949]">4 500 DA</div>
                  <span className="text-[11px] font-bold text-slate-500">paiement unique</span>
                </div>
              </div>

              {/* Course Preview Graphic */}
              <div className="bg-gradient-to-br from-slate-900 via-[#0A083B] to-slate-900 text-white rounded-2xl p-6 mb-6 shadow-inner relative group">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Aperçu Espace Membre</span>
                </div>

                <div className="text-center py-6">
                  <div className="text-4xl font-black text-amber-400 font-serif mb-1">
                    自学
                  </div>
                  <div className="text-xs text-slate-300 font-mono mb-4">
                    [zì xué] &bull; Apprentissage Autonome
                  </div>
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full text-xs font-bold text-white border border-white/10 group-hover:bg-white/20 transition">
                    <PlayCircle className="w-4 h-4 text-[#FA4949]" />
                    Accès immédiat aux vidéos HD
                  </div>
                </div>
              </div>

              {/* Direct Quick Specs */}
              <div className="space-y-2.5 text-xs text-slate-700 font-medium">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span>Format</span>
                  <strong className="text-[#0A083B] font-bold">Vidéos + PDF + Exercices</strong>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span>Niveau</span>
                  <strong className="text-[#0A083B] font-bold">Débutant à Intermédiaire (HSK 1-2)</strong>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
