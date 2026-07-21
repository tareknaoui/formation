import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import CourseCard from "@/components/CourseCard";
import Link from "next/link";
import { BookOpen, Sparkles, Award, Play } from "lucide-react";

interface PageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
  }>;
}

export default async function HomePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const search = params.search || "";
  const category = params.category || "";
  
  const session = await getServerSession(authOptions);
  
  // Fetch courses matching filters
  let courses: any[] = [];
  try {
    courses = await db.course.findMany({
      where: {
        isPublished: true,
        AND: [
          search
            ? {
                OR: [
                  { title: { contains: search, mode: "insensitive" } },
                  { description: { contains: search, mode: "insensitive" } },
                ],
              }
            : {},
          category && category !== "Tous"
            ? { category: category }
            : {},
        ],
      },
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
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    console.error("Error fetching courses from database:", err);
  }

  // If user is logged in, fetch their progress
  const userProgressMap: Record<string, number> = {};

  if (session?.user?.id && courses.length > 0) {
    try {
      const userId = session.user.id;
      
      const progress = await db.userProgress.findMany({
        where: {
          userId,
          isCompleted: true,
        },
        include: {
          lesson: true,
        },
      });

      courses.forEach((course) => {
        const courseLessonIds = course.chapters.flatMap((ch: any) => ch.lessons.map((l: any) => l.id));
        const totalLessons = courseLessonIds.length;
        
        if (totalLessons === 0) {
          userProgressMap[course.id] = 0;
          return;
        }

        const completedCount = progress.filter((p) => courseLessonIds.includes(p.lessonId)).length;
        userProgressMap[course.id] = Math.round((completedCount / totalLessons) * 100);
      });
    } catch (err) {
      console.error("Error fetching user progress:", err);
    }
  }

  // Get all unique categories for the filters
  let uniqueCategories: string[] = [];
  try {
    const categoriesDb = await db.course.findMany({
      where: { isPublished: true },
      select: { category: true },
      distinct: ["category"],
    });
    uniqueCategories = categoriesDb.map((c) => c.category).filter(Boolean) as string[];
  } catch (err) {
    console.error("Error fetching categories:", err);
  }
  
  const categories = ["Tous", ...uniqueCategories];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />
      
      {/* ── Hero Section ─────────────────────────────── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white py-20 px-4">
        
        {/* Decorative blobs */}
        <div className="absolute top-[-80px] left-[-80px] w-72 h-72 bg-blue-600/20 rounded-full blur-3xl animate-blob pointer-events-none" />
        <div className="absolute bottom-[-60px] right-[-60px] w-64 h-64 bg-indigo-600/15 rounded-full blur-3xl animate-blob pointer-events-none" style={{ animationDelay: "4s" }} />

        {/* Floating Chinese characters decoration */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
          <span className="absolute top-8 right-[10%] text-7xl font-bold text-white/[0.04] animate-float" style={{ animationDelay: "0s" }}>学</span>
          <span className="absolute top-1/2 right-[5%] text-5xl font-bold text-white/[0.05] animate-float-slow" style={{ animationDelay: "2s" }}>汉语</span>
          <span className="absolute bottom-8 left-[8%] text-6xl font-bold text-white/[0.04] animate-float" style={{ animationDelay: "3s" }}>普通话</span>
          <span className="absolute top-12 left-[3%] text-4xl font-bold text-white/[0.04] animate-float-slow" style={{ animationDelay: "1s" }}>你好</span>
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="md:flex items-center justify-between gap-10">
            
            {/* Left: headline */}
            <div className="max-w-2xl mb-10 md:mb-0 animate-fade-in-up">
              {/* Eyebrow */}
              <div className="flex items-center gap-2 mb-5">
                <span className="text-xs font-bold uppercase tracking-widest text-blue-300 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
                  🇨🇳 Plateforme de formation
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-5 leading-tight">
                Maîtrisez le{" "}
                <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  Chinois Mandarin
                </span>{" "}
                <br className="hidden md:block" />pas à pas
              </h1>
              <p className="text-lg text-slate-300 mb-8 font-light leading-relaxed max-w-xl">
                Des cours structurés par des professionnels pour vous guider de l'initiation complète aux conversations fluides.
              </p>

              {/* Feature badges */}
              <div className="flex flex-wrap gap-3">
                <span className="flex items-center gap-2 glass px-4 py-2 rounded-full text-xs font-semibold text-slate-200">
                  <Play className="h-3.5 w-3.5 fill-blue-400 text-blue-400" />
                  Vidéos HD fluides
                </span>
                <span className="flex items-center gap-2 glass px-4 py-2 rounded-full text-xs font-semibold text-slate-200">
                  <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
                  Suivi de progression
                </span>
                <span className="flex items-center gap-2 glass px-4 py-2 rounded-full text-xs font-semibold text-slate-200">
                  <Award className="h-3.5 w-3.5 text-amber-400" />
                  Accès Premium
                </span>
              </div>
            </div>
            
            {/* Right: subscription card */}
            {(!session || !session.user.isSubscribed) && (
              <div className="glass rounded-2xl p-7 max-w-sm mx-auto md:mx-0 shadow-2xl animate-fade-in-up animate-glow-pulse" style={{ animationDelay: "0.2s" }}>
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="h-4 w-4 text-indigo-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">Premium Plus</span>
                </div>
                <h3 className="text-2xl font-extrabold mb-2 text-white">
                  Abonnement <span className="text-blue-400">Premium</span>
                </h3>
                <p className="text-sm text-slate-300 mb-5 font-light leading-relaxed">
                  Accédez à toutes les formations, aux vidéos et au suivi personnalisé de progression.
                </p>
                <div className="flex items-baseline gap-1 mb-5">
                  <span className="text-3xl font-extrabold text-white">9,99 €</span>
                  <span className="text-slate-400 text-sm">/mois</span>
                </div>
                <Link
                  href="/subscribe"
                  className="block text-center w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3 rounded-xl transition-all duration-200 shadow-lg shadow-blue-700/30 hover:shadow-blue-600/40 hover:-translate-y-px"
                >
                  Devenir Membre Premium
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Catalog Section ───────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        
        {/* Section header */}
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-800 flex items-center gap-2">
              <span className="w-1 h-7 rounded-full bg-gradient-to-b from-blue-500 to-indigo-600 inline-block" />
              Nos formations
            </h2>
            <p className="text-slate-400 text-sm mt-0.5 ml-3">
              {courses.length > 0
                ? `${courses.length} module${courses.length > 1 ? "s" : ""} disponible${courses.length > 1 ? "s" : ""}`
                : "Découvrez nos modules de cours interactifs"}
            </p>
          </div>
          
          {/* Categories Filter */}
          <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
            {categories.map((cat) => {
              const isActive = (category === "" && cat === "Tous") || category === cat;
              const linkParams = new URLSearchParams();
              if (search) linkParams.set("search", search);
              if (cat !== "Tous") linkParams.set("category", cat);
              
              return (
                <Link
                  key={cat}
                  href={`/?${linkParams.toString()}`}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-sm"
                  }`}
                >
                  {cat}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Courses grid */}
        {courses.length === 0 ? (
          <div className="text-center py-24 bg-white border border-slate-100 rounded-3xl shadow-sm">
            <div className="text-5xl mb-4">📚</div>
            <h3 className="text-lg font-bold text-slate-700 mb-2">Aucune formation disponible</h3>
            <p className="text-slate-400 text-sm max-w-md mx-auto">
              Veuillez configurer et seeder la base de données, ou modifier vos filtres pour voir nos cours.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {courses.map((course, index) => {
              const totalChapters = course.chapters.length;
              const totalLessons = course.chapters.reduce((acc: number, ch: any) => acc + ch.lessons.length, 0);
              const progress = userProgressMap[course.id] || 0;
              
              return (
                <CourseCard
                  key={course.id}
                  id={course.id}
                  title={course.title}
                  description={course.description || ""}
                  imageUrl={course.imageUrl || ""}
                  category={course.category || "Général"}
                  totalChapters={totalChapters}
                  totalLessons={totalLessons}
                  progress={progress}
                  isLoggedIn={!!session}
                  animationDelay={index * 80}
                />
              );
            })}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-4">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-400 font-medium">
          © {new Date().getFullYear()} Le Chinois Vite et Bien — Tous droits réservés
        </div>
      </footer>
    </div>
  );
}
