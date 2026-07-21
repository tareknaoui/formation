import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BookOpen, ChevronRight, Layers, Play, CheckCircle, Lock } from "lucide-react";

interface CoursePageProps {
  params: Promise<{
    courseId: string;
  }>;
}

export default async function CourseDetailPage({ params }: CoursePageProps) {
  const { courseId } = await params;
  const session = await getServerSession(authOptions);
  
  const course = await db.course.findUnique({
    where: { id: courseId },
    include: {
      chapters: {
        where: { isPublished: true },
        include: {
          lessons: {
            where: { isPublished: true },
            orderBy: { position: "asc" },
          },
        },
        orderBy: { position: "asc" },
      },
    },
  });

  if (!course) {
    redirect("/");
  }

  // Find first lesson in the curriculum
  const firstLesson = course.chapters[0]?.lessons[0];

  // Fetch completed lessons for current user
  let completedLessonIds: string[] = [];
  let isSubscribed = false;

  if (session?.user?.id) {
    isSubscribed = session.user.isSubscribed;
    try {
      const progress = await db.userProgress.findMany({
        where: {
          userId: session.user.id,
          isCompleted: true,
        },
        select: { lessonId: true },
      });
      completedLessonIds = progress.map((p) => p.lessonId);
    } catch (err) {
      console.error("Error fetching completed lessons:", err);
    }
  }

  const totalLessons = course.chapters.reduce((acc, ch) => acc + ch.lessons.length, 0);
  const totalCompleted = course.chapters.flatMap(ch => ch.lessons).filter(l => completedLessonIds.includes(l.id)).length;
  const progressPercent = totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Course Header Banner */}
      <div className="bg-slate-900 text-white py-12 px-4 border-b border-slate-800">
        <div className="max-w-4xl mx-auto">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-2">
            {course.category || "Formation"}
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">{course.title}</h1>
          <p className="text-slate-300 font-light text-base md:text-lg max-w-3xl mb-6">
            {course.description}
          </p>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400">
            <span className="flex items-center gap-1.5">
              <Layers className="h-4 w-4 text-blue-500" />
              {course.chapters.length} {course.chapters.length > 1 ? "chapitres" : "chapitre"}
            </span>
            <span className="flex items-center gap-1.5">
              <BookOpen className="h-4 w-4 text-blue-500" />
              {totalLessons} {totalLessons > 1 ? "leçons" : "leçon"}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10 w-full flex-1 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left / Curriculum Column */}
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-xl font-extrabold text-slate-800 border-b border-slate-100 pb-2">Programme du cours</h2>
          
          {course.chapters.length === 0 ? (
            <p className="text-slate-400 text-sm">Le programme n'a pas encore été publié pour cette formation.</p>
          ) : (
            <div className="space-y-4">
              {course.chapters.map((chapter) => (
                <div key={chapter.id} className="border border-slate-200/60 rounded-2xl overflow-hidden bg-white shadow-sm">
                  {/* Chapter info */}
                  <div className="bg-slate-50/50 p-4 border-b border-slate-100 flex justify-between items-center">
                    <div>
                      <h3 className="font-extrabold text-sm text-slate-850">
                        Chapitre {chapter.position} : {chapter.title}
                      </h3>
                      {chapter.description && (
                        <p className="text-xs text-slate-400 font-light mt-0.5">{chapter.description}</p>
                      )}
                    </div>
                  </div>
                  
                  {/* Lessons list */}
                  <div className="divide-y divide-slate-100">
                    {chapter.lessons.map((lesson) => {
                      const isCompleted = completedLessonIds.includes(lesson.id);
                      
                      return (
                        <div key={lesson.id} className="p-3.5 flex items-center justify-between text-sm group hover:bg-slate-50/50 transition">
                          <div className="flex items-center gap-3">
                            {isCompleted ? (
                              <CheckCircle className="h-4.5 w-4.5 text-emerald-500" />
                            ) : !isSubscribed && session?.user?.role !== "ADMIN" ? (
                              <Lock className="h-4.5 w-4.5 text-slate-400" />
                            ) : (
                              <Play className="h-4.5 w-4.5 text-blue-500 fill-blue-50/20 group-hover:scale-110 transition" />
                            )}
                            <span className="font-medium text-slate-700">{lesson.title}</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {lesson.duration && (
                              <span className="text-xs text-slate-400 font-semibold mr-1">{lesson.duration}</span>
                            )}
                            {session && (isSubscribed || session.user.role === "ADMIN") && (
                              <Link
                                href={`/courses/${courseId}/lessons/${lesson.id}`}
                                className="text-blue-600 hover:text-blue-800 text-xs font-bold flex items-center"
                              >
                                Commencer
                                <ChevronRight className="h-3 w-3" />
                              </Link>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right / CTA Column */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm space-y-5 sticky top-20">
            {course.imageUrl && (
              <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-200/50">
                <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover" />
              </div>
            )}

            {/* Progress status if logged in */}
            {session ? (
              <div className="space-y-4">
                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
                    <span>Progression du cours</span>
                    <span className="text-blue-600 font-bold">{progressPercent}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full transition-all duration-300" style={{ width: `${progressPercent}%` }}></div>
                  </div>
                </div>

                {firstLesson ? (
                  isSubscribed || session.user.role === "ADMIN" ? (
                    <Link
                      href={`/courses/${courseId}/lessons/${firstLesson.id}`}
                      className="block text-center w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition shadow-md shadow-blue-600/10"
                    >
                      {progressPercent > 0 ? "Reprendre l'apprentissage" : "Commencer la formation"}
                    </Link>
                  ) : (
                    <div className="space-y-3">
                      <div className="bg-amber-50 border border-amber-200/60 p-3 rounded-xl flex gap-2">
                        <Lock className="h-4.5 w-4.5 text-amber-500 shrink-0 mt-0.5" />
                        <p className="text-xs text-amber-700 leading-relaxed font-light">
                          L'accès aux leçons vidéos nécessite un abonnement Premium Plus actif.
                        </p>
                      </div>
                      <Link
                        href="/subscribe"
                        className="block text-center w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition shadow-md"
                      >
                        S'abonner maintenant
                      </Link>
                    </div>
                  )
                ) : (
                  <button disabled className="w-full bg-slate-100 text-slate-400 font-bold py-3 rounded-xl cursor-not-allowed">
                    Aucune leçon disponible
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-4 pt-2 border-t border-slate-100">
                <p className="text-xs text-slate-400 text-center leading-relaxed font-light">Connectez-vous pour commencer à apprendre et enregistrer votre progression.</p>
                <Link
                  href="/auth/signin"
                  className="block text-center w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition"
                >
                  Se connecter
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
