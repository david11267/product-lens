// types/next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string;
      email?: string;
      image?: string;
      aiTokens?: number;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    aiTokens: number;
  }
}
