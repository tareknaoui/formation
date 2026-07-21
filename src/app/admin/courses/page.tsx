import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { PlusCircle, Edit, ExternalLink, ArrowLeft } from "lucide-react";

export default async function AdminCoursesPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/");
  }

  let courses: any[] = [];
  try {
    courses = await db.course.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    console.error("Error loading courses for admin:", err);
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-10 space-y-6">
        
        {/* Breadcrumb back */}
        <Link
          href="/admin"
          className="text-xs font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour au dashboard admin
        </Link>

        {/* Header Title with action */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800">Gestion des formations</h1>
            <p className="text-slate-500 text-xs">Créez et configurez les leçons, les chapitres et les vidéos de vos formations.</p>
          </div>
          
          <Link
            href="/admin/courses/new"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-sm shadow-blue-500/10 transition"
          >
            <PlusCircle className="h-4.5 w-4.5" />
            Nouveau cours
          </Link>
        </div>

        {/* Courses Table / Cards */}
        {courses.length === 0 ? (
          <div className="bg-white border border-slate-150 rounded-2xl p-12 text-center shadow-sm">
            <p className="text-slate-500 font-light text-sm mb-4">Aucune formation n'a été créée pour le moment.</p>
            <Link
              href="/admin/courses/new"
              className="text-blue-600 hover:underline text-xs font-bold"
            >
              Créer votre première formation maintenant
            </Link>
          </div>
        ) : (
          <div className="bg-white border border-slate-150 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/75 border-b border-slate-150 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    <th className="px-6 py-4">Formation</th>
                    <th className="px-6 py-4">Catégorie</th>
                    <th className="px-6 py-4">Statut</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-150 text-xs font-semibold text-slate-700">
                  {courses.map((course) => (
                    <tr key={course.id} className="hover:bg-slate-50/30 transition">
                      <td className="px-6 py-4 flex items-center gap-3">
                        {course.imageUrl && (
                          <div className="h-9 w-14 rounded overflow-hidden bg-slate-100 border border-slate-150 shrink-0">
                            <img src={course.imageUrl} alt={course.title} className="h-full w-full object-cover" />
                          </div>
                        )}
                        <span className="font-bold text-slate-800 line-clamp-1 max-w-[240px]">{course.title}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full text-[10px] uppercase font-bold">
                          {course.category || "Général"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {course.isPublished ? (
                          <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full text-[10px] uppercase font-bold border border-emerald-100">
                            Publié
                          </span>
                        ) : (
                          <span className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full text-[10px] uppercase font-bold border border-amber-100">
                            Brouillon
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end items-center gap-2">
                          <Link
                            href={`/courses/${course.id}`}
                            target="_blank"
                            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 transition"
                            title="Voir l'aperçu"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                          <Link
                            href={`/admin/courses/${course.id}`}
                            className="bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 font-bold border border-slate-200/60 hover:border-blue-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition"
                          >
                            <Edit className="h-3.5 w-3.5" />
                            Gérer
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
