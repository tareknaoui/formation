"use client";

import Link from "next/link";
import { MessageCircle, Phone, Heart } from "lucide-react";

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
    <footer className="bg-[#0B0F19] border-t border-[#2A364F] pt-12 pb-8 text-[#94A3B8] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-bold text-white text-base">
              <span className="w-8 h-8 rounded-lg bg-[#D62828] flex items-center justify-center text-[#FFB703] font-bold text-sm">
                汉
              </span>
              <span>Le Chinois Vite & Bien DZ</span>
            </div>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Plateforme de formation et coaching individuel en chinois mandarin pour étudiants, professionnels et commerçants en Algérie 🇩🇿.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white text-sm mb-3">Navigation</h4>
            <ul className="space-y-2">
              <li><Link href="#hero" className="hover:text-white transition-colors">Accueil</Link></li>
              <li><Link href="#formations" className="hover:text-[#FFB703] transition-colors">Formations & Tarifs (DA)</Link></li>
              <li><Link href="#methode" className="hover:text-white transition-colors">Pédagogie & Méthode</Link></li>
              <li><Link href="#avis" className="hover:text-white transition-colors">Témoignages Élèves</Link></li>
              <li><Link href="#reservation" className="hover:text-[#D62828] transition-colors">Réservation de créneau</Link></li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-bold text-white text-sm mb-3">Formations en DA</h4>
            <ul className="space-y-2 text-xs">
              <li><span className="text-white">Chinois Débutant (HSK 1-2)</span> - 6 500 DA</li>
              <li><span className="text-white">Mandarin Business</span> - 12 000 DA</li>
              <li><span className="text-white">Préparation HSK 3-4</span> - 9 500 DA</li>
              <li><span className="text-white">Coaching VIP 1-on-1</span> - 2 500 DA / séance</li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-bold text-white text-sm mb-3">Contact Direct</h4>
            <div className="space-y-3">
              <a
                href={`https://wa.me/${coachWhatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white hover:text-[#FFB703] transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#06D6A0]" />
                <span>WhatsApp Coach : +213 550 00 00 00</span>
              </a>

              <a
                href="https://www.instagram.com/le_chinois_vite_et_bien_dz/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white hover:text-[#FFB703] transition-colors"
              >
                <InstagramIcon className="w-4 h-4 text-[#D62828]" />
                <span>@le_chinois_vite_et_bien_dz</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-[#2A364F]/60 text-center flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
          <p>&copy; {new Date().getFullYear()} Le Chinois Vite et Bien DZ. Tous droits réservés.</p>
          <p className="flex items-center gap-1">
            Fait avec <Heart className="w-3 h-3 text-[#D62828] fill-current" /> pour la communauté algérienne.
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;

