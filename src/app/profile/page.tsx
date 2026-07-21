import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { BookOpen, CheckCircle, Clock, Star, PlayCircle, Award, Calendar, ExternalLink } from "lucide-react";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  const userId = session.user.id;

  // 1. Fetch user progress with course context
  const progresses = await db.userProgress.findMany({
    where: {
      userId,
      isCompleted: true,
    },
    include: {
      lesson: {
        include: {
          chapter: {
            include: {
              course: true,
            },
          },
        },
      },
    },
  });

  // Calculate enrolled courses and progress metrics
  const courseMap: Record<string, { title: string; category: string; completed: number; total: number; imageUrl: string }> = {};

  for (const prog of progresses) {
    const course = prog.lesson.chapter.course;
    if (!courseMap[course.id]) {
      const totalLessons = await db.lesson.count({
        where: {
          chapter: {
            courseId: course.id,
            isPublished: true,
          },
          isPublished: true,
        },
      });

      courseMap[course.id] = {
        title: course.title,
        category: course.category || "Général",
        imageUrl: course.imageUrl || "",
        completed: 0,
        total: totalLessons,
      };
    }
    courseMap[course.id].completed += 1;
  }

  const enrolledCourses = Object.entries(courseMap).map(([id, info]) => ({
    id,
    title: info.title,
    category: info.category,
    imageUrl: info.imageUrl,
    progress: info.total > 0 ? Math.round((info.completed / info.total) * 100) : 0,
  }));

  // 2. Last watched/updated lesson
  const lastProgress = await db.userProgress.findFirst({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    include: {
      lesson: {
        include: {
          chapter: {
            include: {
              course: true,
            },
          },
        },
      },
    },
  });

  // 3. Fetch active subscription details
  const activeSub = await db.subscription.findFirst({
    where: {
      userId,
      status: "ACTIVE",
    },
    orderBy: { startDate: "desc" },
  });

  const totalLessonsCompleted = progresses.length;
  const enrolledCoursesCount = enrolledCourses.length;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-10 space-y-8">
        
        {/* Profile Card Header */}
        <div className="bg-white border border-slate-100 p-6 md:p-8 rounded-3xl shadow-sm flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-5 text-center md:text-left">
            {/* User initials avatar */}
            <div className="h-20 w-20 bg-gradient-to-tr from-blue-600 to-indigo-650 rounded-full flex items-center justify-center text-white font-extrabold text-2xl shadow-md uppercase">
              {session.user.name ? session.user.name.substring(0, 2) : session.user.email?.substring(0, 2)}
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl font-extrabold text-slate-800">
                {session.user.name || "Apprenant"}
              </h1>
              <p className="text-slate-400 font-medium text-sm">{session.user.email}</p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
                <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  Rôle : {session.user.role}
                </span>
                {session.user.isSubscribed || session.user.role === "ADMIN" ? (
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-250 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                    Premium Plus Actif
                  </span>
                ) : (
                  <span className="bg-amber-50 text-amber-700 border border-amber-250 px-3 py-1 rounded-full text-xs font-bold">
                    Compte Standard
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Subscription Action Info */}
          {activeSub && (
            <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-2xl flex items-center gap-3 text-sm text-blue-700 max-w-sm font-medium">
              <Calendar className="h-5 w-5 text-blue-500 shrink-0" />
              <div>
                <p className="font-bold">Abonné Premium Plus</p>
                <p className="text-xs text-blue-500 font-light mt-0.5">
                  Prochain renouvellement : {activeSub.endDate ? new Date(activeSub.endDate).toLocaleDateString("fr-FR") : "Jamais"}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm flex items-center gap-4">
            <div className="h-12 w-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Formations suivies</p>
              <p className="text-2xl font-extrabold text-slate-800">{enrolledCoursesCount}</p>
            </div>
          </div>

          <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm flex items-center gap-4">
            <div className="h-12 w-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 shrink-0">
              <CheckCircle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Leçons validées</p>
              <p className="text-2xl font-extrabold text-slate-800">{totalLessonsCompleted}</p>
            </div>
          </div>

          <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm flex items-center gap-4">
            <div className="h-12 w-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 shrink-0">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Statut global</p>
              <p className="text-sm font-extrabold text-indigo-700">
                {totalLessonsCompleted > 5 ? "Étudiant Confirmé" : "Étudiant Débutant"}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section Split: Course history & Last Watched */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Enrolled Courses list */}
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-lg font-extrabold text-slate-800">Mes formations en cours</h2>
            
            {enrolledCourses.length === 0 ? (
              <div className="bg-white p-8 border border-slate-100 rounded-2xl text-center shadow-sm">
                <Clock className="h-8 w-8 text-slate-350 mx-auto mb-3" />
                <p className="text-slate-500 font-light text-sm">Vous n'avez pas encore commencé de formation.</p>
                <Link href="/" className="text-blue-600 hover:underline text-xs font-bold mt-2 inline-block">
                  Parcourir le catalogue
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {enrolledCourses.map((course) => (
                  <div key={course.id} className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm flex gap-4 items-center justify-between">
                    <div className="flex items-center gap-3.5 min-w-0">
                      {course.imageUrl && (
                        <div className="h-12 w-20 rounded-lg overflow-hidden bg-slate-150 border border-slate-100 shrink-0 hidden sm:block">
                          <img src={course.imageUrl} alt={course.title} className="h-full w-full object-cover" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <Link href={`/courses/${course.id}`} className="font-bold text-slate-800 hover:text-blue-600 transition block truncate text-sm">
                          {course.title}
                        </Link>
                        <span className="text-[10px] bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded-full uppercase">
                          {course.category}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      {/* Course progress */}
                      <div className="flex flex-col items-end w-24">
                        <span className="text-xs font-bold text-slate-500">{course.progress}%</span>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1">
                          <div className="bg-blue-600 h-full rounded-full" style={{ width: `${course.progress}%` }}></div>
                        </div>
                      </div>

                      <Link
                        href={`/courses/${course.id}`}
                        className="text-slate-400 hover:text-blue-600 p-1.5 rounded-full hover:bg-slate-50 transition"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Last Watched panel */}
          <div className="space-y-4">
            <h2 className="text-lg font-extrabold text-slate-800">Dernière leçon lue</h2>
            
            {lastProgress ? (
              <div className="bg-white border border-slate-150 p-5 rounded-2xl shadow-sm space-y-4">
                <div className="flex items-center gap-2">
                  <PlayCircle className="h-5 w-5 text-blue-600 shrink-0" />
                  <span className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">
                    {lastProgress.lesson.chapter.course.category || "Démo"}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-extrabold text-slate-800 text-sm leading-snug line-clamp-2">
                    {lastProgress.lesson.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium line-clamp-1">
                    Formation : {lastProgress.lesson.chapter.course.title}
                  </p>
                </div>

                <Link
                  href={`/courses/${lastProgress.lesson.chapter.courseId}/lessons/${lastProgress.lesson.id}`}
                  className="block text-center w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs transition shadow-sm"
                >
                  Reprendre la lecture
                </Link>
              </div>
            ) : (
              <div className="bg-white p-6 border border-slate-100 rounded-2xl text-center shadow-sm">
                <p className="text-slate-400 text-xs font-light">Aucune vidéo consultée récemment.</p>
              </div>
            )}
          </div>
        </div>

      </main>
    </div>
  );
}
