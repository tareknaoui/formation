"use client";

import { Video, FileText, CheckCircle2, RefreshCw, Infinity as InfinityIcon, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

export function CoursesSection() {
  const coachWhatsappNumber = "213550000000";

  const FEATURES = [
    {
      title: "Manuel complet avec vidéos HD",
      desc: "Des explications détaillées pas à pas pour maîtriser la prononciation pinyin et les 4 tons sans difficulté.",
      icon: Video,
      badge: "Vidéos 4K"
    },
    {
      title: "Exercices progressifs",
      desc: "Pratiquez après chaque leçon avec des exercices interactifs pour fixer vos connaissances.",
      icon: CheckCircle2,
      badge: "Pratique"
    },
    {
      title: "Carnet d'écriture (PDF)",
      desc: "Fiches téléchargeables et imprimables pour apprendre à tracer les caractères chinois (Sinogrammes).",
      icon: FileText,
      badge: "PDF Imprimable"
    },
    {
      title: "Accès à vie au contenu",
      desc: "Étudiez sans pression à votre propre rythme, accessible 24/7 sur smartphone, tablette et ordinateur.",
      icon: InfinityIcon,
      badge: "À vie"
    },
    {
      title: "Mises à jour gratuites",
      desc: "Bénéficiez de tous les nouveaux modules, vidéos et exercices ajoutés au fil du temps sans surcoût.",
      icon: RefreshCw,
      badge: "Inclus"
    }
  ];

  return (
    <section id="formation" className="py-24 bg-white relative">
      <div id="inclus" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-100 text-[#FA4949] text-xs font-black uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Programme Spécial &bull; Offre Unique
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#0A083B] tracking-tight leading-tight">
            Méthode Solo <span className="text-[#FA4949] font-serif">(自学)</span>
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
            Tout ce dont vous avez besoin pour apprendre le mandarin efficacement depuis l&apos;Algérie, réuni dans un seul pack complet et accessible.
          </p>
        </div>

        {/* Master Offer Card (Centered Focal Point) */}
        <div className="bg-[#F8FAFC] rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl mb-16 relative overflow-hidden">
          
          {/* Top Banner inside Card */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 pb-8 mb-10">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-[#FA4949] bg-white px-3.5 py-1.5 rounded-full border border-slate-200 shadow-sm">
                Formule Complète Autonome
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#0A083B] mt-3">
                Pack Apprentissage Autonome
              </h3>
              <p className="text-sm text-slate-500 font-medium mt-1">
                Conçu pour avancer à votre propre rythme sans contraintes de temps.
              </p>
            </div>

            {/* Big Price Tag */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md text-center md:text-right shrink-0">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Tarif Unique</div>
              <div className="flex items-baseline justify-center md:justify-end gap-2">
                <span className="text-4xl sm:text-5xl font-black text-[#FA4949]">4 500 DA</span>
              </div>
              <div className="text-xs font-extrabold text-emerald-600 mt-1">Accès à vie &bull; Zéro frais cachés</div>
            </div>
          </div>

          {/* 5 Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {FEATURES.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-[#FA4949]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                      {feat.badge}
                    </span>
                  </div>
                  <h4 className="text-base font-extrabold text-[#0A083B] mb-2">{feat.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">{feat.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Master CTA Bar */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="flex items-center gap-3 text-xs text-slate-600 font-semibold">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Paiement sécurisé par CCP, BaridiMob ou directement sur WhatsApp.</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href="#inscription"
                className="w-full sm:w-auto btn-primary px-8 py-4 text-sm font-extrabold flex items-center justify-center gap-2 shadow-md hover:scale-[1.02] transition"
              >
                Obtenir l&apos;accès à 4 500 DA <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
