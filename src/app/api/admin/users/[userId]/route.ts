import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

interface UserAdminParams {
  params: Promise<{
    userId: string;
  }>;
}

export async function PATCH(req: Request, { params }: UserAdminParams) {
  try {
    const { userId } = await params;
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Non autorisé.", { status: 401 });
    }

    const { role, isSubscribed } = await req.json();

    if (role) {
      await db.user.update({
        where: { id: userId },
        data: { role },
      });
    }

    if (typeof isSubscribed !== "undefined") {
      if (isSubscribed) {
        // Deactivate other subscriptions first
        await db.subscription.updateMany({
          where: { userId, status: "ACTIVE" },
          data: { status: "INACTIVE", endDate: new Date() },
        });
        
        // Create active subscription
        await db.subscription.create({
          data: {
            userId,
            status: "ACTIVE",
            startDate: new Date(),
            endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
          },
        });
      } else {
        // Set all to inactive
        await db.subscription.updateMany({
          where: { userId, status: "ACTIVE" },
          data: { status: "INACTIVE", endDate: new Date() },
        });
      }
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("[ADMIN_USER_UPDATE_ERROR]", error);
    return new NextResponse("Erreur interne.", { status: 550 });
  }
}
