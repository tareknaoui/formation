import { Star, Quote, CheckCircle2 } from "lucide-react";

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

interface Testimonial {
  name: string;
  role: string;
  location: string;
  comment: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Yassine B.",
    role: "Importateur Textile",
    location: "Alger 🇩🇿",
    comment: "Grâce au module Business, j'ai pu passer mes premières commandes directement sur WeChat avec les usines de Guangzhou sans traducteur !",
    rating: 5,
  },
  {
    name: "Amira K.",
    role: "Étudiante HSK 2",
    location: "Oran 🇩🇿",
    comment: "Le coach explique d'une façon tellement simple en français/darja qu'on retient la prononciation dès la première séance. Je recommande à 100%.",
    rating: 5,
  },
  {
    name: "Karim M.",
    role: "Commerçant Électronique",
    location: "Sétif 🇩🇿",
    comment: "Coaching VIP très efficace. Le coach s'adapte à nos horaires et m'a appris tout le vocabulaire des prix et de la négociation.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section id="avis" className="py-20 bg-[#0B0F19] relative border-t border-[#2A364F]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFB703]/10 border border-[#FFB703]/30 text-[#FFB703] text-xs font-bold uppercase tracking-wider mb-4">
            <InstagramIcon className="w-4 h-4 text-[#FFB703]" />
            Avis & Témoignages d&apos;Élèves
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Ce que disent nos apprenants en Algérie
          </h2>
          <p className="mt-3 text-[#94A3B8] text-sm sm:text-base">
            Des centaines d&apos;étudiants et commerçants ont accéléré leur apprentissage avec le coach.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div key={idx} className="glass-card rounded-2xl p-6 border border-[#2A364F] flex flex-col justify-between">
              <div>
                {/* Rating */}
                <div className="flex items-center gap-1 text-[#FFB703] mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <Quote className="w-8 h-8 text-[#D62828]/40 mb-3" />

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic mb-6">
                  &quot;{t.comment}&quot;
                </p>
              </div>

              <div className="pt-4 border-t border-[#2A364F] flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1">
                    {t.name}
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#06D6A0]" />
                  </h4>
                  <p className="text-[11px] text-[#94A3B8]">{t.role}</p>
                </div>
                <span className="text-xs text-[#FFB703] font-medium bg-[#FFB703]/10 px-2 py-0.5 rounded">
                  {t.location}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram Follow Callout */}
        <div className="mt-12 text-center p-6 rounded-2xl glass-card border border-[#2A364F] max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <InstagramIcon className="w-4 h-4 text-[#D62828]" />
              Suivez le coach sur Instagram
            </h4>
            <p className="text-xs text-[#94A3B8]">Astuces quotidiennes, vocabulaire et vidéos d&apos;apprentissage.</p>
          </div>
          <a
            href="https://www.instagram.com/le_chinois_vite_et_bien_dz/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold px-4 py-2 text-xs font-bold shrink-0 flex items-center gap-1"
          >
            @le_chinois_vite_et_bien_dz
          </a>
        </div>

      </div>
    </section>
  );
}
