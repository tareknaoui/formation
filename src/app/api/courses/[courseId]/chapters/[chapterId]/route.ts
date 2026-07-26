import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

interface ChapterIdParams {
  params: Promise<{
    courseId: string;
    chapterId: string;
  }>;
}

export async function PATCH(req: Request, { params }: ChapterIdParams) {
  try {
    const { chapterId } = await params;
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Non autorisé.", { status: 401 });
    }

    // C-2: Whitelist only allowed fields — never spread raw request body
    const { title, description, position, isPublished } = await req.json();

    const chapter = await db.chapter.update({
      where: { id: chapterId },
      data: { title, description, position, isPublished },
    });

    return NextResponse.json(chapter);

  } catch (error) {
    console.error("[CHAPTER_UPDATE_ERROR]", error);
    return new NextResponse("Erreur interne.", { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: ChapterIdParams) {
  try {
    const { chapterId } = await params;
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Non autorisé.", { status: 401 });
    }

    const chapter = await db.chapter.delete({
      where: { id: chapterId },
    });

    return NextResponse.json(chapter);

  } catch (error) {
    console.error("[CHAPTER_DELETE_ERROR]", error);
    return new NextResponse("Erreur interne.", { status: 500 });
  }
}
