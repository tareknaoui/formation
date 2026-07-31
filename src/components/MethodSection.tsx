"use client";

import { Target, MessageSquare, Flame, Smartphone, Clock, Sparkles } from "lucide-react";

export function MethodSection() {
  const points = [
    {
      icon: Target,
      title: "1. 100% Pratique & Utile",
      description: "Pas de théories compliquées inutiles. Vous apprenez les mots et phrases que vous allez réellement utiliser dans vos échanges quotidiens et professionnels."
    },
    {
      icon: MessageSquare,
      title: "2. Explication en Français & Darija",
      description: "Le coach explique les concepts phonétiques et grammaticaux avec des analogies locales pour une compréhension instantanée et naturelle."
    },
    {
      icon: Flame,
      title: "3. Spécial Négociation & Business",
      description: "Modules orientés opportunités : vocabulaire utile pour les commerçants, importateurs et voyageurs en Chine (Guangzhou, Yiwu, Pékin)."
    },
    {
      icon: Smartphone,
      title: "4. Suivi Direct par WhatsApp",
      description: "Un doute sur la prononciation ou un exercice ? Le coach répond directement à vos messages audio sur WhatsApp après votre inscription."
    }
  ];

  return (
    <section id="methode" className="py-24 bg-slate-950 text-slate-100 relative overflow-hidden border-t border-slate-900">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Pédagogie Éprouvée
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Pourquoi la méthode <span className="text-red-500">&quot;Vite & Bien&quot;</span> fait la différence
            </h2>
            
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Apprendre le chinois peut paraître intimidant en raison des tons et des sinogrammes (Hanzi). Notre approche autonome décompose chaque difficulté avec clarté et précision.
            </p>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Apprentissage à votre rythme</h4>
                  <p className="text-xs text-slate-400">Accédez à votre espace cours 24/7 sur téléphone, tablette ou ordinateur.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {points.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="glass-card-static p-6 border border-slate-800 bg-slate-900/70 hover:border-red-500/30 transition group">
                  <div className="w-11 h-11 rounded-2xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-400 mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-5.5 h-5.5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-red-400 transition-colors">{item.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
