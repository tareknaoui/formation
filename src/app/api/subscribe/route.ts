import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new NextResponse("Non autorisé.", { status: 401 });
    }

    const userId = session.user.id;
    const { action } = await req.json();

    if (action === "subscribe") {
      // Deactivate any current active subscriptions first to keep clean
      await db.subscription.updateMany({
        where: {
          userId,
          status: "ACTIVE",
        },
        data: {
          status: "INACTIVE",
          endDate: new Date(),
        },
      });

      // Create a new active subscription
      await db.subscription.create({
        data: {
          userId,
          status: "ACTIVE",
          startDate: new Date(),
          endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // Valid for 1 year
        },
      });
      return NextResponse.json({ success: true, isSubscribed: true });
    } else {
      // Deactivate all active subscriptions
      await db.subscription.updateMany({
        where: {
          userId,
          status: "ACTIVE",
        },
        data: {
          status: "INACTIVE",
          endDate: new Date(),
        },
      });
      return NextResponse.json({ success: true, isSubscribed: false });
    }

  } catch (error) {
    console.error("[SUBSCRIBE_ERROR]", error);
    return new NextResponse("Erreur interne du serveur.", { status: 500 });
  }
}
