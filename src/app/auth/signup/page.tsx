"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { GraduationCap, Loader2, ArrowRight } from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Erreur lors de l'inscription.");
      }

      // Automatically sign in after signup
      const res = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (res?.error) {
        setError("Inscription réussie, mais connexion automatique impossible.");
        router.push("/auth/signin");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Une erreur s'est produite lors de l'inscription.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background blobs */}
      <div className="absolute top-[-100px] right-[-60px] w-80 h-80 bg-indigo-700/15 rounded-full blur-3xl animate-blob pointer-events-none" />
      <div className="absolute bottom-[-80px] left-[-40px] w-72 h-72 bg-blue-700/10 rounded-full blur-3xl animate-blob pointer-events-none" style={{ animationDelay: "4s" }} />

      {/* Floating Chinese characters */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <span className="absolute top-[8%] left-[4%] text-8xl font-bold text-white/[0.025] animate-float-slow">开始</span>
        <span className="absolute top-[55%] right-[3%] text-6xl font-bold text-white/[0.03] animate-float" style={{ animationDelay: "2s" }}>学习</span>
        <span className="absolute bottom-[10%] right-[5%] text-5xl font-bold text-white/[0.025] animate-float-slow" style={{ animationDelay: "1s" }}>加油</span>
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
            Rejoignez l'académie
          </h1>
          <p className="text-slate-400 text-sm font-light">
            Créez un compte gratuit pour commencer à apprendre
          </p>
        </div>

        {/* Form card */}
        <div className="glass-dark py-8 px-6 shadow-2xl rounded-3xl sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold p-3.5 rounded-xl text-center animate-fade-in-up">
                {error}
              </div>
            )}

            {/* Name */}
            <div className="space-y-1.5">
              <label htmlFor="name" className="block text-xs font-bold text-slate-300">
                Nom complet
              </label>
              <input
                id="name"
                type="text"
                placeholder="Ex: Jean Dupont"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900/80 border border-slate-700/70 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500/50 text-white placeholder-slate-500 transition-all duration-200"
                disabled={isLoading}
              />
            </div>

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
                placeholder="•••••••• (min. 6 caractères)"
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
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Créer mon compte
              {!isLoading && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>

          <div className="mt-6 text-center text-xs border-t border-slate-700/40 pt-5">
            <span className="text-slate-500">Déjà inscrit ? </span>
            <Link href="/auth/signin" className="font-bold text-blue-400 hover:text-blue-300 transition-colors">
              Se connecter
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
