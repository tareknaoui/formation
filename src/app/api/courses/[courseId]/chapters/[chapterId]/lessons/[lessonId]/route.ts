import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

interface LessonIdParams {
  params: Promise<{
    lessonId: string;
  }>;
}

export async function PATCH(req: Request, { params }: LessonIdParams) {
  try {
    const { lessonId } = await params;
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Non autorisé.", { status: 401 });
    }

    const values = await req.json();

    const lesson = await db.lesson.update({
      where: { id: lessonId },
      data: { ...values },
    });

    return NextResponse.json(lesson);

  } catch (error) {
    console.error("[LESSON_UPDATE_ERROR]", error);
    return new NextResponse("Erreur interne.", { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: LessonIdParams) {
  try {
    const { lessonId } = await params;
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Non autorisé.", { status: 401 });
    }

    const lesson = await db.lesson.delete({
      where: { id: lessonId },
    });

    return NextResponse.json(lesson);

  } catch (error) {
    console.error("[LESSON_DELETE_ERROR]", error);
    return new NextResponse("Erreur interne.", { status: 500 });
  }
}
