"use client";

import { Sparkles, MessageCircle, CheckCircle2, ShieldCheck, TrendingUp, Star } from "lucide-react";

export function HeroSection() {
  const coachWhatsappNumber = "213550000000";

  return (
    <section id="hero" className="relative pt-12 pb-24 overflow-hidden">
      
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#D62828]/20 to-[#FFB703]/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Instagram Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161F33] border border-[#2A364F] text-xs font-semibold text-white shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#06D6A0] animate-pulse" />
              <span>@le_chinois_vite_et_bien_dz</span>
              <span className="text-[#FFB703] font-bold">🇩🇿🇨🇳</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Apprenez le Mandarin{" "}
              <span className="animate-shimmer-red">Vite & Bien</span>{" "}
              en Algérie
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#94A3B8] max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              La méthode accélérée sur-mesure conçue pour les <strong className="text-white">étudiants, commerçants et professionnels algériens</strong>. Maîtrisez le pinyin, les dialogues essentiels et le vocabulaire du business sans perdre de temps.
            </p>

            {/* Value Props */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 max-w-lg mx-auto lg:mx-0">
              <div className="glass-card rounded-xl p-3 text-center border border-[#2A364F]">
                <span className="block font-bold text-[#FFB703] text-sm sm:text-base">100% Pratique</span>
                <span className="text-[11px] text-[#94A3B8]">Dès le 1er cours</span>
              </div>
              <div className="glass-card rounded-xl p-3 text-center border border-[#2A364F]">
                <span className="block font-bold text-[#06D6A0] text-sm sm:text-base">Tarifs en DA</span>
                <span className="text-[11px] text-[#94A3B8]">Paiement flexible</span>
              </div>
              <div className="glass-card rounded-xl p-3 text-center border border-[#2A364F] col-span-2 sm:col-span-1">
                <span className="block font-bold text-[#D62828] text-sm sm:text-base">Coaching 1-on-1</span>
                <span className="text-[11px] text-[#94A3B8]">Suivi personnalisé</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <a
                href="#reservation"
                className="w-full sm:w-auto btn-gold px-8 py-4 text-base font-extrabold flex items-center justify-center gap-3 shadow-xl hover:scale-105"
              >
                <Sparkles className="w-5 h-5 text-[#0B0F19]" />
                Réserver mon Coaching
              </a>

              <a
                href={`https://wa.me/${coachWhatsappNumber}?text=Bonjour%20Coach!%20Je%20souhaite%20m'informer%20sur%20les%20cours%20de%20mandarin.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto btn-primary px-8 py-4 text-base font-bold flex items-center justify-center gap-3 shadow-xl"
              >
                <MessageCircle className="w-5 h-5" />
                Parler au Coach
              </a>
            </div>

            {/* Social Trust Stats */}
            <div className="pt-6 flex items-center justify-center lg:justify-start gap-6 text-xs text-[#94A3B8] border-t border-[#2A364F]/50">
              <div className="flex items-center gap-1 text-[#FFB703]">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <span className="ml-1 text-white font-bold text-sm">4.9/5</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#06D6A0]" />
                <span>+2 700 Abonnés Instagram</span>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Coach Feature Card */}
          <div className="lg:col-span-5 relative">
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-[#2A364F] shadow-2xl relative">
              
              {/* Highlight Tag */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#FFB703] bg-[#FFB703]/10 px-3 py-1 rounded-full border border-[#FFB703]/30">
                  CHINOIS VITE ET BIEN DZ
                </span>
                <span className="text-xs text-[#94A3B8] font-mono">HSK 1-4 & Business</span>
              </div>

              {/* Chinese Calligraphy Accent Box */}
              <div className="rounded-2xl bg-gradient-to-br from-[#161F33] to-[#0B0F19] p-6 border border-[#2A364F] mb-6 text-center relative overflow-hidden group">
                <div className="absolute top-2 right-3 text-4xl opacity-10 font-bold select-none text-[#FFB703]">
                  你好
                </div>
                <div className="text-5xl font-extrabold text-[#D62828] mb-2 tracking-wide font-serif">
                  你好 (Nǐ Hǎo)
                </div>
                <p className="text-sm font-semibold text-white">
                  &quot;Apprendre le chinois rapidement et sans stress en Algérie&quot;
                </p>
              </div>

              {/* Feature Highlights */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#0B0F19]/80 border border-[#2A364F]">
                  <div className="w-8 h-8 rounded-lg bg-[#D62828]/20 flex items-center justify-center text-[#D62828]">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Méthode Accélérée</h4>
                    <p className="text-[11px] text-[#94A3B8]">Résultats visibles dès les 4 premières séances</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#0B0F19]/80 border border-[#2A364F]">
                  <div className="w-8 h-8 rounded-lg bg-[#FFB703]/20 flex items-center justify-center text-[#FFB703]">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Spécial Import-Export</h4>
                    <p className="text-[11px] text-[#94A3B8]">Phrases clés pour les négociations en Chine</p>
                  </div>
                </div>
              </div>

              {/* Direct Booking CTA Link inside card */}
              <div className="mt-6 pt-4 border-t border-[#2A364F] text-center">
                <a href="#reservation" className="text-xs font-bold text-[#FFB703] hover:underline flex items-center justify-center gap-1">
                  Voir les créneaux de coaching disponibles &rarr;
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
