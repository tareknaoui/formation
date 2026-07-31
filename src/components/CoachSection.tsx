"use client";

import { Award, MessageCircle, ShieldCheck, Heart, Sparkles, CheckCircle2, GraduationCap } from "lucide-react";

export function CoachSection() {
  const coachWhatsappNumber = "213550000000";

  return (
    <section id="coach" className="py-24 bg-slate-950 text-slate-100 relative overflow-hidden border-t border-slate-900">
      
      {/* Glow Orbs */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Coach Avatar & Credentials Badge */}
          <div className="lg:col-span-5 text-center">
            <div className="relative inline-block">
              {/* Glowing Outer Ring */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-red-500 via-amber-500 to-emerald-500 opacity-30 blur-lg" />
              
              <div className="relative bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-sm mx-auto shadow-2xl">
                {/* Avatar Symbol */}
                <div className="w-28 h-28 mx-auto rounded-2xl bg-gradient-to-tr from-red-600 to-amber-500 p-1 mb-6 shadow-xl shadow-red-500/20">
                  <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-4xl font-extrabold text-white">
                    🇨🇳
                  </div>
                </div>

                <h3 className="text-xl font-black text-white tracking-tight">Coach Reda</h3>
                <span className="text-xs font-bold text-red-400 block mt-0.5 font-mono">
                  @le_chinois_vite_et_bien_dz
                </span>

                <div className="mt-4 pt-4 border-t border-slate-800 space-y-2 text-xs text-slate-300 text-left">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Diplômé en Langue & Civilisation Chinoise</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>5+ Ans d&apos;Expérience d&apos;Enseignement en Algérie</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-red-400 shrink-0" />
                    <span>+1 200 Élèves Algériens Accompagnés</span>
                  </div>
                </div>

                <div className="mt-6">
                  <a
                    href={`https://wa.me/${coachWhatsappNumber}?text=Bonjour%20Coach!%20J'ai%20une%20question%20sur%20votre%20formation.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/25 text-xs font-bold flex items-center justify-center gap-2 transition"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    Parler directement au Coach
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Mission */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> À Propos du Formateur
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              « Ma mission : Rendre le Mandarin accessible et gratifiant pour tous les Algériens. »
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Pendant des années, apprendre le chinois en Algérie était réservé à ceux qui pouvaient payer des écoles coûteuses à Alger ou voyager à l&apos;étranger. 
              J&apos;ai conçu la <strong>Méthode Solo (4 500 DA)</strong> spécifiquement pour éliminer ces barrières.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
                <div className="w-8 h-8 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1">Explications Simples</h4>
                <p className="text-xs text-slate-400">
                  Pas de jargon académique lourd. Des analogies concrètes en français et darija pour assimiler la grammaire facilement.
                </p>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1">Orienté Pratique & Business</h4>
                <p className="text-xs text-slate-400">
                  Idéal si vous préparez vos études en Chine, vos voyages d&apos;affaires à Guangzhou ou l&apos;examen officiel HSK.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Assistance par WhatsApp directe avec le coach après inscription.</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
