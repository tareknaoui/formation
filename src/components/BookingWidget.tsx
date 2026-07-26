"use client";

import { useState } from "react";
import { Calendar as CalendarIcon, Clock, CheckCircle2, MessageCircle, User, Phone, Target, Sparkles } from "lucide-react";

interface Formule {
  id: string;
  name: string;
  price: string;
  description: string;
  popular?: boolean;
}

const FORMULES: Formule[] = [
  {
    id: "decouverte",
    name: "Session Découverte (30 min)",
    price: "OFFERT",
    description: "Évaluation de niveau + conseils personnalisés pour bien démarrer.",
  },
  {
    id: "coaching-1on1",
    name: "Coaching Individuel 1-on-1 (1h)",
    price: "2 500 DA",
    description: "Séance sur-mesure avec le coach (Prononciation, Pinyin ou Business).",
    popular: true,
  },
  {
    id: "hsk-mensuel",
    name: "Pack Formation HSK (Mensuel)",
    price: "8 000 DA",
    description: "Cours structurés, supports de cours PDF et accompagnement WhatsApp.",
  },
  {
    id: "business-express",
    name: "Mandarin Business & Importation",
    price: "12 000 DA",
    description: "Vocabulaire commercial, négociation avec les fournisseurs chinois et usines.",
  },
];

const CRENEAUX = [
  "10:00 - 11:00",
  "14:00 - 15:00",
  "16:30 - 17:30",
  "19:00 - 20:00",
  "20:30 - 21:30"
];

export function BookingWidget() {
  const [selectedFormule, setSelectedFormule] = useState<Formule>(FORMULES[1]);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().split("T")[0]
  );
  const [selectedSlot, setSelectedSlot] = useState<string>(CRENEAUX[1]);
  
  // User contact state
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [objective, setObjective] = useState("Business & Commerce");
  const [submitted, setSubmitted] = useState(false);

  const coachWhatsappNumber = "213550000000";

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    setSubmitted(true);

    const message = encodeURIComponent(
      `Bonjour Coach !\nJe souhaite valider ma réservation :\n\n📌 *Formule* : ${selectedFormule.name}\n💰 *Tarif* : ${selectedFormule.price}\n📅 *Date* : ${selectedDate}\n⏰ *Horaire* : ${selectedSlot}\n👤 *Nom* : ${fullName}\n📱 *Téléphone* : ${phone}\n🎯 *Objectif* : ${objective}\n\nMerci de me contacter pour finaliser l'inscription !`
    );

    // Open WhatsApp after short delay
    setTimeout(() => {
      window.open(`https://wa.me/${coachWhatsappNumber}?text=${message}`, "_blank");
    }, 400);
  };

  return (
    <section id="reservation" className="py-20 relative">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D62828]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFB703]/10 border border-[#FFB703]/30 text-[#FFB703] text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Réservation Directe
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Réservez votre séance avec le Coach 🇩🇿
          </h2>
          <p className="mt-3 text-[#94A3B8] max-w-xl mx-auto text-sm sm:text-base">
            Choisissez votre formule, votre créneau, et finalisez votre inscription en contactant le coach directement sur WhatsApp.
          </p>
        </div>

        {/* Booking Card */}
        <div className="glass-card rounded-2xl p-6 sm:p-10 border border-[#2A364F] shadow-2xl relative">
          
          <form onSubmit={handleBookingSubmit} className="space-y-8">
            
            {/* Step 1: Choix de la formule */}
            <div>
              <label className="block text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#D62828] text-white text-xs font-bold flex items-center justify-center">1</span>
                Choisissez votre formule (Tarifs en DA)
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {FORMULES.map((f) => {
                  const isSelected = selectedFormule.id === f.id;
                  return (
                    <div
                      key={f.id}
                      onClick={() => setSelectedFormule(f)}
                      className={`cursor-pointer rounded-xl p-4 transition-all border relative ${
                        isSelected
                          ? "bg-[#161F33] border-[#FFB703] shadow-lg shadow-[#FFB703]/10"
                          : "bg-[#0B0F19]/60 border-[#2A364F] hover:border-slate-500"
                      }`}
                    >
                      {f.popular && (
                        <span className="absolute -top-2.5 right-3 bg-[#FFB703] text-[#0B0F19] text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                          POPULAIRE
                        </span>
                      )}
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-white text-sm">{f.name}</h4>
                        <span className="text-sm font-extrabold text-[#FFB703] bg-[#FFB703]/10 px-2 py-0.5 rounded">
                          {f.price}
                        </span>
                      </div>
                      <p className="text-xs text-[#94A3B8] leading-relaxed">{f.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Date & Horaire */}
            <div>
              <label className="block text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#D62828] text-white text-xs font-bold flex items-center justify-center">2</span>
                Date et Créneau disponible
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-[#94A3B8] block mb-1.5 flex items-center gap-1">
                    <CalendarIcon className="w-3.5 h-3.5 text-[#FFB703]" /> Date souhaitée
                  </span>
                  <input
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-[#0B0F19] border border-[#2A364F] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FFB703]"
                    required
                  />
                </div>

                <div>
                  <span className="text-xs text-[#94A3B8] block mb-1.5 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#06D6A0]" /> Heure disponible
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {CRENEAUX.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`text-xs px-3 py-2 rounded-lg font-medium border transition-all ${
                          selectedSlot === slot
                            ? "bg-[#06D6A0] text-[#0B0F19] border-[#06D6A0] font-bold"
                            : "bg-[#0B0F19] text-slate-300 border-[#2A364F] hover:border-slate-500"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Coordonnées de l'élève */}
            <div>
              <label className="block text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#D62828] text-white text-xs font-bold flex items-center justify-center">3</span>
                Vos Coordonnées
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <span className="text-xs text-[#94A3B8] block mb-1.5">Nom complet</span>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Ex: Mohamed Ali"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-[#0B0F19] border border-[#2A364F] rounded-xl pl-9 pr-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#FFB703]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <span className="text-xs text-[#94A3B8] block mb-1.5">Numéro WhatsApp</span>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="tel"
                      placeholder="Ex: 0555 12 34 56"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#0B0F19] border border-[#2A364F] rounded-xl pl-9 pr-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#FFB703]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <span className="text-xs text-[#94A3B8] block mb-1.5">Objectif principal</span>
                  <div className="relative">
                    <Target className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <select
                      value={objective}
                      onChange={(e) => setObjective(e.target.value)}
                      className="w-full bg-[#0B0F19] border border-[#2A364F] rounded-xl pl-9 pr-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#FFB703] appearance-none"
                    >
                      <option value="Business & Commerce">Business & Commerce</option>
                      <option value="Préparation HSK">Préparation HSK</option>
                      <option value="Voyage / Études">Voyage / Études</option>
                      <option value="Débutant Curieux">Débutant Curieux</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button & Disclaimer */}
            <div className="pt-4 border-t border-[#2A364F]/80">
              <button
                type="submit"
                className="w-full btn-gold py-4 text-base font-extrabold flex items-center justify-center gap-3 shadow-xl hover:scale-[1.01]"
              >
                <MessageCircle className="w-6 h-6 fill-current" />
                Réserver & Finaliser le Paiement avec le Coach
              </button>
              
              <p className="text-center text-xs text-[#94A3B8] mt-3">
                * En cliquant, vous serez redirigé directement vers le WhatsApp officiel du coach avec vos détails pré-remplis pour fixer le paiement et la confirmation.
              </p>
            </div>

          </form>

        </div>
      </div>
    </section>
  );
}
