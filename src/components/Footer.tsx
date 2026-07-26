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
    <footer className="bg-[#0A083B] text-slate-300 pt-16 pb-10 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-3 font-extrabold text-white text-lg">
              <span className="w-9 h-9 rounded-2xl bg-[#FA4949] flex items-center justify-center text-white font-black text-lg shadow-md">
                汉
              </span>
              <span>Le Chinois Vite & Bien</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              Plateforme de formation et coaching individuel en chinois mandarin pour étudiants, professionnels et commerçants en Algérie 🇩🇿.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-extrabold text-white text-sm mb-4 tracking-wide">Navigation</h4>
            <ul className="space-y-2.5 font-medium">
              <li><Link href="#hero" className="hover:text-[#FA4949] transition-colors">Accueil</Link></li>
              <li><Link href="#formations" className="hover:text-[#FA4949] transition-colors">Formations & Tarifs (DA)</Link></li>
              <li><Link href="#methode" className="hover:text-[#FA4949] transition-colors">Pédagogie & Méthode</Link></li>
              <li><Link href="#avis" className="hover:text-[#FA4949] transition-colors">Témoignages Élèves</Link></li>
              <li><Link href="#reservation" className="text-[#FA4949] hover:underline font-bold">Réservation de créneau</Link></li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-extrabold text-white text-sm mb-4 tracking-wide">Formations en DA</h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li><span className="text-white font-bold">Chinois Débutant (HSK 1-2)</span> - 6 500 DA</li>
              <li><span className="text-white font-bold">Mandarin Business</span> - 12 000 DA</li>
              <li><span className="text-white font-bold">Préparation HSK 3-4</span> - 9 500 DA</li>
              <li><span className="text-white font-bold">Coaching VIP 1-on-1</span> - 2 500 DA / h</li>
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
                className="flex items-center gap-2.5 text-slate-200 hover:text-emerald-400 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 fill-current" />
                <span>WhatsApp : +213 550 00 00 00</span>
              </a>

              <a
                href="https://www.instagram.com/le_chinois_vite_et_bien_dz/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-slate-200 hover:text-[#FA4949] transition-colors"
              >
                <InstagramIcon className="w-4 h-4 text-[#FA4949]" />
                <span>@le_chinois_vite_et_bien_dz</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-800 text-center flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 font-medium">
          <p>&copy; {new Date().getFullYear()} Le Chinois Vite et Bien DZ. Tous droits réservés.</p>
          <p className="flex items-center gap-1.5">
            Fait avec <Heart className="w-3.5 h-3.5 text-[#FA4949] fill-current" /> pour la communauté algérienne.
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;

