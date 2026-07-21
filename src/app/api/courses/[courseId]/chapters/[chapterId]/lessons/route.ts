import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

interface LessonParams {
  params: Promise<{
    courseId: string;
    chapterId: string;
  }>;
}

export async function POST(req: Request, { params }: LessonParams) {
  try {
    const { chapterId } = await params;
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Non autorisé.", { status: 401 });
    }

    const { title, description, videoUrl, duration } = await req.json();

    if (!title) {
      return new NextResponse("Titre requis.", { status: 400 });
    }

    const lastLesson = await db.lesson.findFirst({
      where: { chapterId },
      orderBy: { position: "desc" },
    });

    const newPosition = lastLesson ? lastLesson.position + 1 : 1;

    const lesson = await db.lesson.create({
      data: {
        title,
        description,
        videoUrl,
        duration: duration || "05:00",
        position: newPosition,
        chapterId,
        isPublished: true, // Default to published for demo convenience
      },
    });

    return NextResponse.json(lesson);

  } catch (error) {
    console.error("[LESSON_CREATE_ERROR]", error);
    return new NextResponse("Erreur interne.", { status: 500 });
  }
}
