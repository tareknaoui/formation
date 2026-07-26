"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { MessageCircle, Menu, X, Sparkles, User, LogIn, LogOut, Video, ShieldAlert } from "lucide-react";

export function Navbar() {
  const { data: session } = useSession();
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
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="text-slate-300 hover:text-white transition-colors">
              Accueil
            </Link>
            <Link href="/#formations" className="text-slate-300 hover:text-[#FFB703] transition-colors">
              Formations & Tarifs
            </Link>
            <Link href="/#methode" className="text-slate-300 hover:text-white transition-colors">
              La Méthode
            </Link>
            <Link href="/#reservation" className="text-[#FFB703] hover:underline flex items-center gap-1">
              <Sparkles className="w-4 h-4" />
              Réserver
            </Link>
          </nav>

          {/* User Auth & Actions */}
          <div className="hidden md:flex items-center gap-3">
            {session ? (
              <div className="flex items-center gap-3">
                {session.user?.role === "ADMIN" && (
                  <Link
                    href="/admin"
                    className="px-3 py-2 rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-300 hover:bg-purple-600/30 text-xs font-bold flex items-center gap-1.5 transition"
                  >
                    <ShieldAlert className="w-4 h-4 text-purple-400" />
                    Admin
                  </Link>
                )}
                
                <Link
                  href="/profile"
                  className="px-3.5 py-2 rounded-xl bg-[#161F33] border border-[#2A364F] text-slate-200 hover:text-white hover:border-[#FFB703] text-xs font-bold flex items-center gap-2 transition"
                >
                  <User className="w-4 h-4 text-[#FFB703]" />
                  <span>Mon Espace Vidéos</span>
                </Link>

                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="p-2 rounded-xl bg-[#161F33] border border-[#2A364F] text-slate-400 hover:text-red-400 hover:border-red-500/30 text-xs font-bold transition"
                  title="Déconnexion"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/auth/signin"
                  className="px-4 py-2 rounded-xl bg-[#161F33] border border-[#2A364F] text-slate-200 hover:text-white hover:border-[#FFB703] text-xs font-bold flex items-center gap-1.5 transition"
                >
                  <LogIn className="w-4 h-4 text-[#FFB703]" />
                  Se connecter
                </Link>
                
                <Link
                  href="/auth/signup"
                  className="px-4 py-2 rounded-xl btn-gold text-xs font-bold flex items-center gap-1.5 transition"
                >
                  S&apos;inscrire
                </Link>
              </div>
            )}

            <a
              href={`https://wa.me/${coachWhatsappNumber}?text=Bonjour%20Coach,%20je%20souhaite%20des%20informations%20sur%20vos%20cours%20de%20mandarin`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-[#06D6A0]/10 border border-[#06D6A0]/30 text-[#06D6A0] hover:bg-[#06D6A0]/20 text-xs font-bold flex items-center gap-2 transition"
              title="Contacter le Coach"
            >
              <MessageCircle className="w-4.5 h-4.5 fill-current" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {session ? (
              <Link
                href="/profile"
                className="p-2 rounded-xl bg-[#161F33] text-[#FFB703] border border-[#2A364F]"
              >
                <User className="w-5 h-5" />
              </Link>
            ) : (
              <Link
                href="/auth/signin"
                className="p-2 rounded-xl bg-[#161F33] text-slate-200 border border-[#2A364F]"
              >
                <LogIn className="w-5 h-5" />
              </Link>
            )}

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
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-[#161F33]"
          >
            Accueil
          </Link>
          <Link
            href="/#formations"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-[#FFB703] hover:bg-[#161F33]"
          >
            Formations & Tarifs (DA)
          </Link>
          <Link
            href="/#methode"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-[#161F33]"
          >
            La Méthode
          </Link>
          <Link
            href="/#reservation"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-[#D62828] hover:bg-[#161F33]"
          >
            Réserver un créneau
          </Link>

          <div className="pt-3 border-t border-[#2A364F] space-y-2">
            {session ? (
              <>
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#161F33] text-white font-bold text-sm flex items-center gap-2"
                >
                  <User className="w-4 h-4 text-[#FFB703]" />
                  Mon Espace & Mes Vidéos
                </Link>

                {session.user?.role === "ADMIN" && (
                  <Link
                    href="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full px-4 py-2.5 rounded-xl bg-purple-600/20 text-purple-300 font-bold text-sm flex items-center gap-2"
                  >
                    <ShieldAlert className="w-4 h-4" />
                    Panneau Administration
                  </Link>
                )}

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
                  className="w-full px-4 py-2.5 rounded-xl bg-red-500/10 text-red-400 font-bold text-sm flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Se déconnecter
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  href="/auth/signin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-[#161F33] border border-[#2A364F] text-slate-200 text-center font-bold text-sm flex items-center justify-center gap-2"
                >
                  <LogIn className="w-4 h-4 text-[#FFB703]" />
                  Connexion
                </Link>
                
                <Link
                  href="/auth/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl btn-gold text-center font-bold text-sm"
                >
                  Inscription
                </Link>
              </div>
            )}

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
        </div>
      )}
    </header>
  );
}

export default Navbar;

