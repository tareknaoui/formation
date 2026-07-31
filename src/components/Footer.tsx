"use client";

import Link from "next/link";
import { MessageCircle, Heart } from "lucide-react";

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

export function Footer() {
  const coachWhatsappNumber = "213550000000";

  return (
    <footer className="bg-[#0B0F19] text-slate-400 pt-16 pb-10 text-xs border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-3 font-extrabold text-white text-lg">
              <span className="w-10 h-10 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-red-500/20 border border-red-400/30">
                汉
              </span>
              <span className="tracking-tight">Le Chinois Vite & Bien</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              La méthode autonome de référence pour apprendre le mandarin en Algérie 🇩🇿. Vidéos HD, carnet d&apos;écriture PDF et soutien WhatsApp.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-extrabold text-white text-sm mb-4 tracking-wide">Navigation</h4>
            <ul className="space-y-2.5 font-medium">
              <li><Link href="#hero" className="hover:text-red-400 transition-colors">Accueil</Link></li>
              <li><Link href="#syllabes" className="hover:text-red-400 transition-colors">Programme HSK (1 à 3)</Link></li>
              <li><Link href="#coach" className="hover:text-red-400 transition-colors">À Propos du Coach</Link></li>
              <li><Link href="#methode" className="hover:text-red-400 transition-colors">La Méthode Solo</Link></li>
              <li><Link href="#inscri" className="text-red-400 hover:underline font-bold">Obtenir l&apos;Accès (4 500 DA)</Link></li>
            </ul>
          </div>

          {/* Offer Details */}
          <div>
            <h4 className="font-extrabold text-white text-sm mb-4 tracking-wide">Offre & Inclusions</h4>
            <ul className="space-y-2 text-xs font-medium text-slate-300">
              <li><span className="text-white font-bold">Pack Méthode Solo :</span> 4 500 DA</li>
              <li><span className="text-emerald-400 font-bold">Paiement unique :</span> CCP & BaridiMob</li>
              <li><span className="text-white font-bold">Durée :</span> Accès illimité à vie 24/7</li>
              <li><span className="text-white font-bold">Support :</span> Suivi direct WhatsApp</li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-extrabold text-white text-sm mb-4 tracking-wide">Contact Direct</h4>
            <div className="space-y-3 font-semibold">
              <a
                href={`https://wa.me/${coachWhatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-slate-300 hover:text-emerald-400 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 fill-current" />
                <span>WhatsApp : +213 550 00 00 00</span>
              </a>

              <a
                href="https://www.instagram.com/le_chinois_vite_et_bien_dz/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-slate-300 hover:text-red-400 transition-colors"
              >
                <InstagramIcon className="w-4 h-4 text-red-400" />
                <span>@le_chinois_vite_et_bien_dz</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-800/80 text-center flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-medium">
          <p>&copy; {new Date().getFullYear()} Le Chinois Vite & Bien DZ. Tous droits réservés.</p>
          <p className="flex items-center gap-1.5">
            Conçu avec <Heart className="w-3.5 h-3.5 text-red-500 fill-current" /> pour la communauté algérienne.
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
