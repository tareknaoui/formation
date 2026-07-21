"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, Eye, Trash, Plus, Pencil, CheckCircle, HelpCircle, 
  Layers, Video, Save, Loader2, Sparkles, AlertCircle 
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

interface Lesson {
  id: string;
  title: string;
  description: string | null;
  videoUrl: string | null;
  position: number;
  duration: string | null;
  isPublished: boolean;
}

interface Chapter {
  id: string;
  title: string;
  description: string | null;
  position: number;
  isPublished: boolean;
  lessons: Lesson[];
}

interface Course {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  category: string | null;
  isPublished: boolean;
}

interface CourseManagerClientProps {
  course: Course;
  chapters: Chapter[];
}

export default function CourseManagerClient({ course: initialCourse, chapters: initialChapters }: CourseManagerClientProps) {
  const router = useRouter();
  const [course, setCourse] = useState<Course>(initialCourse);
  const [chapters, setChapters] = useState<Chapter[]>(initialChapters);
  
  const [isSavingCourse, setIsSavingCourse] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Form states
  const [courseForm, setCourseForm] = useState({
    title: course.title,
    description: course.description || "",
    category: course.category || "Débutant",
    imageUrl: course.imageUrl || "",
    isPublished: course.isPublished,
  });

  // Dialog / Modal toggles and states
  const [activeChapterId, setActiveChapterId] = useState<string | null>(null);
  
  // Chapter Form Modal
  const [chapterModalOpen, setChapterModalOpen] = useState(false);
  const [editingChapterId, setEditingChapterId] = useState<string | null>(null);
  const [chapterForm, setChapterForm] = useState({ title: "", description: "" });

  // Lesson Form Modal
  const [lessonModalOpen, setLessonModalOpen] = useState(false);
  const [editingLessonId, setEditingLessonId] = useState<string | null>(null);
  const [lessonForm, setLessonForm] = useState({
    title: "",
    description: "",
    videoUrl: "",
    duration: "05:00",
  });

  // Save Course Details
  const handleSaveCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingCourse(true);
    try {
      const res = await fetch(`/api/courses/${course.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(courseForm),
      });
      if (res.ok) {
        const updated = await res.json();
        setCourse(updated);
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSavingCourse(false);
    }
  };

  // Delete Course
  const handleDeleteCourse = async () => {
    if (!confirm("Voulez-vous vraiment supprimer ce cours ? Cette action est irréversible.")) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/courses/${course.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.push("/admin/courses");
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  // Chapter handlers
  const openChapterModal = (chap?: Chapter) => {
    if (chap) {
      setEditingChapterId(chap.id);
      setChapterForm({ title: chap.title, description: chap.description || "" });
    } else {
      setEditingChapterId(null);
      setChapterForm({ title: "", description: "" });
    }
    setChapterModalOpen(true);
  };

  const handleSaveChapter = async () => {
    if (!chapterForm.title) return;
    try {
      if (editingChapterId) {
        // Edit
        const res = await fetch(`/api/courses/${course.id}/chapters/${editingChapterId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(chapterForm),
        });
        if (res.ok) {
          const updated = await res.json();
          setChapters(chapters.map(c => c.id === editingChapterId ? { ...c, ...updated } : c));
        }
      } else {
        // Create
        const res = await fetch(`/api/courses/${course.id}/chapters`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(chapterForm),
        });
        if (res.ok) {
          const created = await res.json();
          setChapters([...chapters, { ...created, lessons: [] }]);
        }
      }
      setChapterModalOpen(false);
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteChapter = async (chapId: string) => {
    if (!confirm("Supprimer ce chapitre et toutes ses leçons ?")) return;
    try {
      const res = await fetch(`/api/courses/${course.id}/chapters/${chapId}`, { method: "DELETE" });
      if (res.ok) {
        setChapters(chapters.filter(c => c.id !== chapId));
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Lesson handlers
  const openLessonModal = (chapId: string, les?: Lesson) => {
    setActiveChapterId(chapId);
    if (les) {
      setEditingLessonId(les.id);
      setLessonForm({
        title: les.title,
        description: les.description || "",
        videoUrl: les.videoUrl || "",
        duration: les.duration || "05:00",
      });
    } else {
      setEditingLessonId(null);
      setLessonForm({ title: "", description: "", videoUrl: "", duration: "05:00" });
    }
    setLessonModalOpen(true);
  };

  const handleSaveLesson = async () => {
    if (!lessonForm.title || !activeChapterId) return;
    try {
      if (editingLessonId) {
        // Edit
        const res = await fetch(`/api/courses/${course.id}/chapters/${activeChapterId}/lessons/${editingLessonId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(lessonForm),
        });
        if (res.ok) {
          const updated = await res.json();
          setChapters(chapters.map(c => {
            if (c.id === activeChapterId) {
              return {
                ...c,
                lessons: c.lessons.map(l => l.id === editingLessonId ? updated : l)
              };
            }
            return c;
          }));
        }
      } else {
        // Create
        const res = await fetch(`/api/courses/${course.id}/chapters/${activeChapterId}/lessons`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(lessonForm),
        });
        if (res.ok) {
          const created = await res.json();
          setChapters(chapters.map(c => {
            if (c.id === activeChapterId) {
              return { ...c, lessons: [...c.lessons, created] };
            }
            return c;
          }));
        }
      }
      setLessonModalOpen(false);
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteLesson = async (chapId: string, lesId: string) => {
    if (!confirm("Voulez-vous supprimer cette leçon ?")) return;
    try {
      const res = await fetch(`/api/courses/${course.id}/chapters/${chapId}/lessons/${lesId}`, { method: "DELETE" });
      if (res.ok) {
        setChapters(chapters.map(c => {
          if (c.id === chapId) {
            return { ...c, lessons: c.lessons.filter(l => l.id !== lesId) };
          }
          return c;
        }));
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8 space-y-6">
        
        {/* Back and preview links */}
        <div className="flex items-center justify-between text-xs font-semibold">
          <Link href="/admin/courses" className="text-slate-500 hover:text-blue-600 flex items-center gap-1 transition">
            <ArrowLeft className="h-4 w-4" />
            Retour à la liste des cours
          </Link>
          
          <Link href={`/courses/${course.id}`} target="_blank" className="text-blue-600 hover:text-blue-800 flex items-center gap-1 transition">
            <Eye className="h-4 w-4" />
            Voir la page publique
          </Link>
        </div>

        {/* Dashboard Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800 flex items-center gap-2">
              Configuration du cours
            </h1>
            <p className="text-slate-400 text-xs font-light">Gérez les métadonnées, le programme et la publication du cours.</p>
          </div>
          
          <button
            onClick={handleDeleteCourse}
            disabled={isDeleting}
            className="bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-bold text-xs py-2 px-4 rounded-xl flex items-center justify-center gap-1.5 transition self-start sm:self-center disabled:opacity-50"
          >
            <Trash className="h-4 w-4" />
            {isDeleting ? "Suppression..." : "Supprimer le cours"}
          </button>
        </div>

        {/* Split Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* LEFT: Metadatas form */}
          <div className="md:col-span-1 bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm space-y-5 h-fit">
            <h2 className="font-extrabold text-slate-800 text-base flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-blue-600" />
              Détails du cours
            </h2>
            
            <form onSubmit={handleSaveCourse} className="space-y-4">
              {/* Title */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-slate-450">Titre</label>
                <input
                  type="text"
                  value={courseForm.title}
                  onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-slate-450">Description</label>
                <textarea
                  value={courseForm.description}
                  onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                  rows={3}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Category */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-slate-450">Catégorie</label>
                <select
                  value={courseForm.category}
                  onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="Débutant">Débutant</option>
                  <option value="Intermédiaire">Intermédiaire</option>
                  <option value="Avancé">Avancé</option>
                  <option value="Général">Général</option>
                </select>
              </div>

              {/* Image URL */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-slate-450">Miniature (Image URL)</label>
                <input
                  type="text"
                  value={courseForm.imageUrl}
                  onChange={(e) => setCourseForm({ ...courseForm, imageUrl: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Is Published Toggle */}
              <div className="flex items-center justify-between p-3 border border-slate-100 rounded-xl bg-slate-50/50">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-700">Statut de publication</span>
                  <span className="text-[10px] text-slate-400">Rendre visible dans le catalogue</span>
                </div>
                <input
                  type="checkbox"
                  checked={courseForm.isPublished}
                  onChange={(e) => setCourseForm({ ...courseForm, isPublished: e.target.checked })}
                  className="h-4 w-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSavingCourse}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs shadow-sm flex items-center justify-center gap-1.5 transition disabled:bg-slate-300"
              >
                {isSavingCourse ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
                Enregistrer les détails
              </button>
            </form>
          </div>

          {/* RIGHT: Chapters and Lessons curriculum builder */}
          <div className="md:col-span-2 space-y-6">
            
            <div className="flex items-center justify-between">
              <h2 className="font-extrabold text-slate-800 text-base flex items-center gap-1.5">
                <Layers className="h-4.5 w-4.5 text-blue-600" />
                Curriculum du cours
              </h2>
              <button
                onClick={() => openChapterModal()}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-2 px-3.5 rounded-xl flex items-center gap-1 transition"
              >
                <Plus className="h-3.5 w-3.5" />
                Ajouter un chapitre
              </button>
            </div>

            {/* Chapters list render */}
            {chapters.length === 0 ? (
              <div className="bg-white border border-slate-150 rounded-2xl p-10 text-center shadow-sm flex flex-col items-center justify-center">
                <Layers className="h-10 w-10 text-slate-300 mb-2" />
                <p className="text-slate-500 font-light text-xs">Aucun chapitre créé. Commencez par ajouter un chapitre.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {chapters.map((chapter) => (
                  <div key={chapter.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                    {/* Chapter Header */}
                    <div className="bg-slate-50/50 p-4 border-b border-slate-100 flex justify-between items-center flex-wrap gap-2">
                      <div>
                        <h3 className="font-extrabold text-sm text-slate-800 flex items-center gap-1.5">
                          Chapitre {chapter.position} : {chapter.title}
                        </h3>
                        {chapter.description && (
                          <p className="text-[10px] text-slate-400 font-light mt-0.5">{chapter.description}</p>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => openChapterModal(chapter)}
                          className="p-1 text-slate-400 hover:text-slate-600 rounded hover:bg-slate-100 transition"
                          title="Modifier le chapitre"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteChapter(chapter.id)}
                          className="p-1 text-slate-400 hover:text-red-600 rounded hover:bg-red-50 transition"
                          title="Supprimer le chapitre"
                        >
                          <Trash className="h-3.5 w-3.5" />
                        </button>
                        <div className="h-4 w-px bg-slate-200 mx-1"></div>
                        <button
                          onClick={() => openLessonModal(chapter.id)}
                          className="bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-[10px] uppercase tracking-wide px-2.5 py-1 rounded-full transition flex items-center gap-1"
                        >
                          <Plus className="h-3 w-3" />
                          Ajouter une leçon
                        </button>
                      </div>
                    </div>

                    {/* Lessons list in chapter */}
                    <div className="divide-y divide-slate-100">
                      {chapter.lessons.length === 0 ? (
                        <div className="p-4 text-center text-slate-400 text-xs font-light">
                          Aucune leçon dans ce chapitre. Ajoutez une leçon pour commencer à inclure des vidéos.
                        </div>
                      ) : (
                        chapter.lessons.map((lesson) => (
                          <div key={lesson.id} className="p-3.5 flex items-center justify-between text-xs hover:bg-slate-50/20 transition gap-4">
                            <div className="flex items-center gap-3 min-w-0">
                              <Video className="h-4 w-4 text-slate-400 shrink-0" />
                              <div className="min-w-0">
                                <p className="font-bold text-slate-700 truncate">{lesson.title}</p>
                                {lesson.videoUrl ? (
                                  <p className="text-[10px] text-blue-500 font-medium truncate max-w-xs" title={lesson.videoUrl}>
                                    ID/URL: {lesson.videoUrl}
                                  </p>
                                ) : (
                                  <p className="text-[10px] text-amber-500 font-semibold flex items-center gap-0.5">
                                    <AlertCircle className="h-3 w-3" />
                                    Pas de vidéo Google Drive associée
                                  </p>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2 shrink-0">
                              {lesson.duration && (
                                <span className="text-[10px] text-slate-400 font-semibold">{lesson.duration}</span>
                              )}
                              <button
                                onClick={() => openLessonModal(chapter.id, lesson)}
                                className="p-1 text-slate-400 hover:text-slate-600 rounded hover:bg-slate-100 transition"
                                title="Modifier la leçon"
                              >
                                <Pencil className="h-3.5 w-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteLesson(chapter.id, lesson.id)}
                                className="p-1 text-slate-400 hover:text-red-600 rounded hover:bg-red-50 transition"
                                title="Supprimer la leçon"
                              >
                                <Trash className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </main>

      {/* ================= MODAL CHAPTER FORM ================= */}
      {chapterModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-slate-200 w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <h3 className="font-extrabold text-sm text-slate-800">
                {editingChapterId ? "Modifier le chapitre" : "Ajouter un chapitre"}
              </h3>
              <button onClick={() => setChapterModalOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold text-xs uppercase">Fermer</button>
            </div>
            
            <div className="p-5 space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-slate-450">Titre du chapitre</label>
                <input
                  type="text"
                  placeholder="Ex: Les Salutations de Base"
                  value={chapterForm.title}
                  onChange={(e) => setChapterForm({ ...chapterForm, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50/50"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-slate-450">Description (optionnelle)</label>
                <textarea
                  placeholder="Décrivez brièvement le thème de ce chapitre..."
                  value={chapterForm.description}
                  onChange={(e) => setChapterForm({ ...chapterForm, description: e.target.value })}
                  rows={3}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50/50"
                />
              </div>

              <button
                onClick={handleSaveChapter}
                disabled={!chapterForm.title}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs shadow-sm flex items-center justify-center gap-1.5 transition disabled:bg-slate-300"
              >
                <CheckCircle className="h-4 w-4" />
                {editingChapterId ? "Sauvegarder les modifications" : "Créer le chapitre"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL LESSON FORM ================= */}
      {lessonModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-slate-200 w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <h3 className="font-extrabold text-sm text-slate-800">
                {editingLessonId ? "Modifier la leçon" : "Ajouter une leçon"}
              </h3>
              <button onClick={() => setLessonModalOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold text-xs uppercase">Fermer</button>
            </div>
            
            <div className="p-5 space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-slate-450">Titre de la leçon</label>
                <input
                  type="text"
                  placeholder="Ex: Dire bonjour : Nǐ Hǎo !"
                  value={lessonForm.title}
                  onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50/50"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-slate-450">Description (Contenu)</label>
                <textarea
                  placeholder="Expliquez brièvement le contenu ou ajoutez des notes de cours..."
                  value={lessonForm.description}
                  onChange={(e) => setLessonForm({ ...lessonForm, description: e.target.value })}
                  rows={2}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-slate-450">Durée (Format MM:SS)</label>
                  <input
                    type="text"
                    placeholder="Ex: 06:15"
                    value={lessonForm.duration}
                    onChange={(e) => setLessonForm({ ...lessonForm, duration: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50/50"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-slate-450 flex items-center gap-0.5">
                    Lien Google Drive / ID
                    <span className="cursor-help text-slate-400" title="Collez le lien de partage Google Drive ou directement l'ID du fichier vidéo.">
                      <HelpCircle className="h-3 w-3" />
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Coller le lien de la vidéo"
                    value={lessonForm.videoUrl}
                    onChange={(e) => setLessonForm({ ...lessonForm, videoUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50/50"
                  />
                </div>
              </div>

              <button
                onClick={handleSaveLesson}
                disabled={!lessonForm.title}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs shadow-sm flex items-center justify-center gap-1.5 transition disabled:bg-slate-300"
              >
                <CheckCircle className="h-4 w-4" />
                {editingLessonId ? "Enregistrer les modifications" : "Créer la leçon"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
