"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { MessageCircle, Menu, X, Sparkles, User, LogIn, LogOut, ShieldAlert } from "lucide-react";

export function Navbar() {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const coachWhatsappNumber = "213550000000";

  return (
    <header className="sticky top-0 z-50 glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-[#FA4949] p-0.5 shadow-md shadow-[#FA4949]/20 group-hover:scale-105 transition-transform flex items-center justify-center">
              <span className="font-extrabold text-xl text-white">
                汉
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2 font-black text-lg text-[#0A083B] group-hover:text-[#FA4949] transition-colors">
                <span>Le Chinois Vite & Bien</span>
                <span className="bg-[#FA4949] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">DZ 🇩🇿</span>
              </div>
              <span className="text-xs text-slate-500 font-medium">Coaching Mandarin sur-mesure</span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold">
            <Link href="/" className="text-slate-700 hover:text-[#FA4949] transition-colors">
              Accueil
            </Link>
            <Link href="/#formations" className="text-slate-700 hover:text-[#FA4949] transition-colors">
              Formations & Tarifs
            </Link>
            <Link href="/#methode" className="text-slate-700 hover:text-[#FA4949] transition-colors">
              La Méthode
            </Link>
            <Link href="/#reservation" className="text-[#FA4949] hover:underline flex items-center gap-1.5 font-bold">
              <Sparkles className="w-4 h-4" />
              Réserver un essai
            </Link>
          </nav>

          {/* User Auth & Actions */}
          <div className="hidden md:flex items-center gap-3">
            {session ? (
              <div className="flex items-center gap-3">
                {session.user?.role === "ADMIN" && (
                  <Link
                    href="/admin"
                    className="px-3.5 py-2 rounded-full bg-purple-100 border border-purple-200 text-purple-700 hover:bg-purple-200 text-xs font-bold flex items-center gap-1.5 transition"
                  >
                    <ShieldAlert className="w-4 h-4 text-purple-600" />
                    Admin
                  </Link>
                )}
                
                <Link
                  href="/profile"
                  className="px-4 py-2.5 rounded-full bg-slate-100 border border-slate-200 text-[#0A083B] hover:border-[#FA4949] hover:text-[#FA4949] text-xs font-bold flex items-center gap-2 transition"
                >
                  <User className="w-4 h-4 text-[#FA4949]" />
                  <span>Mon Espace Vidéos</span>
                </Link>

                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="p-2.5 rounded-full bg-slate-100 border border-slate-200 text-slate-500 hover:text-red-600 hover:border-red-200 text-xs font-bold transition"
                  title="Déconnexion"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <Link
                  href="/auth/signin"
                  className="px-4 py-2.5 rounded-full btn-secondary text-xs font-bold flex items-center gap-1.5"
                >
                  <LogIn className="w-4 h-4 text-[#FA4949]" />
                  Se connecter
                </Link>
                
                <Link
                  href="/auth/signup"
                  className="px-5 py-2.5 rounded-full btn-primary text-xs font-bold flex items-center gap-1.5"
                >
                  S&apos;inscrire
                </Link>
              </div>
            )}

            <a
              href={`https://wa.me/${coachWhatsappNumber}?text=Bonjour%20Coach,%20je%20souhaite%20des%20informations%20sur%20vos%20cours%20de%20mandarin`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 hover:bg-emerald-100 text-xs font-bold flex items-center gap-2 transition shadow-sm"
              title="Contacter le Coach sur WhatsApp"
            >
              <MessageCircle className="w-4.5 h-4.5 fill-current" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {session ? (
              <Link
                href="/profile"
                className="p-2 rounded-full bg-slate-100 text-[#FA4949] border border-slate-200"
              >
                <User className="w-5 h-5" />
              </Link>
            ) : (
              <Link
                href="/auth/signin"
                className="p-2 rounded-full bg-slate-100 text-[#0A083B] border border-slate-200"
              >
                <LogIn className="w-5 h-5" />
              </Link>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#0A083B] hover:text-[#FA4949] p-2"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-5 pt-4 pb-6 space-y-3 shadow-lg">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-base font-semibold text-[#0A083B] hover:bg-slate-50"
          >
            Accueil
          </Link>
          <Link
            href="/#formations"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-base font-semibold text-[#FA4949] hover:bg-slate-50"
          >
            Formations & Tarifs (DA)
          </Link>
          <Link
            href="/#methode"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-base font-semibold text-[#0A083B] hover:bg-slate-50"
          >
            La Méthode
          </Link>
          <Link
            href="/#reservation"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-base font-bold text-[#FA4949] hover:bg-red-50"
          >
            Réserver un essai
          </Link>

          <div className="pt-4 border-t border-slate-100 space-y-3">
            {session ? (
              <>
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full px-4 py-3 rounded-full bg-slate-100 text-[#0A083B] font-bold text-sm flex items-center justify-center gap-2"
                >
                  <User className="w-4 h-4 text-[#FA4949]" />
                  Mon Espace & Mes Vidéos
                </Link>

                {session.user?.role === "ADMIN" && (
                  <Link
                    href="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full px-4 py-3 rounded-full bg-purple-100 text-purple-700 font-bold text-sm flex items-center justify-center gap-2"
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
                  className="w-full px-4 py-3 rounded-full bg-red-50 text-red-600 font-bold text-sm flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Se déconnecter
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-3 pt-1">
                <Link
                  href="/auth/signin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-full btn-secondary text-center font-bold text-sm flex items-center justify-center gap-2"
                >
                  <LogIn className="w-4 h-4 text-[#FA4949]" />
                  Connexion
                </Link>
                
                <Link
                  href="/auth/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-full btn-primary text-center font-bold text-sm flex items-center justify-center"
                >
                  Inscription
                </Link>
              </div>
            )}

            <a
              href={`https://wa.me/${coachWhatsappNumber}?text=Bonjour%20Coach,%20je%20souhaite%20des%20informations%20sur%20vos%20cours%20de%20mandarin`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-600 text-white rounded-full px-4 py-3 text-center flex items-center justify-center gap-2 font-bold text-sm shadow-md"
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

