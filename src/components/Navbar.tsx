"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageCircle, Menu, X, Sparkles, PhoneCall } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const coachWhatsappNumber = "213550000000"; // Can be replaced by actual coach WhatsApp number

  return (
    <header className="sticky top-0 z-50 glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#D62828] to-[#FFB703] p-0.5 shadow-lg shadow-[#D62828]/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0B0F19] rounded-[10px] flex items-center justify-center font-bold text-lg text-[#FFB703]">
                汉
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 font-bold text-lg text-white group-hover:text-[#FFB703] transition-colors">
                <span>Le Chinois Vite & Bien</span>
                <span className="bg-[#D62828] text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded uppercase">DZ 🇩🇿</span>
              </div>
              <span className="text-xs text-[#94A3B8]">Coaching Mandarin sur-mesure</span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#hero" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Accueil
            </Link>
            <Link href="#formations" className="text-sm font-medium text-slate-300 hover:text-[#FFB703] transition-colors">
              Formations & Tarifs (DA)
            </Link>
            <Link href="#methode" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              La Méthode
            </Link>
            <Link href="#avis" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Témoignages
            </Link>
            <Link href="#reservation" className="text-sm font-medium text-[#FFB703] hover:underline flex items-center gap-1">
              <Sparkles className="w-4 h-4" />
              Réserver
            </Link>
          </nav>

          {/* WhatsApp / Booking CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`https://wa.me/${coachWhatsappNumber}?text=Bonjour%20Coach,%20je%20souhaite%20des%20informations%20sur%20vos%20cours%20de%20mandarin`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold px-4 py-2.5 text-xs sm:text-sm flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-current text-[#0B0F19]" />
              Contacter le Coach
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-300 hover:text-white p-2"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-card border-x-0 border-b border-[#2A364F] px-4 pt-3 pb-6 space-y-3">
          <Link
            href="#hero"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-[#161F33]"
          >
            Accueil
          </Link>
          <Link
            href="#formations"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-[#FFB703] hover:bg-[#161F33]"
          >
            Formations & Tarifs (DA)
          </Link>
          <Link
            href="#methode"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-[#161F33]"
          >
            La Méthode
          </Link>
          <Link
            href="#avis"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-[#161F33]"
          >
            Témoignages
          </Link>
          <Link
            href="#reservation"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-[#D62828] hover:bg-[#161F33]"
          >
            Réserver un créneau
          </Link>
          <a
            href={`https://wa.me/${coachWhatsappNumber}?text=Bonjour%20Coach,%20je%20souhaite%20des%20informations%20sur%20vos%20cours%20de%20mandarin`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full btn-gold px-4 py-3 text-center flex items-center justify-center gap-2 mt-4"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            Contacter le Coach sur WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}

export default Navbar;
