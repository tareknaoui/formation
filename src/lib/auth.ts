import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Veuillez entrer un email et un mot de passe.");
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email },
          include: {
            subscriptions: {
              where: { status: "ACTIVE" },
              orderBy: { startDate: "desc" },
              take: 1
            }
          }
        });

        if (!user || !user.password) {
          throw new Error("Email ou mot de passe incorrect.");
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);

        if (!isValid) {
          throw new Error("Email ou mot de passe incorrect.");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
          isSubscribed: user.subscriptions.length > 0 || user.role === "ADMIN",
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.isSubscribed = user.isSubscribed;
      }

      if (trigger === "update" && session) {
        // Only allow safe, user-controlled fields — never trust role from client
        if (typeof session.isSubscribed === "boolean") token.isSubscribed = session.isSubscribed;
        if (session.name) token.name = session.name;
        if (session.image) token.image = session.image;
        // ❌ role is NEVER accepted from session update (C-3 — privilege escalation prevention)
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.isSubscribed = token.isSubscribed as boolean;
      }
      return session;
    }
  },
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET,
};
