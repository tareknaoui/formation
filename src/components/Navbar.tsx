"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { MessageCircle, Menu, X, Sparkles, User, LogIn, LogOut, ShieldAlert, GraduationCap } from "lucide-react";

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
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 p-0.5 shadow-lg shadow-red-500/25 group-hover:scale-105 transition-transform flex items-center justify-center border border-red-400/30">
              <span className="font-extrabold text-xl text-white">
                汉
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2 font-black text-lg text-white tracking-tight group-hover:text-red-400 transition-colors">
                <span>Le Chinois Vite & Bien</span>
                <span className="bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">DZ 🇩🇿</span>
              </div>
              <span className="text-xs text-slate-400 font-medium">Formation Mandarin Autonome</span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-bold">
            <Link href="#hero" className="text-slate-300 hover:text-white transition-colors">
              Accueil
            </Link>
            <Link href="#syllabes" className="text-slate-300 hover:text-red-400 transition-colors">
              Programme HSK
            </Link>
            <Link href="#coach" className="text-slate-300 hover:text-red-400 transition-colors">
              Le Coach
            </Link>
            <Link href="#methode" className="text-slate-300 hover:text-red-400 transition-colors">
              Méthode Solo
            </Link>
            <Link href="#inscri" className="text-red-400 hover:text-red-300 flex items-center gap-1.5 font-black bg-red-500/10 px-3.5 py-1.5 rounded-full border border-red-500/20">
              <Sparkles className="w-4 h-4 text-red-400" />
              4 500 DA à vie
            </Link>
          </nav>

          {/* User Auth & Actions */}
          <div className="hidden md:flex items-center gap-3">
            {session ? (
              <div className="flex items-center gap-3">
                {session.user?.role === "ADMIN" && (
                  <Link
                    href="/admin"
                    className="px-3.5 py-2 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 hover:bg-purple-500/25 text-xs font-bold flex items-center gap-1.5 transition"
                  >
                    <ShieldAlert className="w-4 h-4 text-purple-400" />
                    Admin
                  </Link>
                )}
                
                <Link
                  href="/profile"
                  className="px-4 py-2.5 rounded-full bg-slate-800/80 border border-slate-700 text-slate-200 hover:border-red-500/50 hover:text-white text-xs font-bold flex items-center gap-2 transition shadow-sm"
                >
                  <GraduationCap className="w-4 h-4 text-red-400" />
                  <span>Mon Espace Cours</span>
                </Link>

                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="p-2.5 rounded-full bg-slate-800/80 border border-slate-700 text-slate-400 hover:text-red-400 hover:border-red-500/40 text-xs font-bold transition"
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
                  <LogIn className="w-4 h-4 text-red-400" />
                  Espace Membre
                </Link>
              </div>
            )}

            <a
              href={`https://wa.me/${coachWhatsappNumber}?text=Bonjour%20Coach,%20je%20souhaite%20m'inscrire%20à%20la%20Formation%20Mandarin%20Solo%20(4500%20DA)`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/25 text-xs font-bold flex items-center gap-2 transition shadow-sm"
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
                className="p-2 rounded-full bg-slate-800 text-red-400 border border-slate-700"
              >
                <User className="w-5 h-5" />
              </Link>
            ) : (
              <Link
                href="/auth/signin"
                className="p-2 rounded-full bg-slate-800 text-slate-200 border border-slate-700"
              >
                <LogIn className="w-5 h-5" />
              </Link>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-200 hover:text-white p-2"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0F172A]/95 backdrop-blur-xl border-b border-slate-800 px-5 pt-4 pb-6 space-y-3 shadow-2xl">
          <Link
            href="#hero"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-base font-bold text-slate-200 hover:bg-slate-800"
          >
            Accueil
          </Link>
          <Link
            href="#syllabes"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-base font-semibold text-slate-200 hover:bg-slate-800"
          >
            Programme HSK (1 à 3)
          </Link>
          <Link
            href="#coach"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-base font-semibold text-slate-200 hover:bg-slate-800"
          >
            Le Coach
          </Link>
          <Link
            href="#inscri"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-base font-black text-red-400 bg-red-500/10 border border-red-500/20"
          >
            S&apos;inscrire à 4 500 DA
          </Link>

          <div className="pt-4 border-t border-slate-800 space-y-3">
            {session ? (
              <>
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full px-4 py-3 rounded-full bg-slate-800 text-white font-bold text-sm flex items-center justify-center gap-2 border border-slate-700"
                >
                  <User className="w-4 h-4 text-red-400" />
                  Mon Espace & Mes Vidéos
                </Link>

                {session.user?.role === "ADMIN" && (
                  <Link
                    href="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full px-4 py-3 rounded-full bg-purple-500/20 text-purple-300 font-bold text-sm flex items-center justify-center gap-2 border border-purple-500/30"
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
                  className="w-full px-4 py-3 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 font-bold text-sm flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Se déconnecter
                </button>
              </>
            ) : (
              <div className="grid grid-cols-1 gap-3 pt-1">
                <Link
                  href="/auth/signin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-full btn-secondary text-center font-bold text-sm flex items-center justify-center gap-2"
                >
                  <LogIn className="w-4 h-4 text-red-400" />
                  Connexion Espace Membre
                </Link>
              </div>
            )}

            <a
              href={`https://wa.me/${coachWhatsappNumber}?text=Bonjour%20Coach,%20je%20souhaite%20m'inscrire%20à%20la%20Formation%20Mandarin%20Solo%20(4500%20DA)`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white rounded-full px-4 py-3 text-center flex items-center justify-center gap-2 font-bold text-sm shadow-lg shadow-emerald-600/20"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              S&apos;inscrire par WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;


