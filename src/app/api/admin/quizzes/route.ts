import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

interface QuestionInput {
  prompt: string;
  hanzi?: string;
  pinyin?: string;
  explanation?: string;
  options: {
    text: string;
    isCorrect: boolean;
  }[];
}

interface CreateQuizBody {
  id?: string;
  title: string;
  description?: string;
  passingScore?: number;
  lessonId: string;
  questions: QuestionInput[];
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Non autorisé.", { status: 401 });
    }

    const body: CreateQuizBody = await req.json();
    const { id, title, description, passingScore, lessonId, questions } = body;

    if (!title || !lessonId) {
      return new NextResponse("Titre et lessonId sont requis.", { status: 400 });
    }

    if (!Array.isArray(questions) || questions.length === 0) {
      return new NextResponse("Le quizz doit contenir au moins une question valide.", { status: 400 });
    }

    const lessonExists = await db.lesson.findUnique({
      where: { id: lessonId },
    });

    if (!lessonExists) {
      return new NextResponse("La leçon spécifiée n'existe pas.", { status: 404 });
    }

    const validPassingScore = Math.min(100, Math.max(0, typeof passingScore === "number" ? passingScore : 70));

    // If updating an existing quiz
    if (id) {
      const updatedQuiz = await db.$transaction(async (tx) => {
        // Delete existing questions & options, then recreate
        await tx.quizQuestion.deleteMany({
          where: { quizId: id },
        });

        return await tx.quiz.update({
          where: { id },
          data: {
            title,
            description,
            passingScore: validPassingScore,
            lessonId,
            questions: {
              create: questions.map((q, qIndex) => ({
                prompt: q.prompt,
                hanzi: q.hanzi,
                pinyin: q.pinyin,
                explanation: q.explanation,
                position: qIndex + 1,
                options: {
                  create: (q.options || []).map((opt) => ({
                    text: opt.text,
                    isCorrect: !!opt.isCorrect,
                  })),
                },
              })),
            },
          },
          include: {
            questions: {
              include: {
                options: true,
              },
            },
          },
        });
      });

      return NextResponse.json(updatedQuiz);
    }

    // Create new Quiz
    const quiz = await db.quiz.create({
      data: {
        title,
        description,
        passingScore: validPassingScore,
        lessonId,
        questions: {
          create: questions.map((q, qIndex) => ({
            prompt: q.prompt,
            hanzi: q.hanzi,
            pinyin: q.pinyin,
            explanation: q.explanation,
            position: qIndex + 1,
            options: {
              create: (q.options || []).map((opt) => ({
                text: opt.text,
                isCorrect: !!opt.isCorrect,
              })),
            },
          })),
        },
      },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });

    return NextResponse.json(quiz);
  } catch (error) {
    console.error("[ADMIN_QUIZ_SAVE_ERROR]", error);
    return new NextResponse("Erreur lors de la sauvegarde du quizz.", { status: 500 });
  }
}
