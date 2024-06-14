import { PrismaClient, User } from "@prisma/client";
import { User as SessionUser } from "next-auth";

export const prisma = new PrismaClient();

export async function CreateUserIfNotFound(
  sessionUser: SessionUser
): Promise<User> {
  if (!sessionUser.email) {
    throw new Error("Email is required");
  }

  let user: User | null = await prisma.user.findUnique({
    where: { email: sessionUser.email },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email: sessionUser.email,
        name: sessionUser.name,
      },
    });
    console.log("User created:", user);
  } else {
    console.log("User found:", user);
  }

  return user;
}
