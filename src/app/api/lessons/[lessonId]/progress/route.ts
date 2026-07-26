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

    const userId = session.user.id;

    // M-3: Verify the lesson actually exists
    const lesson = await db.lesson.findUnique({ where: { id: lessonId } });
    if (!lesson) {
      return new NextResponse("Leçon introuvable.", { status: 404 });
    }

    // M-3: Verify the user has an active subscription (or is ADMIN)
    if (session.user.role !== "ADMIN") {
      const subscription = await db.subscription.findFirst({
        where: { userId, status: "ACTIVE" },
      });
      if (!subscription) {
        return new NextResponse("Abonnement actif requis.", { status: 403 });
      }
    }

    const { isCompleted } = await req.json();

    const userProgress = await db.userProgress.upsert({
      where: {
        userId_lessonId: {
          userId,
          lessonId,
        },
      },
      update: {
        isCompleted: isCompleted,
      },
      create: {
        userId,
        lessonId,
        isCompleted: isCompleted,
      },
    });

    return NextResponse.json(userProgress);

  } catch (error) {
    console.error("[LESSON_PROGRESS_ERROR]", error);
    return new NextResponse("Erreur interne du serveur.", { status: 500 });
  }
}

