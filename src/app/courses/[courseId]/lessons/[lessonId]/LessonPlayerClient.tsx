"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight, BookOpen, CheckCircle, HelpCircle, Video } from "lucide-react";
import Navbar from "@/components/Navbar";
import VideoPlayer from "@/components/VideoPlayer";
import CourseSidebar from "@/components/CourseSidebar";
import QuizComponent, { QuizData } from "@/components/QuizComponent";

interface Lesson {
  id: string;
  title: string;
  description: string | null;
  videoUrl: string | null;
  position: number;
}

interface SidebarChapter {
  id: string;
  title: string;
  position: number;
  lessons: {
    id: string;
    title: string;
    duration: string | null;
    position: number;
  }[];
}

interface LessonPlayerClientProps {
  courseId: string;
  courseTitle: string;
  lesson: Lesson;
  quiz?: QuizData | null;
  chapters: SidebarChapter[];
  initialCompletedLessonIds: string[];
  isSubscribed: boolean;
  prevLessonId: string | null;
  nextLessonId: string | null;
}

export default function LessonPlayerClient({
  courseId,
  courseTitle,
  lesson,
  quiz,
  chapters,
  initialCompletedLessonIds,
  isSubscribed,
  prevLessonId,
  nextLessonId,
}: LessonPlayerClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"video" | "quiz">("video");
  const [completedIds, setCompletedIds] = useState<string[]>(initialCompletedLessonIds);
  const [isPending, startTransition] = useTransition();

  const isCurrentCompleted = completedIds.includes(lesson.id);

  const handleToggleComplete = async () => {
    try {
      const response = await fetch(`/api/lessons/${lesson.id}/progress`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isCompleted: !isCurrentCompleted }),
      });

      if (!response.ok) {
        throw new Error("Impossible de sauvegarder la progression.");
      }

      if (isCurrentCompleted) {
        setCompletedIds(completedIds.filter((id) => id !== lesson.id));
      } else {
        setCompletedIds([...completedIds, lesson.id]);
        
        if (nextLessonId) {
          setTimeout(() => {
            startTransition(() => {
              router.push(`/courses/${courseId}/lessons/${nextLessonId}`);
            });
          }, 600);
        } else {
          setTimeout(() => {
            startTransition(() => {
              router.push(`/courses/${courseId}`);
            });
          }, 800);
        }
      }
      
      router.refresh();

    } catch (error) {
      console.error("[TOGGLE_PROGRESS_ERROR]", error);
    }
  };

  const handleQuizComplete = (score: number, passed: boolean) => {
    if (passed && !isCurrentCompleted) {
      setCompletedIds((prev) => [...prev, lesson.id]);
      router.refresh();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />

      <div className="flex-1 flex flex-col md:flex-row max-w-7xl mx-auto w-full px-0 sm:px-4 md:px-6 lg:px-8 py-0 md:py-6 gap-0 md:gap-6">
        {/* Left Column: Player & Meta */}
        <div className="flex-1 space-y-6 p-4 md:p-0">
          
          {/* Back button & Nav */}
          <div className="flex items-center justify-between">
            <Link
              href={`/courses/${courseId}`}
              className="text-xs font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1 transition"
            >
              <ChevronLeft className="h-4 w-4" />
              Retour à la formation
            </Link>
            
            <div className="flex items-center gap-2">
              {prevLessonId ? (
                <Link
                  href={`/courses/${courseId}/lessons/${prevLessonId}`}
                  className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition"
                  title="Précédent"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Link>
              ) : (
                <button
                  disabled
                  className="p-1.5 rounded-lg border border-slate-100 bg-slate-50 text-slate-350 cursor-not-allowed"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
              )}

              {nextLessonId ? (
                <Link
                  href={`/courses/${courseId}/lessons/${nextLessonId}`}
                  className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition"
                  title="Suivant"
                >
                  <ChevronRight className="h-4 w-4" />
                </Link>
              ) : (
                <button
                  disabled
                  className="p-1.5 rounded-lg border border-slate-100 bg-slate-50 text-slate-350 cursor-not-allowed"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Video Player */}
          <VideoPlayer
            videoUrl={lesson.videoUrl || ""}
            onComplete={handleToggleComplete}
            isCompleted={isCurrentCompleted}
            hasNext={!!nextLessonId}
          />

          {/* Navigation Tabs (Description vs Quiz) */}
          <div className="flex items-center gap-2 border-b border-slate-200 pt-2">
            <button
              onClick={() => setActiveTab("video")}
              className={`pb-3 px-4 font-bold text-xs flex items-center gap-2 border-b-2 transition ${
                activeTab === "video"
                  ? "border-[#FA4949] text-[#FA4949]"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              <Video className="w-4 h-4" />
              À propos de la leçon
            </button>

            <button
              onClick={() => setActiveTab("quiz")}
              className={`pb-3 px-4 font-bold text-xs flex items-center gap-2 border-b-2 transition ${
                activeTab === "quiz"
                  ? "border-[#FA4949] text-[#FA4949]"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              Quizz & Exercices
              {quiz && quiz.questions.length > 0 && (
                <span className="bg-[#FA4949] text-white text-[10px] px-2 py-0.5 rounded-full">
                  {quiz.questions.length}
                </span>
              )}
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "video" ? (
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <span className="text-[10px] text-[#FA4949] font-bold uppercase tracking-wider bg-red-50 px-2.5 py-1 rounded-full">
                    Leçon {lesson.position}
                  </span>
                  <h1 className="text-xl md:text-2xl font-extrabold text-slate-800 mt-2.5">
                    {lesson.title}
                  </h1>
                </div>
                {isCurrentCompleted && (
                  <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold shrink-0">
                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                    Complété
                  </div>
                )}
              </div>

              {lesson.description && (
                <div className="text-slate-600 text-sm font-light leading-relaxed border-t border-slate-100 pt-4">
                  {lesson.description}
                </div>
              )}
            </div>
          ) : (
            <div>
              {quiz ? (
                <QuizComponent quiz={quiz} onComplete={handleQuizComplete} />
              ) : (
                <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm text-center">
                  <HelpCircle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                  <h3 className="font-bold text-slate-800 text-lg">Aucun Quizz disponible pour cette leçon</h3>
                  <p className="text-slate-400 text-xs mt-1">
                    Le coach n'a pas encore ajouté de QCM ou d'exercice pour cette vidéo.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Course Curriculum Sidebar */}
        <div className="p-4 md:p-0 shrink-0">
          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm h-[calc(100vh-140px)] md:h-[600px] sticky top-24 bg-white">
            <CourseSidebar
              courseId={courseId}
              courseTitle={courseTitle}
              chapters={chapters}
              activeLessonId={lesson.id}
              completedLessonIds={completedIds}
              isSubscribed={isSubscribed}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

