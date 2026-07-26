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
  quizzes?: any[];
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

  // Quiz Modal State
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const [activeQuizLessonId, setActiveQuizLessonId] = useState<string | null>(null);
  const [isSavingQuiz, setIsSavingQuiz] = useState(false);
  const [quizForm, setQuizForm] = useState<{
    id?: string;
    title: string;
    description: string;
    passingScore: number;
    questions: {
      prompt: string;
      hanzi: string;
      pinyin: string;
      explanation: string;
      options: { text: string; isCorrect: boolean }[];
    }[];
  }>({
    title: "Quizz de validation",
    description: "Répondez aux questions pour valider vos connaissances sur cette leçon.",
    passingScore: 70,
    questions: [
      {
        prompt: "Que signifie cette expression en chinois ?",
        hanzi: "你好",
        pinyin: "nǐ hǎo",
        explanation: "你好 (nǐ hǎo) est la salutation standard en chinois.",
        options: [
          { text: "Bonjour / Salut", isCorrect: true },
          { text: "Au revoir", isCorrect: false },
          { text: "Merci", isCorrect: false },
          { text: "S'il vous plaît", isCorrect: false },
        ],
      },
    ],
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

  // Quiz Modal handlers
  const openQuizModal = (lesson: Lesson) => {
    setActiveQuizLessonId(lesson.id);
    const existingQuiz = lesson.quizzes && lesson.quizzes.length > 0 ? lesson.quizzes[0] : null;

    if (existingQuiz) {
      setQuizForm({
        id: existingQuiz.id,
        title: existingQuiz.title || `Quizz : ${lesson.title}`,
        description: existingQuiz.description || "Testez votre niveau sur les notions abordées dans cette leçon.",
        passingScore: typeof existingQuiz.passingScore === "number" ? existingQuiz.passingScore : 70,
        questions: Array.isArray(existingQuiz.questions) && existingQuiz.questions.length > 0
          ? existingQuiz.questions.map((q: any) => ({
              prompt: q.prompt || "",
              hanzi: q.hanzi || "",
              pinyin: q.pinyin || "",
              explanation: q.explanation || "",
              options: Array.isArray(q.options)
                ? q.options.map((opt: any) => ({
                    text: opt.text || "",
                    isCorrect: !!opt.isCorrect,
                  }))
                : [
                    { text: "Option 1", isCorrect: true },
                    { text: "Option 2", isCorrect: false },
                  ],
            }))
          : [
              {
                prompt: "Quelle est la traduction exacte ?",
                hanzi: "你好",
                pinyin: "nǐ hǎo",
                explanation: "你好 (nǐ hǎo) est la salutation standard.",
                options: [
                  { text: "Bonjour", isCorrect: true },
                  { text: "Au revoir", isCorrect: false },
                  { text: "Merci", isCorrect: false },
                ],
              },
            ],
      });
    } else {
      setQuizForm({
        id: undefined,
        title: `Quizz : ${lesson.title}`,
        description: "Testez votre niveau sur les notions abordées dans cette leçon.",
        passingScore: 70,
        questions: [
          {
            prompt: "Quelle est la traduction exacte ?",
            hanzi: "你好",
            pinyin: "nǐ hǎo",
            explanation: "你好 (nǐ hǎo) est la salutation standard.",
            options: [
              { text: "Bonjour", isCorrect: true },
              { text: "Au revoir", isCorrect: false },
              { text: "Merci", isCorrect: false },
            ],
          },
        ],
      });
    }
    setQuizModalOpen(true);
  };

  const addQuestionToQuiz = () => {
    setQuizForm((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          prompt: "Nouvelle question",
          hanzi: "",
          pinyin: "",
          explanation: "",
          options: [
            { text: "Option 1", isCorrect: true },
            { text: "Option 2", isCorrect: false },
          ],
        },
      ],
    }));
  };

  const removeQuestionFromQuiz = (index: number) => {
    setQuizForm((prev) => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index),
    }));
  };

  const handleSaveQuiz = async () => {
    if (!activeQuizLessonId || !quizForm.title) return;
    try {
      setIsSavingQuiz(true);
      const res = await fetch("/api/admin/quizzes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...quizForm,
          lessonId: activeQuizLessonId,
        }),
      });

      if (res.ok) {
        const savedQuiz = await res.json();
        setChapters((prevChapters) =>
          prevChapters.map((c) => ({
            ...c,
            lessons: c.lessons.map((l) =>
              l.id === activeQuizLessonId ? { ...l, quizzes: [savedQuiz] } : l
            ),
          }))
        );
        alert("Quizz sauvegardé avec succès !");
        setQuizModalOpen(false);
        router.refresh();
      } else {
        const errorText = await res.text().catch(() => "");
        alert(`Erreur lors de la sauvegarde du quizz : ${errorText || "Erreur serveur"}`);
      }
    } catch (err) {
      console.error("[SAVE_QUIZ_ERROR]", err);
      alert("Une erreur est survenue lors de la sauvegarde.");
    } finally {
      setIsSavingQuiz(false);
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
            <p className="text-slate-400 text-xs font-light">Gérez les métadonnées, le programme et les quizz de révision.</p>
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
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-slate-450">Titre</label>
                <input
                  type="text"
                  value={courseForm.title}
                  onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs text-slate-900 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-slate-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-slate-450">Description</label>
                <textarea
                  value={courseForm.description}
                  onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                  rows={3}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs text-slate-900 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-slate-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-slate-450">Catégorie</label>
                <select
                  value={courseForm.category}
                  onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs text-slate-900 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="Débutant">Débutant</option>
                  <option value="Intermédiaire">Intermédiaire</option>
                  <option value="Avancé">Avancé</option>
                  <option value="Général">Général</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-slate-450">Miniature (Image URL)</label>
                <input
                  type="text"
                  value={courseForm.imageUrl}
                  onChange={(e) => setCourseForm({ ...courseForm, imageUrl: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs text-slate-900 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-slate-400"
                />
              </div>

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
                          Aucune leçon dans ce chapitre.
                        </div>
                      ) : (
                        chapter.lessons.map((lesson) => (
                          <div key={lesson.id} className="p-3.5 flex items-center justify-between text-xs hover:bg-slate-50/20 transition gap-4">
                            <div className="flex items-center gap-3 min-w-0">
                              <Video className="h-4 w-4 text-slate-400 shrink-0" />
                              <div className="min-w-0">
                                <p className="font-bold text-slate-700 truncate">{lesson.title}</p>
                                {lesson.videoUrl && (
                                  <p className="text-[10px] text-blue-500 font-medium truncate max-w-xs" title={lesson.videoUrl}>
                                    ID/URL: {lesson.videoUrl}
                                  </p>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                onClick={() => openQuizModal(lesson)}
                                className="px-2.5 py-1 bg-amber-50 border border-amber-200 text-amber-700 hover:bg-amber-100 font-bold text-[10px] rounded-full flex items-center gap-1 transition"
                                title="Gérer le Quizz pour cette leçon"
                              >
                                <HelpCircle className="h-3 w-3 text-amber-600" />
                                Quizz
                              </button>
                              
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

      {/* ================= MODAL QUIZ FORM ================= */}
      {quizModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
            <div className="p-5 border-b border-slate-100 bg-slate-50 flex justify-between items-center shrink-0">
              <h3 className="font-extrabold text-sm text-slate-800 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-500" />
                Gérer le Quizz de la leçon
              </h3>
              <button onClick={() => setQuizModalOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold text-xs uppercase">Fermer</button>
            </div>
            
            <div className="p-6 space-y-6 overflow-y-auto flex-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1 col-span-2 sm:col-span-1">
                  <label className="text-[10px] font-bold uppercase text-slate-400">Titre du Quizz</label>
                  <input
                    type="text"
                    value={quizForm.title}
                    onChange={(e) => setQuizForm({ ...quizForm, title: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs text-slate-900 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1 col-span-2 sm:col-span-1">
                  <label className="text-[10px] font-bold uppercase text-slate-400">Seuil de réussite (%)</label>
                  <input
                    type="number"
                    value={quizForm.passingScore}
                    onChange={(e) => setQuizForm({ ...quizForm, passingScore: parseInt(e.target.value) || 70 })}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs text-slate-900 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider">
                    Questions du Quizz ({quizForm.questions.length})
                  </h4>
                  <button
                    type="button"
                    onClick={addQuestionToQuiz}
                    className="px-3 py-1.5 bg-blue-50 text-blue-700 font-bold text-xs rounded-full hover:bg-blue-100 transition flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Ajouter une question
                  </button>
                </div>

                {quizForm.questions.map((q, qIdx) => (
                  <div key={qIdx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3 relative">
                    <div className="flex justify-between items-center">
                      <span className="font-extrabold text-xs text-slate-700">Question {qIdx + 1}</span>
                      {quizForm.questions.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeQuestionFromQuiz(qIdx)}
                          className="text-red-500 hover:text-red-700 text-xs font-bold"
                        >
                          Supprimer
                        </button>
                      )}
                    </div>

                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="Intitulé de la question (ex: Que veut dire...)"
                        value={q.prompt}
                        onChange={(e) => {
                          const updated = [...quizForm.questions];
                          updated[qIdx].prompt = e.target.value;
                          setQuizForm({ ...quizForm, questions: updated });
                        }}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white"
                      />

                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="Sinogrammes Hanzi (ex: 你好)"
                          value={q.hanzi || ""}
                          onChange={(e) => {
                            const updated = [...quizForm.questions];
                            updated[qIdx].hanzi = e.target.value;
                            setQuizForm({ ...quizForm, questions: updated });
                          }}
                          className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs bg-white"
                        />

                        <input
                          type="text"
                          placeholder="Prononciation Pinyin (ex: nǐ hǎo)"
                          value={q.pinyin || ""}
                          onChange={(e) => {
                            const updated = [...quizForm.questions];
                            updated[qIdx].pinyin = e.target.value;
                            setQuizForm({ ...quizForm, questions: updated });
                          }}
                          className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs bg-white"
                        />
                      </div>

                      <div className="space-y-2 pt-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Options de réponse (Cochez la bonne réponse)</label>
                        {q.options.map((opt, optIdx) => (
                          <div key={optIdx} className="flex items-center gap-2">
                            <input
                              type="radio"
                              name={`correct-${qIdx}`}
                              checked={opt.isCorrect}
                              onChange={() => {
                                const updated = [...quizForm.questions];
                                updated[qIdx].options = updated[qIdx].options.map((o, idx) => ({
                                  ...o,
                                  isCorrect: idx === optIdx,
                                }));
                                setQuizForm({ ...quizForm, questions: updated });
                              }}
                              className="h-4 w-4 text-blue-600"
                            />
                            <input
                              type="text"
                              placeholder={`Option ${optIdx + 1}`}
                              value={opt.text}
                              onChange={(e) => {
                                const updated = [...quizForm.questions];
                                updated[qIdx].options[optIdx].text = e.target.value;
                                setQuizForm({ ...quizForm, questions: updated });
                              }}
                              className="flex-1 px-3 py-1.5 border border-slate-200 rounded-lg text-xs bg-white"
                            />
                          </div>
                        ))}
                      </div>

                      <input
                        type="text"
                        placeholder="Explication (optionnelle)"
                        value={q.explanation || ""}
                        onChange={(e) => {
                          const updated = [...quizForm.questions];
                          updated[qIdx].explanation = e.target.value;
                          setQuizForm({ ...quizForm, questions: updated });
                        }}
                        className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs bg-white text-slate-600"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setQuizModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 font-bold text-xs"
              >
                Annuler
              </button>

              <button
                type="button"
                onClick={handleSaveQuiz}
                disabled={isSavingQuiz}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 transition shadow-sm"
              >
                {isSavingQuiz ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                Sauvegarder le Quizz
              </button>
            </div>
          </div>
        </div>
      )}

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
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs text-slate-900 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-slate-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-slate-450">Description (optionnelle)</label>
                <textarea
                  placeholder="Décrivez brièvement le thème de ce chapitre..."
                  value={chapterForm.description}
                  onChange={(e) => setChapterForm({ ...chapterForm, description: e.target.value })}
                  rows={3}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs text-slate-900 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-slate-400"
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
        <div className="fixed inset-0 bg-[#0B0F19]/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
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
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs text-slate-900 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-slate-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-slate-450">Description (Contenu)</label>
                <textarea
                  placeholder="Expliquez brièvement le contenu ou ajoutez des notes de cours..."
                  value={lessonForm.description}
                  onChange={(e) => setLessonForm({ ...lessonForm, description: e.target.value })}
                  rows={2}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs text-slate-900 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-slate-400"
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
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs text-slate-900 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-slate-400"
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
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs text-slate-900 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-slate-400"
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
