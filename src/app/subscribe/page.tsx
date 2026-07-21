"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Check, ShieldAlert, CreditCard, Sparkles, Loader2, Zap } from "lucide-react";

export default function SubscribePage() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const isSubscribed = session?.user?.isSubscribed || session?.user?.role === "ADMIN";

  const handleSubscribeAction = async (action: "subscribe" | "unsubscribe") => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });

      if (response.ok) {
        await update({ isSubscribed: action === "subscribe" });
        router.refresh();
        setTimeout(() => {
          router.push("/");
        }, 800);
      }
    } catch (error) {
      console.error("[SUBSCRIBE_CLIENT_ERROR]", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!session) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-5 shadow-sm">
            <ShieldAlert className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-800 mb-2">Authentification requise</h2>
          <p className="text-slate-500 font-light text-sm mb-6">
            Vous devez vous connecter à votre compte pour gérer ou souscrire à un abonnement.
          </p>
          <button
            onClick={() => router.push("/auth/signin")}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3 rounded-xl transition-all duration-200 shadow-md shadow-blue-500/20 hover:-translate-y-px"
          >
            Se connecter
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      <Navbar />

      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-[-120px] right-[-80px] w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-[-60px] left-[-60px] w-80 h-80 bg-indigo-200/15 rounded-full blur-3xl animate-blob" style={{ animationDelay: "4s" }} />
      </div>

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-14 flex flex-col items-center justify-center relative">
        
        {/* Title */}
        <div className="text-center max-w-2xl mb-14 animate-fade-in-up">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full shadow-sm inline-block">
            Tarifs
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mt-4 mb-3">
            Débloquez votre apprentissage{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              du Chinois
            </span>
          </h1>
          <p className="text-slate-500 font-light text-sm md:text-base">
            Choisissez l'abonnement qui convient à votre rythme d'apprentissage. Annulez à tout moment.
          </p>
        </div>

        {/* Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
          
          {/* Free Plan */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow duration-300 animate-fade-in-up">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl font-bold text-slate-800">Gratuit</h3>
              </div>
              <p className="text-xs text-slate-400 font-medium mb-6">Pour découvrir le catalogue</p>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold text-slate-800">0 €</span>
                <span className="text-slate-400 text-sm font-semibold">/ mois</span>
              </div>

              <div className="h-px bg-slate-100 mb-6" />

              <ul className="space-y-3 text-sm text-slate-600 font-medium">
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                    <Check className="h-3 w-3 text-blue-600" />
                  </span>
                  Accès au catalogue des cours
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                    <Check className="h-3 w-3 text-blue-600" />
                  </span>
                  Consulter le programme détaillé
                </li>
                <li className="flex items-center gap-2.5 text-slate-300 line-through">
                  <span className="w-5 h-5 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                    <Check className="h-3 w-3 text-slate-300" />
                  </span>
                  Lecture des cours vidéo
                </li>
                <li className="flex items-center gap-2.5 text-slate-300 line-through">
                  <span className="w-5 h-5 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                    <Check className="h-3 w-3 text-slate-300" />
                  </span>
                  Suivi de progression
                </li>
              </ul>
            </div>

            <div className="mt-8">
              <button
                disabled
                className="w-full py-3 border border-slate-200 text-slate-400 rounded-xl font-bold text-sm cursor-not-allowed bg-slate-50"
              >
                Plan Actuel par Défaut
              </button>
            </div>
          </div>

          {/* Premium Plan */}
          <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 border-2 border-blue-500/40 rounded-3xl p-8 flex flex-col justify-between shadow-2xl shadow-blue-900/20 relative overflow-hidden animate-fade-in-up animate-glow-pulse" style={{ animationDelay: "0.15s" }}>
            
            {/* Decorative glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Badge */}
            <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
              <Sparkles className="h-2.5 w-2.5 fill-white" />
              Recommandé
            </div>

            <div className="relative">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="h-4 w-4 text-blue-400 fill-blue-400" />
                <h3 className="text-xl font-bold text-white">Premium Plus</h3>
              </div>
              <p className="text-xs text-blue-300 font-semibold mb-6">Accès illimité à l'apprentissage</p>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold text-white">9,99 €</span>
                <span className="text-slate-400 text-sm font-semibold">/ mois</span>
              </div>

              <div className="h-px bg-white/10 mb-6" />

              <ul className="space-y-3 text-sm text-slate-200 font-medium">
                {[
                  "Accès complet au catalogue",
                  "Streaming vidéo illimité (Google Drive)",
                  "Suivi de progression et reprise",
                  "Exercices et supports de cours",
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-400/30 flex items-center justify-center shrink-0">
                      <Check className="h-3 w-3 text-blue-300" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 relative">
              {isLoading ? (
                <button
                  disabled
                  className="w-full py-3 bg-blue-600/60 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 cursor-wait"
                >
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Traitement en cours...
                </button>
              ) : isSubscribed ? (
                <button
                  onClick={() => handleSubscribeAction("unsubscribe")}
                  className="w-full py-3 bg-red-900/30 hover:bg-red-900/50 text-red-300 border border-red-500/20 rounded-xl font-bold text-sm transition-all duration-200"
                >
                  Résilier mon abonnement (Démo)
                </button>
              ) : (
                <button
                  onClick={() => handleSubscribeAction("subscribe")}
                  className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-700/30 hover:shadow-blue-600/40 hover:-translate-y-px transition-all duration-200"
                >
                  <CreditCard className="h-4 w-4" />
                  Souscrire à Premium Plus (Démo)
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
