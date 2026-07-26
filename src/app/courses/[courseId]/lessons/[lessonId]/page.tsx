import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import LessonPlayerClient from "./LessonPlayerClient";

interface LessonPageProps {
  params: Promise<{
    courseId: string;
    lessonId: string;
  }>;
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { courseId, lessonId } = await params;
  const session = await getServerSession(authOptions);

  // If not logged in, middleware will intercept, but as a safety fallback:
  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  // Fetch course with published chapters and lessons
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

  // Find the current lesson in the course structure
  const currentLesson = await db.lesson.findUnique({
    where: { id: lessonId },
    include: {
      quizzes: {
        include: {
          questions: {
            include: {
              options: true,
            },
            orderBy: { position: "asc" },
          },
        },
      },
    },
  });

  if (!currentLesson || currentLesson.chapterId === "") {
    redirect(`/courses/${courseId}`);
  }

  // Strip isCorrect from options before sending to client to prevent answer cheating
  const rawQuiz = currentLesson.quizzes[0] || null;
  const quiz = rawQuiz
    ? {
        id: rawQuiz.id,
        title: rawQuiz.title,
        description: rawQuiz.description,
        passingScore: rawQuiz.passingScore,
        questions: (rawQuiz.questions || []).map((q) => ({
          id: q.id,
          prompt: q.prompt,
          hanzi: q.hanzi,
          pinyin: q.pinyin,
          explanation: q.explanation,
          options: (q.options || []).map((opt) => ({
            id: opt.id,
            text: opt.text,
          })),
        })),
      }
    : null;

  // Double check that the lesson belongs to this course
  const lessonChapter = course.chapters.find((ch) => ch.id === currentLesson.chapterId);
  if (!lessonChapter) {
    redirect(`/courses/${courseId}`);
  }

  // Flatten lessons to compute previous and next lessons
  const allLessons = course.chapters.flatMap((chapter) =>
    chapter.lessons.map((lesson) => ({
      id: lesson.id,
      title: lesson.title,
    }))
  );

  const currentIndex = allLessons.findIndex((l) => l.id === lessonId);
  const prevLessonId = currentIndex > 0 ? allLessons[currentIndex - 1].id : null;
  const nextLessonId = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1].id : null;

  // Fetch completed lessons for this user
  let completedLessonIds: string[] = [];
  try {
    const userProgress = await db.userProgress.findMany({
      where: {
        userId: session.user.id,
        isCompleted: true,
      },
      select: { lessonId: true },
    });
    completedLessonIds = userProgress.map((p) => p.lessonId);
  } catch (err) {
    console.error("Error fetching completed lessons:", err);
  }

  // Map to simple structure for sidebar
  const sidebarChapters = course.chapters.map((chapter) => ({
    id: chapter.id,
    title: chapter.title,
    position: chapter.position,
    lessons: chapter.lessons.map((l) => ({
      id: l.id,
      title: l.title,
      duration: l.duration,
      position: l.position,
    })),
  }));

  const userRole = session.user.role;
  const isSubscribed = session.user.isSubscribed || userRole === "ADMIN";

  return (
    <LessonPlayerClient
      courseId={courseId}
      courseTitle={course.title}
      lesson={JSON.parse(JSON.stringify({
        id: currentLesson.id,
        title: currentLesson.title,
        description: currentLesson.description,
        videoUrl: currentLesson.videoUrl,
        position: currentLesson.position,
      }))}
      quiz={quiz ? JSON.parse(JSON.stringify(quiz)) : null}
      chapters={JSON.parse(JSON.stringify(sidebarChapters))}
      initialCompletedLessonIds={completedLessonIds}
      isSubscribed={isSubscribed}
      prevLessonId={prevLessonId}
      nextLessonId={nextLessonId}
    />
  );
}

