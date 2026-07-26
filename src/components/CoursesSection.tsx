"use client";

import { Check, Sparkles, BookOpen, Briefcase, Award, Users } from "lucide-react";

interface Course {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  icon: any;
  highlighted?: boolean;
}

const COURSES: Course[] = [
  {
    id: "debutant",
    badge: "HSK 1 - 2",
    title: "Chinois Débutant Express",
    subtitle: "Maîtrisez les bases du mandarin et la prononciation Pinyin.",
    price: "6 500 DA",
    period: "par niveau",
    description: "Apprenez les dialogues de la vie quotidienne, la prononciation exacte (4 tons) et les premiers caractères essentiels.",
    features: [
      "Prononciation & Pinyin sans accent",
      "Vocabulaire de conversation quotidienne",
      "Exercices pratiques audio & vidéo",
      "Support de cours PDF téléchargeables",
      "Groupe de révision WhatsApp"
    ],
    icon: BookOpen
  },
  {
    id: "business",
    badge: "BUSINESS & IMPORT",
    title: "Mandarin Business & Commerce",
    subtitle: "Pour commerçants, importateurs et hommes d'affaires.",
    price: "12 000 DA",
    period: "formation intensive",
    description: "Spécialement conçu pour négocier avec les fournisseurs chinois à Yiwu, Guangzhou ou Shanghai sans intermédiaire.",
    features: [
      "Vocabulaire commercial & négociation de prix",
      "Vocabulaire de douane, livraison & usines",
      "Formules de politesse et culture des affaires en Chine",
      "Simulation de négociations réelles",
      "Assistance directe du coach"
    ],
    icon: Briefcase,
    highlighted: true
  },
  {
    id: "hsk-avance",
    badge: "HSK 3 - 4",
    title: "Préparation Examens HSK",
    subtitle: "Perfectionnement grammatical et caractères complexes.",
    price: "9 500 DA",
    period: "par niveau",
    description: "Préparez la certification officielle HSK pour vos études en Chine ou opportunités professionnelles.",
    features: [
      "Lecture et écriture de 600+ sinogrammes",
      "Grammaire avancée et structures de phrases",
      "Simulations d'examens chronométrés",
      "Correction personnalisée par le coach",
      "Certification d'assiduité"
    ],
    icon: Award
  },
  {
    id: "vip-coaching",
    badge: "SUR-MESURE",
    title: "Coaching VIP 1-on-1",
    subtitle: "Accompagnement individuel personnalisé.",
    price: "2 500 DA",
    period: "par séance d'1h",
    description: "Une heure exclusive en tête-à-tête avec le coach pour répondre à vos questions et accélérer votre niveau.",
    features: [
      "Horaires flexibles selon vos disponibilités",
      "Programme 100% personnalisé à vos objectifs",
      "Pratique orale intensive en direct",
      "Feedback immédiat et exercices sur-mesure",
      "Suivi quotidien WhatsApp"
    ],
    icon: Users
  }
];

export function CoursesSection() {
  return (
    <section id="formations" className="py-20 bg-[#F8FAFC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-100 text-[#FA4949] text-xs font-black uppercase tracking-wider mb-4">
            Programmes & Tarifs
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0A083B]">
            Nos Formations en Mandarin (en DA) 🇩🇿
          </h2>
          <p className="mt-4 text-slate-600 text-base font-normal">
            Des programmes adaptés à votre rythme et vos objectifs. Choisissez la formule qui vous convient et réservez directement avec le coach.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {COURSES.map((course) => {
            const Icon = course.icon;
            return (
              <div
                key={course.id}
                className={`bg-white rounded-3xl p-7 flex flex-col justify-between relative transition-all duration-300 border shadow-md hover:shadow-xl ${
                  course.highlighted
                    ? "border-[#FA4949] ring-2 ring-[#FA4949]/20 scale-[1.02] bg-gradient-to-b from-red-50/30 to-white"
                    : "border-slate-200"
                }`}
              >
                {course.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#FA4949] text-white text-[11px] font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-md">
                    <Sparkles className="w-3.5 h-3.5" /> Recommandé Business
                  </div>
                )}

                <div>
                  {/* Badge & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[11px] font-extrabold tracking-wider px-3 py-1 rounded-full bg-slate-100 text-[#0A083B] border border-slate-200">
                      {course.badge}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-[#FA4949]">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl font-black text-[#0A083B] mb-2">{course.title}</h3>
                  <p className="text-xs text-slate-500 font-medium mb-6 leading-relaxed">{course.subtitle}</p>

                  {/* Price */}
                  <div className="mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-black text-[#FA4949]">
                        {course.price}
                      </span>
                      <span className="text-xs text-slate-500 font-bold">{course.period}</span>
                    </div>
                  </div>

                  {/* Feature list */}
                  <ul className="space-y-3 mb-8">
                    {course.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <a
                  href="#reservation"
                  className={`w-full py-3.5 rounded-full font-bold text-xs sm:text-sm text-center transition-all flex items-center justify-center gap-2 ${
                    course.highlighted
                      ? "btn-primary"
                      : "btn-secondary"
                  }`}
                >
                  S&apos;inscrire à cette formule
                </a>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
