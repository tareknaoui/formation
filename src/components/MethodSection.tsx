"use client";

import { Target, MessageSquare, Flame, CheckCircle, Smartphone, Clock } from "lucide-react";

export function MethodSection() {
  const points = [
    {
      icon: Target,
      title: "1. 100% Pratique & Utile",
      description: "Pas de théories compliquées inutiles. Vous apprenez les mots et phrases que vous allez réellement utiliser dans vos échanges."
    },
    {
      icon: MessageSquare,
      title: "2. Explication en Darja & Français",
      description: "Le coach explique les concepts complexes en adaptant au langage local pour une compréhension instantanée et naturelle."
    },
    {
      icon: Flame,
      title: "3. Spécial Négociation & Business",
      description: "Module exclusif dédié aux commerçants et importateurs pour commander directement en usine et négocier en Chine."
    },
    {
      icon: Smartphone,
      title: "4. Suivi Continu sur WhatsApp",
      description: "Accès au groupe privé avec exercices vocaux quotidiens, corrections de prononciation et fiches PDF."
    }
  ];

  return (
    <section id="methode" className="py-20 bg-[#0B0F19] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#06D6A0]/10 border border-[#06D6A0]/30 text-[#06D6A0] text-xs font-bold uppercase tracking-wider">
              Pourquoi cette méthode ?
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Pourquoi la méthode <span className="text-[#FFB703]">&quot;Vite et Bien&quot;</span> fonctionne en Algérie
            </h2>
            
            <p className="text-[#94A3B8] text-sm sm:text-base leading-relaxed">
              Apprendre le chinois peut sembler intimidant à cause des tons et des caractères. Notre pédagogie casse les barrières et se concentre sur l&apos;oral et l&apos;efficacité immédiate.
            </p>

            <div className="p-4 rounded-xl bg-[#161F33] border border-[#2A364F]">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#FFB703]" />
                <div>
                  <h4 className="text-sm font-bold text-white">Séances flexibles d&apos;1 heure</h4>
                  <p className="text-xs text-[#94A3B8]">Compatible avec votre emploi du temps d&apos;étudiant ou de professionnel.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {points.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="glass-card p-6 rounded-2xl border border-[#2A364F]">
                  <div className="w-10 h-10 rounded-xl bg-[#D62828]/10 flex items-center justify-center text-[#D62828] mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
