import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Non autorisé.", { status: 401 });
    }

    const { title, description, imageUrl, category } = await req.json();

    if (!title) {
      return new NextResponse("Le titre est requis.", { status: 400 });
    }

    const course = await db.course.create({
      data: {
        title,
        description,
        imageUrl,
        category: category || "Débutant",
      },
    });

    return NextResponse.json(course);

  } catch (error) {
    console.error("[COURSES_CREATE_ERROR]", error);
    return new NextResponse("Erreur interne du serveur.", { status: 500 });
  }
}
