"use client";

import Link from "next/link";
import { CheckCircle2, Circle, Lock, Play, Layers } from "lucide-react";

interface Lesson {
  id: string;
  title: string;
  duration: string | null;
  position: number;
}

interface Chapter {
  id: string;
  title: string;
  position: number;
  lessons: Lesson[];
}

interface CourseSidebarProps {
  courseId: string;
  courseTitle: string;
  chapters: Chapter[];
  activeLessonId?: string;
  completedLessonIds: string[];
  isSubscribed: boolean;
}

export default function CourseSidebar({
  courseId,
  courseTitle,
  chapters,
  activeLessonId,
  completedLessonIds,
  isSubscribed,
}: CourseSidebarProps) {
  const totalLessons = chapters.reduce((acc, ch) => acc + ch.lessons.length, 0);
  const totalCompleted = chapters
    .flatMap((ch) => ch.lessons)
    .filter((l) => completedLessonIds.includes(l.id)).length;
  const progressPercent =
    totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0;

  return (
    <div className="flex flex-col h-full bg-white border-l border-slate-200/70 w-full md:w-80 shrink-0 shadow-sm">
      
      {/* ── Header ───────────────────────────────────── */}
      <div className="p-5 border-b border-slate-100 bg-gradient-to-br from-slate-50 to-blue-50/40">
        <p className="text-[10px] font-bold uppercase tracking-widest text-blue-500 mb-1">Formation en cours</p>
        <h2 className="font-extrabold text-sm text-slate-800 line-clamp-2 mb-3 leading-snug">
          {courseTitle}
        </h2>

        {/* Progress summary */}
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
          <span>{totalCompleted} / {totalLessons} leçons</span>
          <span className="text-blue-600 font-bold">{progressPercent}%</span>
        </div>
        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${progressPercent > 0 ? "animate-shimmer" : "bg-slate-300"}`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* ── Chapters list ─────────────────────────────── */}
      <div className="flex-1 overflow-y-auto">
        {chapters.map((chapter, cIdx) => (
          <div
            key={chapter.id}
            className="border-b border-slate-100 last:border-0"
          >
            {/* Chapter header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-slate-50/60 sticky top-0 z-10">
              <Layers className="h-3.5 w-3.5 text-blue-400 shrink-0" />
              <h3 className="text-[11px] font-bold text-slate-600 uppercase tracking-wide truncate">
                {chapter.position}. {chapter.title}
              </h3>
            </div>

            {/* Lessons */}
            <div className="py-1 px-2">
              {chapter.lessons.map((lesson) => {
                const isActive = activeLessonId === lesson.id;
                const isCompleted = completedLessonIds.includes(lesson.id);

                return (
                  <Link
                    key={lesson.id}
                    href={`/courses/${courseId}/lessons/${lesson.id}`}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs transition-all duration-150 group mb-0.5 ${
                      isActive
                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                        : isCompleted
                        ? "text-slate-500 hover:bg-slate-50"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 pr-2">
                      {isCompleted ? (
                        <CheckCircle2
                          className={`h-4 w-4 shrink-0 ${isActive ? "text-white" : "text-emerald-500"}`}
                        />
                      ) : isActive ? (
                        <Play className="h-4 w-4 shrink-0 fill-white text-white" />
                      ) : !isSubscribed ? (
                        <Lock className="h-4 w-4 text-slate-300 shrink-0" />
                      ) : (
                        <Circle className="h-4 w-4 text-slate-300 shrink-0 group-hover:text-blue-400 transition-colors" />
                      )}
                      <span className="truncate font-medium">{lesson.title}</span>
                    </div>
                    {lesson.duration && (
                      <span
                        className={`text-[10px] font-semibold shrink-0 ${
                          isActive ? "text-blue-200" : "text-slate-400"
                        }`}
                      >
                        {lesson.duration}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
