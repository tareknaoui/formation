import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

interface ChapterParams {
  params: Promise<{
    courseId: string;
  }>;
}

export async function POST(req: Request, { params }: ChapterParams) {
  try {
    const { courseId } = await params;
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Non autorisé.", { status: 401 });
    }

    const { title, description } = await req.json();

    if (!title) {
      return new NextResponse("Titre requis.", { status: 400 });
    }

    // Find last chapter position to increment
    const lastChapter = await db.chapter.findFirst({
      where: { courseId },
      orderBy: { position: "desc" },
    });

    const newPosition = lastChapter ? lastChapter.position + 1 : 1;

    const chapter = await db.chapter.create({
      data: {
        title,
        description,
        position: newPosition,
        courseId,
        isPublished: true, // Default to published for demo simplicity, or user can toggle
      },
    });

    return NextResponse.json(chapter);

  } catch (error) {
    console.error("[CHAPTER_CREATE_ERROR]", error);
    return new NextResponse("Erreur interne.", { status: 500 });
  }
}
