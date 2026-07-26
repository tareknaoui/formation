import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import CourseManagerClient from "./CourseManagerClient";

interface CourseEditPageProps {
  params: Promise<{
    courseId: string;
  }>;
}

export default async function AdminCourseDetailPage({ params }: CourseEditPageProps) {
  const { courseId } = await params;
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/");
  }

  const course = await db.course.findUnique({
    where: { id: courseId },
    include: {
      chapters: {
        include: {
          lessons: {
            orderBy: { position: "asc" },
            include: {
              quizzes: {
                include: {
                  questions: {
                    include: { options: true },
                    orderBy: { position: "asc" },
                  },
                },
              },
            },
          },
        },
        orderBy: { position: "asc" },
      },
    },
  });

  if (!course) {
    redirect("/admin/courses");
  }

  // Map database details to the structures expected by our client manager
  const mappedCourse = {
    id: course.id,
    title: course.title,
    description: course.description,
    imageUrl: course.imageUrl,
    category: course.category,
    isPublished: course.isPublished,
  };

  const mappedChapters = course.chapters.map((chapter) => ({
    id: chapter.id,
    title: chapter.title,
    description: chapter.description,
    position: chapter.position,
    isPublished: chapter.isPublished,
    lessons: chapter.lessons.map((lesson) => ({
      id: lesson.id,
      title: lesson.title,
      description: lesson.description,
      videoUrl: lesson.videoUrl,
      position: lesson.position,
      duration: lesson.duration,
      isPublished: lesson.isPublished,
      quizzes: lesson.quizzes,
    })),
  }));

  return (
    <CourseManagerClient
      course={mappedCourse}
      chapters={mappedChapters}
    />
  );
}
