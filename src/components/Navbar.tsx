"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { GraduationCap, User, LogOut, LayoutDashboard, Search, Menu, X, CreditCard } from "lucide-react";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

// Small sub-component that uses searchParams, wrapped in Suspense below
function SearchInput({ isMobile, onSubmitSuccess }: { isMobile?: boolean; onSubmitSuccess?: () => void }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setSearchQuery(searchParams.get("search") || "");
  }, [searchParams]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push("/");
    }
    if (onSubmitSuccess) {
      onSubmitSuccess();
    }
  };

  if (isMobile) {
    return (
      <form onSubmit={handleSearchSubmit} className="relative w-full">
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-full bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-all duration-200"
        />
        <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
      </form>
    );
  }

  return (
    <form onSubmit={handleSearchSubmit} className="relative w-full">
      <input
        type="text"
        placeholder="Rechercher une formation..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-full bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 focus:bg-white text-sm transition-all duration-200 shadow-sm"
      />
      <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
    </form>
  );
}

/* Avatar initiales */
function UserAvatar({ name, email }: { name?: string | null; email?: string | null }) {
  const label = (name || email || "U").charAt(0).toUpperCase();
  return (
    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-md shadow-blue-500/20 shrink-0">
      {label}
    </div>
  );
}

export default function Navbar() {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const navLink = (href: string, label: string) => (
    <Link
      href={href}
      className={`font-medium text-sm transition duration-150 relative group ${
        isActive(href)
          ? "text-blue-600"
          : "text-slate-600 hover:text-blue-600"
      }`}
    >
      {label}
      <span
        className={`absolute -bottom-0.5 left-0 h-0.5 rounded-full bg-blue-600 transition-all duration-200 ${
          isActive(href) ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />
    </Link>
  );

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-slate-200/70 sticky top-0 z-50 shadow-sm shadow-slate-900/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition group">
              <div className="relative">
                <GraduationCap className="h-7 w-7 text-blue-600 group-hover:scale-110 transition-transform duration-200" />
                <div className="absolute -inset-1 bg-blue-600/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-200" />
              </div>
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-extrabold text-xl tracking-tight">
                Le Chinois Vite et Bien
              </span>
            </Link>
          </div>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <Suspense fallback={<div className="w-full h-9 bg-slate-100 rounded-full animate-pulse" />}>
              <SearchInput />
            </Suspense>
          </div>

          {/* Navigation & Auth */}
          <div className="hidden md:flex items-center gap-5">
            {navLink("/", "Catalogue")}

            {session ? (
              <>
                {navLink("/profile", "Profil")}
                {session.user.role === "ADMIN" ? (
                  <Link
                    href="/admin"
                    className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-3.5 py-1.5 rounded-full font-semibold text-xs uppercase tracking-wider flex items-center gap-1.5 transition duration-150 shadow-sm"
                  >
                    <LayoutDashboard className="h-3.5 w-3.5" />
                    Admin
                  </Link>
                ) : (
                  <Link
                    href="/subscribe"
                    className="text-slate-600 hover:text-blue-600 font-medium text-sm flex items-center gap-1 transition duration-150"
                  >
                    <CreditCard className="h-4 w-4" />
                    S'abonner
                  </Link>
                )}
                <div className="h-5 w-px bg-slate-200" />
                <div className="flex items-center gap-2.5">
                  <UserAvatar name={session.user.name} email={session.user.email} />
                  <div className="flex flex-col text-right">
                    <span className="text-slate-800 text-xs font-semibold max-w-[120px] truncate">
                      {session.user.name || session.user.email}
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                      {session.user.role}
                    </span>
                  </div>
                  <button
                    onClick={() => signOut({ callbackUrl: "/auth/signin" })}
                    className="text-slate-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-full transition-all duration-150"
                    title="Se déconnecter"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  className="text-slate-700 hover:text-blue-600 font-medium text-sm px-3 py-2 transition duration-150"
                >
                  Connexion
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-5 py-2 rounded-full shadow-md shadow-blue-600/20 hover:shadow-blue-600/30 hover:-translate-y-px transition-all duration-150"
                >
                  S'inscrire
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-600 hover:text-slate-900 focus:outline-none p-2 rounded-lg hover:bg-slate-100 transition duration-150"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white/98 backdrop-blur-md px-4 pt-3 pb-5 space-y-3.5 shadow-lg">
          <Suspense fallback={<div className="w-full h-10 bg-slate-100 rounded-full animate-pulse" />}>
            <SearchInput isMobile onSubmitSuccess={() => setMobileMenuOpen(false)} />
          </Suspense>

          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2.5 rounded-xl font-medium text-sm transition duration-150 ${
              isActive("/")
                ? "bg-blue-50 text-blue-600"
                : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
            }`}
          >
            Catalogue
          </Link>

          {session ? (
            <>
              <Link
                href="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-xl font-medium text-sm transition duration-150 ${
                  isActive("/profile")
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                }`}
              >
                Profil
              </Link>
              {session.user.role === "ADMIN" ? (
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-slate-700 hover:text-blue-600 hover:bg-slate-50 px-3 py-2.5 rounded-xl font-medium text-sm transition duration-150"
                >
                  Dashboard Administrateur
                </Link>
              ) : (
                <Link
                  href="/subscribe"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-slate-700 hover:text-blue-600 hover:bg-slate-50 px-3 py-2.5 rounded-xl font-medium text-sm transition duration-150"
                >
                  S'abonner
                </Link>
              )}
              <div className="border-t border-slate-100 my-2 pt-3">
                <div className="flex items-center justify-between px-3">
                  <div className="flex items-center gap-2.5">
                    <UserAvatar name={session.user.name} email={session.user.email} />
                    <div className="flex flex-col max-w-[60%]">
                      <span className="text-slate-800 font-semibold text-sm truncate">
                        {session.user.name || session.user.email}
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase">
                        {session.user.role}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      signOut({ callbackUrl: "/auth/signin" });
                    }}
                    className="text-red-600 hover:bg-red-50 px-3 py-2 rounded-xl font-semibold text-xs flex items-center gap-1.5 transition duration-150"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    Déconnexion
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
              <Link
                href="/auth/signin"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center text-slate-700 hover:bg-slate-50 border border-slate-200 font-medium py-2 rounded-full text-sm transition duration-150"
              >
                Connexion
              </Link>
              <Link
                href="/auth/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-full text-sm transition duration-150"
              >
                S'inscrire
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
