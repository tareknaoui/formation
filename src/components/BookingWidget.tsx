"use client";

import { useState } from "react";
import { Calendar as CalendarIcon, Clock, MessageCircle, User, Phone, Target, Sparkles } from "lucide-react";

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

  const coachWhatsappNumber = "213550000000";

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    const message = encodeURIComponent(
      `Bonjour Coach !\nJe souhaite valider ma réservation :\n\n📌 *Formule* : ${selectedFormule.name}\n💰 *Tarif* : ${selectedFormule.price}\n📅 *Date* : ${selectedDate}\n⏰ *Horaire* : ${selectedSlot}\n👤 *Nom* : ${fullName}\n📱 *Téléphone* : ${phone}\n🎯 *Objectif* : ${objective}\n\nMerci de me contacter pour finaliser l'inscription !`
    );

    setTimeout(() => {
      window.open(`https://wa.me/${coachWhatsappNumber}?text=${message}`, "_blank");
    }, 300);
  };

  return (
    <section id="reservation" className="py-20 bg-[#F8FAFC] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-black uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Réservation Directe
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0A083B]">
            Réservez votre séance avec le Coach 🇩🇿
          </h2>
          <p className="mt-3 text-slate-600 max-w-xl mx-auto text-sm sm:text-base font-normal">
            Choisissez votre formule, votre créneau, et finalisez votre inscription en contactant le coach directement sur WhatsApp.
          </p>
        </div>

        {/* Booking Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl relative">
          
          <form onSubmit={handleBookingSubmit} className="space-y-8">
            
            {/* Step 1: Choix de la formule */}
            <div>
              <label className="block text-sm font-extrabold text-[#0A083B] mb-3 flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-[#FA4949] text-white text-xs font-bold flex items-center justify-center">1</span>
                Choisissez votre formule (Tarifs en DA)
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {FORMULES.map((f) => {
                  const isSelected = selectedFormule.id === f.id;
                  return (
                    <div
                      key={f.id}
                      onClick={() => setSelectedFormule(f)}
                      className={`cursor-pointer rounded-2xl p-4.5 transition-all border relative ${
                        isSelected
                          ? "bg-red-50/30 border-[#FA4949] ring-2 ring-[#FA4949]/20 shadow-md"
                          : "bg-white border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      {f.popular && (
                        <span className="absolute -top-2.5 right-3 bg-[#FA4949] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                          POPULAIRE
                        </span>
                      )}
                      <div className="flex justify-between items-start mb-1.5">
                        <h4 className="font-extrabold text-[#0A083B] text-sm">{f.name}</h4>
                        <span className="text-sm font-black text-[#FA4949] bg-red-50 px-2.5 py-0.5 rounded-full border border-red-100">
                          {f.price}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">{f.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Date & Horaire */}
            <div>
              <label className="block text-sm font-extrabold text-[#0A083B] mb-3 flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-[#FA4949] text-white text-xs font-bold flex items-center justify-center">2</span>
                Date et Créneau disponible
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-slate-500 font-bold block mb-1.5 flex items-center gap-1.5">
                    <CalendarIcon className="w-3.5 h-3.5 text-[#FA4949]" /> Date souhaitée
                  </span>
                  <input
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm text-[#0A083B] font-medium focus:outline-none focus:border-[#FA4949] focus:bg-white"
                    required
                  />
                </div>

                <div>
                  <span className="text-xs text-slate-500 font-bold block mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-emerald-600" /> Heure disponible
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {CRENEAUX.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`text-xs px-3.5 py-2.5 rounded-xl font-bold border transition-all ${
                          selectedSlot === slot
                            ? "bg-[#0A083B] text-white border-[#0A083B]"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300"
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
              <label className="block text-sm font-extrabold text-[#0A083B] mb-3 flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-[#FA4949] text-white text-xs font-bold flex items-center justify-center">3</span>
                Vos Coordonnées
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <span className="text-xs text-slate-500 font-bold block mb-1.5">Nom complet</span>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      placeholder="Ex: Mohamed Ali"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-3.5 py-3 text-sm text-[#0A083B] font-medium focus:outline-none focus:border-[#FA4949] focus:bg-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <span className="text-xs text-slate-500 font-bold block mb-1.5">Numéro WhatsApp</span>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      placeholder="Ex: 0555 12 34 56"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-3.5 py-3 text-sm text-[#0A083B] font-medium focus:outline-none focus:border-[#FA4949] focus:bg-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <span className="text-xs text-slate-500 font-bold block mb-1.5">Objectif principal</span>
                  <div className="relative">
                    <Target className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <select
                      value={objective}
                      onChange={(e) => setObjective(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-3.5 py-3 text-sm text-[#0A083B] font-medium focus:outline-none focus:border-[#FA4949] focus:bg-white appearance-none"
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
            <div className="pt-4 border-t border-slate-100">
              <button
                type="submit"
                className="w-full btn-primary py-4 text-base font-extrabold flex items-center justify-center gap-3 shadow-lg hover:scale-[1.01]"
              >
                <MessageCircle className="w-6 h-6 fill-current" />
                Réserver & Finaliser le Paiement avec le Coach
              </button>
              
              <p className="text-center text-xs text-slate-500 mt-3 font-medium">
                * En cliquant, vous serez redirigé directement vers le WhatsApp officiel du coach avec vos détails pré-remplis pour fixer le paiement et la confirmation.
              </p>
            </div>

          </form>

        </div>
      </div>
    </section>
  );
}
