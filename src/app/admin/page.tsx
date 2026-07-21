import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { BookOpen, Users, CreditCard, ChevronRight, Settings } from "lucide-react";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/");
  }

  // Fetch admin statistics
  let totalCourses = 0;
  let totalUsers = 0;
  let activeSubscriptions = 0;

  try {
    totalCourses = await db.course.count();
    totalUsers = await db.user.count();
    activeSubscriptions = await db.subscription.count({
      where: { status: "ACTIVE" },
    });
  } catch (err) {
    console.error("Error loading admin stats:", err);
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-10 space-y-8">
        
        {/* Header Title */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-sm shadow-blue-500/10">
            <Settings className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800">Dashboard Administrateur</h1>
            <p className="text-slate-500 text-xs">Gérez votre catalogue de formations, vos abonnés et suivez les statistiques globales.</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Formations</p>
              <p className="text-3xl font-extrabold text-slate-800">{totalCourses}</p>
            </div>
            <div className="h-12 w-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
              <BookOpen className="h-6 w-6" />
            </div>
          </div>

          <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Utilisateurs</p>
              <p className="text-3xl font-extrabold text-slate-800">{totalUsers}</p>
            </div>
            <div className="h-12 w-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
              <Users className="h-6 w-6" />
            </div>
          </div>

          <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Abonnements actifs</p>
              <p className="text-3xl font-extrabold text-slate-800">{activeSubscriptions}</p>
            </div>
            <div className="h-12 w-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
              <CreditCard className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Administrative Quick Actions Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Manage Courses Card */}
          <div className="bg-white border border-slate-150 p-6 rounded-2xl shadow-sm hover:shadow-md transition flex flex-col justify-between h-56">
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                Gestion des Formations
              </h3>
              <p className="text-slate-400 font-light text-xs leading-relaxed">
                Créez de nouvelles formations, organisez-les en chapitres et associez vos leçons vidéos hébergées sur Google Drive. Publiez-les ensuite instantanément pour vos abonnés.
              </p>
            </div>
            <Link
              href="/admin/courses"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-1 shadow-sm transition"
            >
              Gérer les formations
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Manage Users Card */}
          <div className="bg-white border border-slate-150 p-6 rounded-2xl shadow-sm hover:shadow-md transition flex flex-col justify-between h-56">
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Users className="h-5 w-5 text-indigo-600" />
                Gestion des Abonnés & Rôles
              </h3>
              <p className="text-slate-400 font-light text-xs leading-relaxed">
                Visualisez la liste des utilisateurs enregistrés sur votre plateforme. Modifiez manuellement leurs rôles (administrateurs) ou activez directement leurs abonnements Premium Plus pour des tests.
              </p>
            </div>
            <Link
              href="/admin/users"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-1 shadow-sm transition"
            >
              Gérer les utilisateurs
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

        </div>

      </main>
    </div>
  );
}
