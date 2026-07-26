import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ quizId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new NextResponse("Non autorisé.", { status: 401 });
    }

    // Check authorization: User must be ADMIN or have an ACTIVE subscription
    if (session.user.role !== "ADMIN") {
      const subscription = await db.subscription.findFirst({
        where: {
          userId: session.user.id,
          status: "ACTIVE",
        },
      });
      if (!subscription) {
        return new NextResponse("Abonnement actif requis pour effectuer cette évaluation.", { status: 403 });
      }
    }

    const { quizId } = await params;
    const body = await req.json().catch(() => ({}));
    const answers: Record<string, string> = body.answers && typeof body.answers === "object" ? body.answers : {};

    const quiz = await db.quiz.findUnique({
      where: { id: quizId },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });

    if (!quiz) {
      return new NextResponse("Quizz non trouvé.", { status: 404 });
    }

    let correctCount = 0;
    const totalQuestions = quiz.questions.length;

    if (totalQuestions === 0) {
      const attempt = await db.quizAttempt.create({
        data: {
          userId: session.user.id,
          quizId: quiz.id,
          score: 100,
          passed: true,
        },
      });

      return NextResponse.json({
        attemptId: attempt.id,
        score: 100,
        passed: true,
        correctCount: 0,
        totalQuestions: 0,
        passingScore: quiz.passingScore,
      });
    }

    // Evaluate answers and build corrections
    const corrections: {
      questionId: string;
      selectedOptionId: string | null;
      correctOptionId: string | null;
      correctOptionText: string | null;
      isCorrect: boolean;
    }[] = [];

    quiz.questions.forEach((question) => {
      const selectedOptionId = answers[question.id] || null;
      const selectedOption = selectedOptionId
        ? question.options.find((opt) => opt.id === selectedOptionId)
        : null;
      const correctOption = question.options.find((opt) => opt.isCorrect);

      const isCorrect = !!(selectedOption && selectedOption.isCorrect);
      if (isCorrect) {
        correctCount += 1;
      }

      corrections.push({
        questionId: question.id,
        selectedOptionId,
        correctOptionId: correctOption?.id || null,
        correctOptionText: correctOption?.text || null,
        isCorrect,
      });
    });

    const scorePercentage = Math.round((correctCount / totalQuestions) * 100);
    const passed = scorePercentage >= quiz.passingScore;

    // Record quiz attempt in database
    const attempt = await db.quizAttempt.create({
      data: {
        userId: session.user.id,
        quizId: quiz.id,
        score: scorePercentage,
        passed: passed,
      },
    });

    // If passed and linked to a valid lesson, mark user progress as completed automatically
    if (passed && quiz.lessonId) {
      const lessonExists = await db.lesson.findUnique({
        where: { id: quiz.lessonId },
      });

      if (lessonExists) {
        await db.userProgress.upsert({
          where: {
            userId_lessonId: {
              userId: session.user.id,
              lessonId: quiz.lessonId,
            },
          },
          update: {
            isCompleted: true,
          },
          create: {
            userId: session.user.id,
            lessonId: quiz.lessonId,
            isCompleted: true,
          },
        });
      }
    }

    return NextResponse.json({
      attemptId: attempt.id,
      score: scorePercentage,
      passed,
      correctCount,
      totalQuestions,
      passingScore: quiz.passingScore,
      corrections,
    });
  } catch (error) {
    console.error("[QUIZ_SUBMIT_ERROR]", error);
    return new NextResponse("Erreur interne du serveur.", { status: 500 });
  }
}
