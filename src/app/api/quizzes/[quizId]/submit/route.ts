import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

interface SubmitAnswerBody {
  answers: Record<string, string>; // questionId -> optionId
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ quizId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new NextResponse("Non autorisé.", { status: 401 });
    }

    const { quizId } = await params;
    const body: SubmitAnswerBody = await req.json();
    const { answers } = body;

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
      return NextResponse.json({
        score: 100,
        passed: true,
        correctCount: 0,
        totalQuestions: 0,
      });
    }

    // Evaluate answers
    quiz.questions.forEach((question) => {
      const selectedOptionId = answers[question.id];
      const correctOption = question.options.find((opt) => opt.isCorrect);

      if (selectedOptionId && correctOption && selectedOptionId === correctOption.id) {
        correctCount += 1;
      }
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

    // If passed and linked to a lesson, mark user progress as completed automatically
    if (passed && quiz.lessonId) {
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

    return NextResponse.json({
      attemptId: attempt.id,
      score: scorePercentage,
      passed,
      correctCount,
      totalQuestions,
      passingScore: quiz.passingScore,
    });
  } catch (error) {
    console.error("[QUIZ_SUBMIT_ERROR]", error);
    return new NextResponse("Erreur interne du serveur.", { status: 500 });
  }
}
