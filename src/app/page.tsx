"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageCircle, Check, Sparkles, Video, BookOpen, FileText, Infinity as InfinityIcon, RefreshCw } from "lucide-react";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  const coachWhatsappNumber = "213550000000";

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;
    const msg = encodeURIComponent(
      `Bonjour Coach !\nJe souhaite m'inscrire à la *Méthode Solo (4 500 DA à vie)*.\n\n👤 Nom: ${fullName}\n📱 WhatsApp: ${phone}`
    );
    window.open(`https://wa.me/${coachWhatsappNumber}?text=${msg}`, "_blank");
  };

  const HIGHLIGHTS = [
    { text: "Manuel complet avec vidéos HD", icon: Video },
    { text: "Exercices progressifs de pratique", icon: BookOpen },
    { text: "Carnet d'écriture PDF imprimable", icon: FileText },
    { text: "Accès à vie au contenu (24/7)", icon: InfinityIcon },
    { text: "Mises à jour gratuites incluses", icon: RefreshCw },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0A083B] justify-between selection:bg-red-500 selection:text-white">
      
      {/* Ultra-Minimal Header */}
      <header className="py-6 px-6 sm:px-12 flex items-center justify-between border-b border-slate-200/60 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FA4949] text-white flex items-center justify-center font-extrabold text-lg shadow-md shadow-red-500/20">
            汉
          </div>
          <div>
            <span className="font-black text-base tracking-tight text-[#0A083B] block leading-none">
              Le Chinois Vite & Bien
            </span>
            <span className="text-[11px] font-semibold text-slate-500">Formation Mandarin DZ 🇩🇿</span>
          </div>
        </div>

        <Link
          href="/auth/signin"
          className="text-xs font-bold px-4 py-2 rounded-full border border-slate-200 hover:border-[#FA4949] text-slate-700 hover:text-[#FA4949] transition"
        >
          Espace Membre
        </Link>
      </header>

      {/* Main Single-Focus Card Container */}
      <main className="flex-grow flex items-center justify-center p-4 sm:p-8 my-6">
        <div className="max-w-xl w-full bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl relative overflow-hidden">
          
          {/* Top Badge */}
          <div className="text-center mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-[#FA4949] text-xs font-black uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Offre Unique &bull; Méthode Solo (自学)
            </span>
            
            <h1 className="text-2xl sm:text-4xl font-black text-[#0A083B] tracking-tight leading-tight">
              Apprenez le Mandarin
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
              La méthode autonome conçue pour apprendre à votre rythme.
            </p>
          </div>

          {/* Pricing Highlight */}
          <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-slate-200 text-center mb-6">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">
              Accès Illimité à Vie
            </span>
            <div className="text-4xl sm:text-5xl font-black text-[#FA4949]">
              4 500 DA
            </div>
            <span className="text-[11px] text-emerald-600 font-extrabold block mt-1">
              Paiement unique (CCP / BaridiMob) &bull; Aucun abonnement
            </span>
          </div>

          {/* Clean 5 Bullet Points */}
          <div className="space-y-3 mb-8">
            {HIGHLIGHTS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-700 p-2.5 rounded-xl hover:bg-slate-50 transition">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                  <span>{item.text}</span>
                </div>
              );
            })}
          </div>

          {/* Quick Order Form */}
          <form onSubmit={handleOrder} className="space-y-3 border-t border-slate-100 pt-6">
            <div>
              <input
                type="text"
                placeholder="Votre Nom & Prénom"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-[#0A083B] font-medium focus:outline-none focus:border-[#FA4949] focus:bg-white"
                required
              />
            </div>

            <div>
              <input
                type="tel"
                placeholder="Votre Numéro WhatsApp (ex: 0550...)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-[#0A083B] font-medium focus:outline-none focus:border-[#FA4949] focus:bg-white"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full btn-primary py-4 rounded-xl text-sm font-extrabold flex items-center justify-center gap-2 shadow-lg hover:scale-[1.01] transition"
            >
              <MessageCircle className="w-5 h-5 fill-current text-white" />
              Obtenir mon accès à 4 500 DA
            </button>
          </form>

          <p className="text-center text-[11px] text-slate-400 font-medium mt-3">
            Validation directe et instantanée avec le coach sur WhatsApp.
          </p>

        </div>
      </main>

      <Footer />
    </div>
  );
}
