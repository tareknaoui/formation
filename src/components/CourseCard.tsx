import Link from "next/link";
import { BookOpen, Layers, Play } from "lucide-react";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  totalChapters: number;
  totalLessons: number;
  progress: number; // 0 to 100
  isLoggedIn: boolean;
  animationDelay?: number;
}

const CATEGORY_COLORS: Record<string, string> = {
  "Débutant":     "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Intermédiaire":"bg-amber-50 text-amber-700 border-amber-200",
  "Avancé":       "bg-red-50 text-red-700 border-red-200",
  "Général":      "bg-blue-50 text-blue-700 border-blue-200",
};

export default function CourseCard({
  id,
  title,
  description,
  imageUrl,
  category,
  totalChapters,
  totalLessons,
  progress,
  isLoggedIn,
  animationDelay = 0,
}: CourseCardProps) {
  const fallbackImage =
    "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&auto=format&fit=crop&q=60";

  const badgeClass =
    CATEGORY_COLORS[category] ||
    "bg-blue-50 text-blue-700 border-blue-200";

  return (
    <div
      className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full group animate-fade-in-up"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      {/* Course Image */}
      <Link href={`/courses/${id}`} className="relative block aspect-video overflow-hidden bg-slate-100">
        <img
          src={imageUrl || fallbackImage}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg scale-75 group-hover:scale-100 transition-transform duration-300">
            <Play className="h-5 w-5 text-blue-600 fill-blue-600" />
          </div>
        </div>
        {/* Category badge */}
        <div className={`absolute top-3 left-3 border px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm backdrop-blur-sm bg-white/90 ${badgeClass}`}>
          {category}
        </div>
        {/* Progress overlay badge (if logged in & started) */}
        {isLoggedIn && progress > 0 && (
          <div className="absolute top-3 right-3 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
            {progress}%
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <Link href={`/courses/${id}`}>
            <h3 className="text-base font-bold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-1 mb-2">
              {title}
            </h3>
          </Link>
          <p className="text-slate-500 text-sm line-clamp-2 mb-4 font-light leading-relaxed">
            {description}
          </p>
        </div>

        <div>
          {/* Chapter & Lesson count */}
          <div className="flex items-center gap-4 text-xs font-semibold text-slate-400 mb-4">
            <div className="flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5" />
              <span>{totalChapters} {totalChapters > 1 ? "chapitres" : "chapitre"}</span>
            </div>
            <div className="w-px h-3.5 bg-slate-200" />
            <div className="flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5" />
              <span>{totalLessons} {totalLessons > 1 ? "leçons" : "leçon"}</span>
            </div>
          </div>

          {/* Progress Bar (only if user is logged in) */}
          {isLoggedIn && (
            <div className="space-y-2 pt-3 border-t border-slate-100">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
                <span>Progression</span>
                <span className="text-blue-600 font-bold">{progress}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                {progress > 0 ? (
                  <div
                    className="animate-shimmer h-full rounded-full transition-all duration-700"
                    style={{ width: `${progress}%` }}
                  />
                ) : (
                  <div className="bg-slate-200 h-full rounded-full w-0" />
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Link */}
      <div className="px-5 pb-5 pt-0">
        <Link
          href={`/courses/${id}`}
          className="block text-center w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-2.5 rounded-xl text-sm transition-all duration-200 shadow-md shadow-blue-500/15 hover:shadow-blue-500/30 hover:-translate-y-px group-hover:from-blue-500 group-hover:to-indigo-500"
        >
          Découvrir la formation →
        </Link>
      </div>
    </div>
  );
}
