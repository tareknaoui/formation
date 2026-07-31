"use client";

import { useState } from "react";
import { BookOpen, Video, FileText, CheckCircle2, ChevronRight, Sparkles, Layers, Award } from "lucide-react";

interface ModuleItem {
  id: string;
  title: string;
  hanzi: string;
  pinyin: string;
  lessonsCount: number;
  duration: string;
  hasPdf: boolean;
  topics: string[];
}

const HSK_LEVELS = [
  {
    id: "hsk1",
    level: "HSK 1",
    subtitle: "Fondations & Survie Autonome",
    description: "Maîtrisez les 150 mots essentiels, les 4 tons pinyins, et les salutations courantes pour dialoguer en Chine.",
    badge: "Débutant Absolu",
    modules: [
      {
        id: "m1",
        title: "Pinyin, Système Phonétique & Tons",
        hanzi: "拼音与声调",
        pinyin: "Pīnyīn yǔ shēngdiào",
        lessonsCount: 6,
        duration: "1h 45m",
        hasPdf: true,
        topics: ["Les 4 tons indispensables", "Voyelles & Consonnes chinoises", "Erreurs courantes d'accent"],
      },
      {
        id: "m2",
        title: "Salutations, Présentation & Politesse",
        hanzi: "问候与自我介绍",
        pinyin: "Wènhòu yǔ zìwǒ jièshào",
        lessonsCount: 8,
        duration: "2h 10m",
        hasPdf: true,
        topics: ["Se présenter en mandarin", "Comprendre '你好' et '谢谢'", "Poser des questions simples"],
      },
      {
        id: "m3",
        title: "Nombres, Date, Heure & Prix",
        hanzi: "数字与时间",
        pinyin: "Shùzì yǔ shíjiān",
        lessonsCount: 7,
        duration: "1h 55m",
        hasPdf: true,
        topics: ["Compter de 1 à 99 999", "Négocier et demander les prix", "Exprimer la date et l'heure"],
      },
    ],
  },
  {
    id: "hsk2",
    level: "HSK 2",
    subtitle: "Conversation Courante & Commerce",
    description: "Enrichissez votre vocabulaire de 300 mots supplémentaires pour échanger avec des fournisseurs, voyager et gérer vos achats.",
    badge: "Intermédiaire",
    modules: [
      {
        id: "m4",
        title: "Shopping, Achats & Négociation",
        hanzi: "购物与讨价还价",
        pinyin: "Gòuwù yǔ tǎojiàhuánjià",
        lessonsCount: 9,
        duration: "2h 30m",
        hasPdf: true,
        topics: ["Vocabulaire import/export", "Exprimer la quantité & la taille", "Phrases clés pour les marchés à Guangzhou"],
      },
      {
        id: "m5",
        title: "Déplacements, Transports & Hôtels",
        hanzi: "出行与住宿",
        pinyin: "Chūxíng yǔ zhùsù",
        lessonsCount: 7,
        duration: "2h 05m",
        hasPdf: true,
        topics: ["Commander un Taxi / Didi", "Prendre le train / métro en Chine", "Réservation d'hôtel et check-in"],
      },
      {
        id: "m6",
        title: "Restauration & Gastronomie Chinoise",
        hanzi: "饮食与点菜",
        pinyin: "Yǐnshí yǔ diǎncài",
        lessonsCount: 6,
        duration: "1h 40m",
        hasPdf: true,
        topics: ["Lire une carte de restaurant", "Commander à boire et à manger", "Exprimer les goûts et allergies"],
      },
    ],
  },
  {
    id: "hsk3",
    level: "HSK 3",
    subtitle: "Fluidité Professionnelle & Autonomie",
    description: "Atteignez 600 mots de vocabulaire. Exprimez vos sentiments, argumentez vos idées et devenez 100% indépendant.",
    badge: "Avancé Pratíque",
    modules: [
      {
        id: "m7",
        title: "Grammaire Avancée & Connecteurs",
        hanzi: "语法与关联词",
        pinyin: "Yǔfǎ yǔ guānliáncí",
        lessonsCount: 10,
        duration: "3h 15m",
        hasPdf: true,
        topics: ["Structure des phrases complexes", "Exprimer la cause, la conséquence et le contraste", "Nuances de ton"],
      },
      {
        id: "m8",
        title: "Communication Business & WeChat",
        hanzi: "商务与微信交流",
        pinyin: "Shāngwù yǔ wēixìn jiāoliú",
        lessonsCount: 8,
        duration: "2h 45m",
        hasPdf: true,
        topics: ["Rédiger des messages WeChat prof", "Vocabulaire des affaires & contrats", "Étiquette et culture business chinoise"],
      },
    ],
  },
];

export function SyllabusSection() {
  const [activeTab, setActiveTab] = useState("hsk1");
  const currentLevel = HSK_LEVELS.find((l) => l.id === activeTab) || HSK_LEVELS[0];

  return (
    <section id="syllabes" className="py-24 bg-[#0B0F19] text-slate-100 relative overflow-hidden">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-black uppercase tracking-wider">
            <Layers className="w-4 h-4 text-red-400" /> Programme Complet HSK (1 à 3)
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Un programme structuré pas à pas.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Chaque module combine des capsules vidéo HD explicatives, des fiches de vocabulaire en Pinyin et Hanzi, et un carnet d&apos;écriture PDF téléchargeable.
          </p>
        </div>

        {/* Level Tabs Header */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md">
            {HSK_LEVELS.map((lvl) => {
              const isActive = activeTab === lvl.id;
              return (
                <button
                  key={lvl.id}
                  onClick={() => setActiveTab(lvl.id)}
                  className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-300 flex items-center gap-2 ${
                    isActive
                      ? "bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-500/25"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  <Award className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-500"}`} />
                  <span>{lvl.level}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${isActive ? "bg-white/20 text-white" : "bg-slate-800 text-slate-400"}`}>
                    {lvl.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Level Content */}
        <div className="glass-card-static p-6 sm:p-10 border border-slate-800/80 bg-slate-900/70">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-8 mb-8 gap-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-2xl sm:text-3xl font-black text-red-500">{currentLevel.level}</span>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  {currentLevel.subtitle}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-2xl">
                {currentLevel.description}
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-300 shrink-0">
              <div className="flex items-center gap-1.5 bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-700">
                <Video className="w-4 h-4 text-red-400" />
                <span>25+ Leçons Vidéos HD</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-700">
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>PDF d&apos;écriture inclus</span>
              </div>
            </div>
          </div>

          {/* Modules List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentLevel.modules.map((mod) => (
              <div key={mod.id} className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-6 hover:border-red-500/40 transition group flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 font-mono">
                      {mod.duration} &bull; {mod.lessonsCount} cours
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
                  </div>

                  <div className="mb-4">
                    <div className="text-xl font-black text-amber-400 font-serif mb-0.5">
                      {mod.hanzi}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono italic mb-2">
                      {mod.pinyin}
                    </div>
                    <h4 className="text-base font-bold text-white group-hover:text-red-400 transition-colors">
                      {mod.title}
                    </h4>
                  </div>

                  <div className="space-y-2 mb-6 text-xs text-slate-300">
                    {mod.topics.map((t, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-900 flex items-center justify-between text-xs font-semibold text-slate-400">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <BookOpen className="w-3.5 h-3.5 text-red-400" /> Exercices pratiques
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-white group-hover:translate-x-1 transition" />
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Banner */}
          <div className="mt-10 p-5 rounded-2xl bg-gradient-to-r from-red-500/10 via-slate-900 to-emerald-500/10 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-200">
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
              <span>Inclus avec la <strong>Méthode Solo (4 500 DA)</strong> : accès illimité 24/7 à tous les modules + mises à jour futures gratuit.</span>
            </div>
            <a
              href="#inscri"
              className="px-6 py-2.5 rounded-full btn-primary text-xs font-bold shrink-0 flex items-center gap-1.5"
            >
              Rejoindre la formation
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
