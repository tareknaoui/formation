import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

interface CourseParams {
  params: Promise<{
    courseId: string;
  }>;
}

export async function PATCH(req: Request, { params }: CourseParams) {
  try {
    const { courseId } = await params;
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Non autorisé.", { status: 401 });
    }

    // C-2: Whitelist only allowed fields — never spread raw request body
    const { title, description, imageUrl, category, isPublished } = await req.json();

    const course = await db.course.update({
      where: { id: courseId },
      data: { title, description, imageUrl, category, isPublished },
    });

    return NextResponse.json(course);

  } catch (error) {
    console.error("[COURSE_UPDATE_ERROR]", error);
    return new NextResponse("Erreur interne.", { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: CourseParams) {
  try {
    const { courseId } = await params;
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Non autorisé.", { status: 401 });
    }

    const course = await db.course.delete({
      where: { id: courseId },
    });

    return NextResponse.json(course);

  } catch (error) {
    console.error("[COURSE_DELETE_ERROR]", error);
    return new NextResponse("Erreur interne.", { status: 500 });
  }
}
