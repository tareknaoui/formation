"use client";

import { Sparkles, MessageCircle, CheckCircle2, ShieldCheck, TrendingUp, Star } from "lucide-react";

export function HeroSection() {
  const coachWhatsappNumber = "213550000000";

  return (
    <section id="hero" className="relative pt-12 pb-20 bg-gradient-to-b from-white via-slate-50 to-[#F8FAFC] overflow-hidden">
      
      {/* Decorative Background Accents */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-[#FA4949]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#FFB703]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Instagram / Trust Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-slate-200 text-xs font-bold text-[#0A083B] shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>@le_chinois_vite_et_bien_dz</span>
              <span className="text-[#FA4949] font-black">🇩🇿🇨🇳</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#0A083B] leading-tight">
              Apprenez le Mandarin{" "}
              <span className="text-[#FA4949] underline decoration-[#FFB703] decoration-wavy decoration-2">
                Vite & Bien
              </span>{" "}
              en Algérie
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              La méthode accélérée sur-mesure conçue pour les <strong className="text-[#0A083B] font-semibold">étudiants, commerçants et professionnels algériens</strong>. Maîtrisez le pinyin, les dialogues essentiels et le vocabulaire du business sans perdre de temps.
            </p>

            {/* Value Props */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 pt-2 max-w-lg mx-auto lg:mx-0">
              <div className="bg-white rounded-2xl p-3.5 text-center border border-slate-200 shadow-sm">
                <span className="block font-bold text-[#FA4949] text-sm sm:text-base">100% Pratique</span>
                <span className="text-xs text-slate-500 font-medium">Dès le 1er cours</span>
              </div>
              <div className="bg-white rounded-2xl p-3.5 text-center border border-slate-200 shadow-sm">
                <span className="block font-bold text-emerald-600 text-sm sm:text-base">Tarifs en DA</span>
                <span className="text-xs text-slate-500 font-medium">Paiement flexible</span>
              </div>
              <div className="bg-white rounded-2xl p-3.5 text-center border border-slate-200 shadow-sm col-span-2 sm:col-span-1">
                <span className="block font-bold text-[#0A083B] text-sm sm:text-base">Coaching 1-on-1</span>
                <span className="text-xs text-slate-500 font-medium">Suivi personnalisé</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <a
                href="#reservation"
                className="w-full sm:w-auto btn-primary px-8 py-4 text-base font-extrabold flex items-center justify-center gap-3 shadow-lg hover:scale-105"
              >
                <Sparkles className="w-5 h-5 text-white" />
                Réserver mon Coaching
              </a>

              <a
                href={`https://wa.me/${coachWhatsappNumber}?text=Bonjour%20Coach!%20Je%20souhaite%20m'informer%20sur%20les%20cours%20de%20mandarin.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-8 py-4 text-base font-bold flex items-center justify-center gap-3 shadow-md transition"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                Parler au Coach
              </a>
            </div>

            {/* Social Trust Stats */}
            <div className="pt-6 flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 border-t border-slate-200">
              <div className="flex items-center gap-1.5 text-amber-500 font-bold">
                <div className="flex text-amber-400">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <span className="text-[#0A083B] font-extrabold text-sm ml-1">4.9/5</span>
              </div>
              <div className="flex items-center gap-2 font-semibold">
                <ShieldCheck className="w-4.5 h-4.5 text-emerald-600" />
                <span>+2 700 Abonnés Instagram</span>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Coach Feature Card */}
          <div className="lg:col-span-5 relative">
            <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-xl relative">
              
              {/* Highlight Tag */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-black uppercase tracking-wider text-[#FA4949] bg-red-50 px-3.5 py-1 rounded-full border border-red-100">
                  LE CHINOIS VITE ET BIEN DZ
                </span>
                <span className="text-xs text-slate-500 font-semibold bg-slate-100 px-2.5 py-1 rounded-full">HSK 1-4 & Business</span>
              </div>

              {/* Chinese Calligraphy Accent Box */}
              <div className="rounded-2xl bg-gradient-to-br from-red-50 via-white to-amber-50 p-6 border border-red-100 mb-6 text-center relative overflow-hidden group">
                <div className="absolute top-2 right-4 text-5xl opacity-10 font-bold select-none text-[#FA4949]">
                  你好
                </div>
                <div className="text-5xl font-black text-[#FA4949] mb-2 tracking-wide font-serif">
                  你好 (Nǐ Hǎo)
                </div>
                <p className="text-sm font-bold text-[#0A083B]">
                  &quot;Apprendre le chinois rapidement et sans stress en Algérie&quot;
                </p>
              </div>

              {/* Feature Highlights */}
              <div className="space-y-3">
                <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center text-[#FA4949]">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-[#0A083B]">Méthode Accélérée</h4>
                    <p className="text-[11px] text-slate-500">Résultats visibles dès les 4 premières séances</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-[#0A083B]">Spécial Import-Export</h4>
                    <p className="text-[11px] text-slate-500">Phrases clés pour les négociations en Chine</p>
                  </div>
                </div>
              </div>

              {/* Direct Booking CTA Link inside card */}
              <div className="mt-6 pt-4 border-t border-slate-100 text-center">
                <a href="#reservation" className="text-xs font-extrabold text-[#FA4949] hover:underline flex items-center justify-center gap-1">
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
