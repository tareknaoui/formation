import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { BookOpen, Layers, Play, CheckCircle, Lock, ArrowRight, Sparkles } from "lucide-react";

export default async function CoursesCatalogPage() {
  const session = await getServerSession(authOptions);

  const courses = await db.course.findMany({
    where: { isPublished: true },
    include: {
      chapters: {
        where: { isPublished: true },
        include: {
          lessons: {
            where: { isPublished: true },
          },
        },
      },
    },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#0B0F19] text-[#F8FAFC]">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 w-full">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D62828]/10 border border-[#D62828]/30 text-[#D62828] text-xs font-extrabold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Catalogue des Formations
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Accédez à toutes vos leçons vidéo 🎥
          </h1>
          <p className="mt-4 text-[#94A3B8] text-base leading-relaxed">
            Sélectionnez votre programme ci-dessous pour accéder au lecteur de cours, suivre votre progression et regarder vos vidéos.
          </p>
        </div>

        {/* Courses list */}
        {courses.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center max-w-lg mx-auto border-[#2A364F]">
            <BookOpen className="w-12 h-12 text-[#FFB703] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Formations bientôt disponibles</h3>
            <p className="text-slate-400 text-sm mb-6">
              Le coach finalise l'enregistrement de nouvelles leçons vidéo. Revenez très rapidement !
            </p>
            <Link
              href="/"
              className="btn-gold px-6 py-2.5 text-xs font-bold inline-block"
            >
              Retour à l'accueil
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => {
              const totalLessons = course.chapters.reduce(
                (acc, ch) => acc + ch.lessons.length,
                0
              );

              return (
                <div
                  key={course.id}
                  className="glass-card rounded-2xl overflow-hidden border border-[#2A364F] flex flex-col justify-between hover:border-[#FFB703]/50 transition-all duration-300 group"
                >
                  <div>
                    {/* Course Banner */}
                    {course.imageUrl ? (
                      <div className="aspect-video w-full overflow-hidden bg-[#161F33] relative">
                        <img
                          src={course.imageUrl}
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {course.category && (
                          <span className="absolute top-3 left-3 bg-[#0B0F19]/80 backdrop-blur-md text-[#FFB703] border border-[#2A364F] text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                            {course.category}
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="aspect-video w-full bg-gradient-to-tr from-[#161F33] to-[#2A364F] flex items-center justify-center relative">
                        <BookOpen className="w-12 h-12 text-[#FFB703]/40" />
                        {course.category && (
                          <span className="absolute top-3 left-3 bg-[#0B0F19]/80 backdrop-blur-md text-[#FFB703] border border-[#2A364F] text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                            {course.category}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="p-6">
                      <h2 className="text-xl font-bold text-white mb-2 group-hover:text-[#FFB703] transition-colors">
                        {course.title}
                      </h2>
                      <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-3 mb-6">
                        {course.description || "Aucune description fournie pour cette formation."}
                      </p>

                      <div className="flex items-center gap-4 text-xs text-[#94A3B8] pt-4 border-t border-[#2A364F]">
                        <span className="flex items-center gap-1.5">
                          <Layers className="w-4 h-4 text-[#FFB703]" />
                          {course.chapters.length} chapitres
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Play className="w-4 h-4 text-[#D62828]" />
                          {totalLessons} vidéos
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <Link
                      href={`/courses/${course.id}`}
                      className="w-full btn-gold py-3 text-xs font-bold text-center flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-[#FFB703]/20"
                    >
                      Accéder au contenu
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
