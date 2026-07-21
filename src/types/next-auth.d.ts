import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      isSubscribed: boolean;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role: string;
    isSubscribed: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    isSubscribed: boolean;
  }
}
