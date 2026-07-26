"use client";

import { Target, MessageSquare, Flame, Smartphone, Clock } from "lucide-react";

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
    <section id="methode" className="py-20 bg-white relative border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-black uppercase tracking-wider">
              Pourquoi cette méthode ?
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-black text-[#0A083B]">
              Pourquoi la méthode <span className="text-[#FA4949]">&quot;Vite et Bien&quot;</span> fonctionne en Algérie
            </h2>
            
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
              Apprendre le chinois peut sembler intimidant à cause des tons et des caractères. Notre pédagogie casse les barrières et se concentre sur l&apos;oral et l&apos;efficacité immédiate.
            </p>

            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/60">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-[#0A083B]">Séances flexibles d&apos;1 heure</h4>
                  <p className="text-xs text-slate-600">Compatible avec votre emploi du temps d&apos;étudiant ou de professionnel.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {points.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-[#F8FAFC] p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition">
                  <div className="w-10 h-10 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-[#FA4949] mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-extrabold text-[#0A083B] mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">{item.description}</p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
