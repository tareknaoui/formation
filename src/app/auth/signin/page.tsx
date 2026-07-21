"use client";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import Link from "next/link";
import { GraduationCap, Loader2, ArrowRight } from "lucide-react";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (res?.error) {
        setError(res.error || "Email ou mot de passe incorrect.");
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      console.error(err);
      setError("Une erreur s'est produite lors de la connexion.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-dark py-8 px-6 shadow-2xl rounded-3xl sm:px-10">
      <form onSubmit={handleSubmit} className="space-y-5">
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold p-3.5 rounded-xl text-center animate-fade-in-up">
            {error}
          </div>
        )}

        {/* Email */}
        <div className="space-y-1.5">
          <label htmlFor="email" className="block text-xs font-bold text-slate-300">
            Adresse email
          </label>
          <input
            id="email"
            type="email"
            placeholder="nom@exemple.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 bg-slate-900/80 border border-slate-700/70 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500/50 text-white placeholder-slate-500 transition-all duration-200"
            disabled={isLoading}
          />
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label htmlFor="password" className="block text-xs font-bold text-slate-300">
            Mot de passe
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full px-4 py-3 bg-slate-900/80 border border-slate-700/70 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500/50 text-white placeholder-slate-500 transition-all duration-200"
            disabled={isLoading}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-700/30 text-sm flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-px disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0 mt-2"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : null}
          Se connecter
          {!isLoading && <ArrowRight className="h-4 w-4" />}
        </button>
      </form>

      {/* Demo credentials */}
      <div className="mt-6 border-t border-slate-700/40 pt-5">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center mb-3">
          Comptes Démo
        </p>
        <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400 bg-slate-900/50 p-3 rounded-xl border border-slate-700/20">
          <div className="space-y-0.5">
            <p className="font-bold text-blue-400">Étudiant</p>
            <p>student@mandarin.com</p>
            <p className="text-slate-500">student123</p>
          </div>
          <div className="space-y-0.5">
            <p className="font-bold text-indigo-400">Administrateur</p>
            <p>admin@mandarin.com</p>
            <p className="text-slate-500">admin123</p>
          </div>
        </div>
      </div>

      <div className="mt-5 text-center text-xs">
        <span className="text-slate-500">Pas encore de compte ? </span>
        <Link href="/auth/signup" className="font-bold text-blue-400 hover:text-blue-300 transition-colors">
          S'inscrire gratuitement
        </Link>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background blobs */}
      <div className="absolute top-[-100px] left-[-60px] w-80 h-80 bg-blue-700/15 rounded-full blur-3xl animate-blob pointer-events-none" />
      <div className="absolute bottom-[-80px] right-[-40px] w-72 h-72 bg-indigo-700/10 rounded-full blur-3xl animate-blob pointer-events-none" style={{ animationDelay: "4s" }} />

      {/* Floating Chinese characters */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <span className="absolute top-[10%] left-[5%] text-8xl font-bold text-white/[0.025] animate-float-slow">你好</span>
        <span className="absolute top-[60%] right-[4%] text-6xl font-bold text-white/[0.03] animate-float" style={{ animationDelay: "2s" }}>学习</span>
        <span className="absolute bottom-[12%] left-[3%] text-5xl font-bold text-white/[0.025] animate-float-slow" style={{ animationDelay: "1s" }}>汉语</span>
        <span className="absolute top-[35%] right-[8%] text-4xl font-bold text-white/[0.02] animate-float" style={{ animationDelay: "3s" }}>普通话</span>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative animate-fade-in-up">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2.5 text-white font-extrabold text-2xl hover:opacity-90 transition group">
            <div className="relative">
              <GraduationCap className="h-8 w-8 text-blue-400 group-hover:scale-110 transition-transform duration-200" />
              <div className="absolute inset-0 bg-blue-400/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Le Chinois Vite et Bien
            </span>
          </Link>
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-white mb-2">
            Bienvenue à nouveau
          </h1>
          <p className="text-slate-400 text-sm font-light">
            Connectez-vous pour reprendre vos formations
          </p>
        </div>

        <Suspense
          fallback={
            <div className="glass-dark py-12 px-4 shadow-xl rounded-3xl sm:px-10 flex flex-col items-center justify-center text-slate-400">
              <Loader2 className="h-8 w-8 text-blue-500 animate-spin mb-3" />
              <p className="text-xs">Chargement du formulaire...</p>
            </div>
          }
        >
          <SignInForm />
        </Suspense>
      </div>
    </div>
  );
}
