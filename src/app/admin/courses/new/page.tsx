"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { ArrowLeft, Loader2, BookOpen } from "lucide-react";

export default function NewCoursePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    category: "Débutant",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError("Le titre du cours est requis.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Une erreur s'est produite lors de la création.");
      }

      const course = await response.json();
      router.push(`/admin/courses/${course.id}`);
      router.refresh();

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Impossible de créer la formation.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-10 space-y-6">
        
        {/* Breadcrumb back */}
        <Link
          href="/admin/courses"
          className="text-xs font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Annuler et retourner à la liste
        </Link>

        {/* Header */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-4">
          <div className="h-10 w-10 bg-blue-550 rounded-xl flex items-center justify-center text-white">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-850">Créer une formation</h1>
            <p className="text-slate-400 text-xs font-light">Définissez les informations de base pour votre nouveau module.</p>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white border border-slate-200/80 p-6 md:p-8 rounded-3xl shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-semibold p-3.5 rounded-xl">
                {error}
              </div>
            )}

            {/* Title */}
            <div className="space-y-1.5">
              <label htmlFor="title" className="text-xs font-bold text-slate-700">
                Titre de la formation
              </label>
              <input
                id="title"
                type="text"
                placeholder="Ex: Chinois Débutant : Les Bases Vocales"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
                disabled={isLoading}
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label htmlFor="description" className="text-xs font-bold text-slate-700">
                Description générale
              </label>
              <textarea
                id="description"
                placeholder="Décrivez brièvement le programme et les objectifs du cours..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
                disabled={isLoading}
              />
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <label htmlFor="category" className="text-xs font-bold text-slate-700">
                Catégorie (Niveau)
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50 font-medium"
                disabled={isLoading}
              >
                <option value="Débutant">Débutant</option>
                <option value="Intermédiaire">Intermédiaire</option>
                <option value="Avancé">Avancé</option>
                <option value="Général">Général</option>
              </select>
            </div>

            {/* Image URL */}
            <div className="space-y-1.5">
              <label htmlFor="imageUrl" className="text-xs font-bold text-slate-700">
                Lien de la miniature (Image URL)
              </label>
              <input
                id="imageUrl"
                type="text"
                placeholder="Ex: https://images.unsplash.com/... (optionnel)"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
                disabled={isLoading}
              />
            </div>

            {/* Submit buttons */}
            <div className="flex gap-3 pt-4 border-t border-slate-100">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-sm text-sm flex items-center justify-center gap-2 transition disabled:bg-slate-350"
              >
                {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                Créer et continuer
              </button>
            </div>

          </form>
        </div>

      </main>
    </div>
  );
}
