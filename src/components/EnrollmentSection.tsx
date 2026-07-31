"use client";

import { useState } from "react";
import { MessageCircle, Sparkles, CheckCircle2, ShieldCheck, CreditCard, ArrowRight } from "lucide-react";

export function EnrollmentSection() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [copiedAccount, setCopiedAccount] = useState(false);

  const coachWhatsappNumber = "213550000000";

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;
    const msg = encodeURIComponent(
      `Bonjour Coach !\nJe souhaite m'inscrire à la *Méthode Solo (4 500 DA à vie)*.\n\n👤 Nom & Prénom: ${fullName}\n📱 WhatsApp: ${phone}`
    );
    window.open(`https://wa.me/${coachWhatsappNumber}?text=${msg}`, "_blank");
  };

  const copyBaridiMob = () => {
    navigator.clipboard.writeText("00799999000000000099");
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 3000);
  };

  return (
    <section id="inscri" className="py-24 bg-[#0B0F19] text-slate-100 relative overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-red-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-4 h-4" /> Offre Unique &bull; Accès Illimité à Vie
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Obtenez votre accès aujourd&apos;hui.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Inscrivez-vous en 1 minute. Paiement unique par <strong>CCP ou BaridiMob</strong>. Aucun abonnement récurrent.
          </p>
        </div>

        {/* Enrollment Card & Payment Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Instant WhatsApp Registration Form */}
          <div className="lg:col-span-7 glass-card-static p-8 sm:p-10 border border-red-500/30 bg-slate-900/90 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-6 mb-6">
              <div>
                <span className="text-[11px] font-black text-red-400 uppercase tracking-wider">
                  MÉTHODE SOLO (自学)
                </span>
                <h3 className="text-2xl font-black text-white mt-1">Formulaire d&apos;inscription</h3>
              </div>
              <div className="text-right">
                <div className="text-3xl font-black text-red-500">4 500 DA</div>
                <span className="text-[10px] text-emerald-400 font-extrabold uppercase tracking-wider block">
                  Accès à vie
                </span>
              </div>
            </div>

            <form onSubmit={handleOrder} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Votre Nom & Prénom *
                </label>
                <input
                  type="text"
                  placeholder="ex: Amine Benali"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-500 font-medium focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Votre Numéro WhatsApp *
                </label>
                <input
                  type="tel"
                  placeholder="ex: 0550 12 34 56"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-500 font-medium focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full btn-primary py-4 rounded-xl text-sm font-extrabold flex items-center justify-center gap-2.5 shadow-xl shadow-red-500/25 mt-6 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Valider mon inscription sur WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <p className="text-center text-xs text-slate-400 mt-4 flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Validation et envoi des identifiants instantanés avec le coach.</span>
            </p>
          </div>

          {/* Right Column: Payment Methods Guide (CCP / BaridiMob) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            <div className="glass-card-static p-6 border border-slate-800 bg-slate-900/80 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Modalités de Paiement 🇩🇿</h4>
                  <span className="text-xs text-slate-400">BaridiMob & CCP Algérie</span>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span>RIP BaridiMob :</span>
                  <button 
                    onClick={copyBaridiMob}
                    className="text-red-400 hover:text-red-300 font-mono font-bold hover:underline"
                  >
                    {copiedAccount ? "Copié !" : "00799999000000000099 (Copier)"}
                  </button>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Compte CCP :</span>
                  <span className="font-mono text-slate-200">0021345678 Clé 45</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Montant :</span>
                  <span className="font-bold text-emerald-400">4 500 DA (Paiement Unique)</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed">
                Après avoir effectué le virement, envoyez simplement le reçu photo sur WhatsApp au Coach pour débloquer votre compte sous 5 minutes.
              </p>
            </div>

            {/* Inclusions summary */}
            <div className="glass-card-static p-6 border border-slate-800 bg-slate-900/80 space-y-3">
              <h5 className="text-xs font-black uppercase text-slate-400 tracking-wider">Inclus dans votre accès</h5>
              <div className="space-y-2 text-xs text-slate-300 font-semibold">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Vidéos HD interactives HSK 1, 2 et 3</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Carnets d&apos;écriture Hanzi PDF prêts à imprimer</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Assistance directe avec le coach sur WhatsApp</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Mises à jour gratuites à vie</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
