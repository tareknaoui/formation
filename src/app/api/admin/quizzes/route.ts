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

    // If updating an existing quiz
    if (id) {
      // Delete existing questions & options, then recreate
      await db.quizQuestion.deleteMany({
        where: { quizId: id },
      });

      const updatedQuiz = await db.quiz.update({
        where: { id },
        data: {
          title,
          description,
          passingScore: passingScore ?? 70,
          questions: {
            create: questions.map((q, qIndex) => ({
              prompt: q.prompt,
              hanzi: q.hanzi,
              pinyin: q.pinyin,
              explanation: q.explanation,
              position: qIndex + 1,
              options: {
                create: q.options.map((opt) => ({
                  text: opt.text,
                  isCorrect: opt.isCorrect,
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

      return NextResponse.json(updatedQuiz);
    }

    // Create new Quiz
    const quiz = await db.quiz.create({
      data: {
        title,
        description,
        passingScore: passingScore ?? 70,
        lessonId,
        questions: {
          create: questions.map((q, qIndex) => ({
            prompt: q.prompt,
            hanzi: q.hanzi,
            pinyin: q.pinyin,
            explanation: q.explanation,
            position: qIndex + 1,
            options: {
              create: q.options.map((opt) => ({
                text: opt.text,
                isCorrect: opt.isCorrect,
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
