"use client";

import { useState } from "react";
import { MessageCircle, User, Phone, MapPin, Sparkles, CheckCircle } from "lucide-react";

export function BookingWidget() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [wilaya, setWilaya] = useState("");

  const coachWhatsappNumber = "213550000000";

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    const message = encodeURIComponent(
      `Bonjour Coach !\nJe souhaite commander la *Méthode Solo (4 500 DA à vie)*.\n\n👤 *Nom* : ${fullName}\n📱 *Téléphone* : ${phone}\n📍 *Wilaya* : ${wilaya || "Non spécifiée"}\n\nMerci de m'envoyer les accès et les modalités de paiement (CCP / BaridiMob) !`
    );

    setTimeout(() => {
      window.open(`https://wa.me/${coachWhatsappNumber}?text=${message}`, "_blank");
    }, 300);
  };

  return (
    <section id="inscription" className="py-20 bg-[#F8FAFC] relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Section Title */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-100 text-[#FA4949] text-xs font-black uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Accès Immédiat
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0A083B]">
            Rejoignez la Méthode Solo (4 500 DA)
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base font-normal">
            Remplissez vos coordonnées pour recevoir votre accès instantané et les informations de paiement (BaridiMob / CCP).
          </p>
        </div>

        {/* Order Card */}
        <div className="bg-white rounded-3xl p-7 sm:p-10 border border-slate-200 shadow-xl relative">
          
          {/* Order Summary Box */}
          <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-slate-200 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase">Récapitulatif</span>
              <h4 className="font-extrabold text-[#0A083B] text-base">Méthode Solo &bull; Accès à vie</h4>
              <p className="text-xs text-slate-500 font-medium">Manuel Vidéo HD + Exercices + PDF imprimables</p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-2xl font-black text-[#FA4949]">4 500 DA</span>
              <span className="block text-[10px] font-bold text-emerald-600">Paiement unique</span>
            </div>
          </div>

          <form onSubmit={handleOrderSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-[#0A083B] mb-2">Nom et Prénom *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    placeholder="Ex: Mohamed Ali"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3.5 py-3 text-sm text-[#0A083B] font-medium focus:outline-none focus:border-[#FA4949] focus:bg-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0A083B] mb-2">Numéro WhatsApp *</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="tel"
                    placeholder="Ex: 0555 12 34 56"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3.5 py-3 text-sm text-[#0A083B] font-medium focus:outline-none focus:border-[#FA4949] focus:bg-white"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0A083B] mb-2">Wilaya (Optionnel)</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="Ex: Alger, Oran, Sétif..."
                  value={wilaya}
                  onChange={(e) => setWilaya(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3.5 py-3 text-sm text-[#0A083B] font-medium focus:outline-none focus:border-[#FA4949] focus:bg-white"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full btn-primary py-4 text-base font-extrabold flex items-center justify-center gap-3 shadow-lg hover:scale-[1.01] transition-transform"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                Commander ma formation (4 500 DA)
              </button>

              <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500 font-semibold mt-4">
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Validation sur WhatsApp
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> CCP / BaridiMob
                </span>
              </div>
            </div>

          </form>

        </div>
      </div>
    </section>
  );
}
