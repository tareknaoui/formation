"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight, BookOpen, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import VideoPlayer from "@/components/VideoPlayer";
import CourseSidebar from "@/components/CourseSidebar";

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
  chapters,
  initialCompletedLessonIds,
  isSubscribed,
  prevLessonId,
  nextLessonId,
}: LessonPlayerClientProps) {
  const router = useRouter();
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

      // Update state locally
      if (isCurrentCompleted) {
        setCompletedIds(completedIds.filter((id) => id !== lesson.id));
      } else {
        setCompletedIds([...completedIds, lesson.id]);
        
        // Auto-advance to the next lesson if available and marking as completed
        if (nextLessonId) {
          setTimeout(() => {
            startTransition(() => {
              router.push(`/courses/${courseId}/lessons/${nextLessonId}`);
            });
          }, 600);
        } else {
          // If no next lesson, redirect to course page
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

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />

      <div className="flex-1 flex flex-col md:flex-row max-w-7xl mx-auto w-full px-0 sm:px-4 md:px-6 lg:px-8 py-0 md:py-6 gap-0 md:gap-6">
        {/* Left Column: Player & Meta */}
        <div className="flex-1 space-y-6 p-4 md:p-0">
          
          {/* Back button */}
          <div className="flex items-center justify-between">
            <Link
              href={`/courses/${courseId}`}
              className="text-xs font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1 transition"
            >
              <ChevronLeft className="h-4 w-4" />
              Retour à la formation
            </Link>
            
            {/* Top Navigation */}
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

          {/* Lesson Details */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <div className="flex justify-between items-start gap-4">
              <div>
                <span className="text-[10px] text-blue-600 font-bold uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-full">
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
