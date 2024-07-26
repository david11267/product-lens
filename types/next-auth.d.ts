// types/next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { Interface } from "readline";

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

interface aiResponse {
  confidence: number;
  name: string;
  brand: string;
  releaseYear: number;
  priceHistory: {
    used: { date: Date; price: Number };
    new: { date: Date; price: Number };
  }[];
}
