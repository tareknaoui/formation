import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import UsersListClient from "./UsersListClient";

export default async function AdminUsersPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/");
  }

  // Fetch all users with their subscriptions
  const users = await db.user.findMany({
    include: {
      subscriptions: {
        where: { status: "ACTIVE" },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  // Map to simple structure for client component
  const mappedUsers = users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    isSubscribed: user.subscriptions.length > 0,
  }));

  return (
    <UsersListClient
      users={mappedUsers}
      currentAdminId={session.user.id}
    />
  );
}
