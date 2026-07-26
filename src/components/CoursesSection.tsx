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
    <section id="formations" className="py-20 bg-[#0B0F19] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D62828]/10 border border-[#D62828]/30 text-[#D62828] text-xs font-bold uppercase tracking-wider mb-4">
            Programmes & Tarifs
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Nos Formations en Mandarin (en DA) 🇩🇿
          </h2>
          <p className="mt-4 text-[#94A3B8] text-base">
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
                className={`glass-card rounded-2xl p-6 flex flex-col justify-between relative transition-all duration-300 ${
                  course.highlighted
                    ? "border-[#FFB703] shadow-xl shadow-[#FFB703]/10 scale-[1.02] bg-[#161F33]"
                    : "border-[#2A364F]"
                }`}
              >
                {course.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#D62828] to-[#FFB703] text-[#0B0F19] text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-md">
                    <Sparkles className="w-3 h-3" /> Recommandé Business
                  </div>
                )}

                <div>
                  {/* Badge & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold tracking-wider px-2.5 py-1 rounded-full bg-[#0B0F19] text-[#FFB703] border border-[#2A364F]">
                      {course.badge}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#D62828]/10 flex items-center justify-center text-[#D62828]">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
                  <p className="text-xs text-[#94A3B8] mb-6 leading-relaxed">{course.subtitle}</p>

                  {/* Price */}
                  <div className="mb-6 p-3 rounded-xl bg-[#0B0F19]/60 border border-[#2A364F]">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-extrabold text-[#FFB703]">
                        {course.price}
                      </span>
                      <span className="text-xs text-[#94A3B8] font-medium">{course.period}</span>
                    </div>
                  </div>

                  {/* Feature list */}
                  <ul className="space-y-3 mb-8">
                    {course.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <Check className="w-4 h-4 text-[#06D6A0] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <a
                  href="#reservation"
                  className={`w-full py-3 rounded-xl font-bold text-xs sm:text-sm text-center transition-all flex items-center justify-center gap-2 ${
                    course.highlighted
                      ? "btn-gold"
                      : "btn-primary"
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
