import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

interface ProgressParams {
  params: Promise<{
    lessonId: string;
  }>;
}

export async function POST(req: Request, { params }: ProgressParams) {
  try {
    const { lessonId } = await params;
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new NextResponse("Non autorisé.", { status: 401 });
    }

    const { isCompleted } = await req.json();

    const userProgress = await db.userProgress.upsert({
      where: {
        userId_lessonId: {
          userId: session.user.id,
          lessonId: lessonId,
        },
      },
      update: {
        isCompleted: isCompleted,
      },
      create: {
        userId: session.user.id,
        lessonId: lessonId,
        isCompleted: isCompleted,
      },
    });

    return NextResponse.json(userProgress);

  } catch (error) {
    console.error("[LESSON_PROGRESS_ERROR]", error);
    return new NextResponse("Erreur interne du serveur.", { status: 500 });
  }
}
