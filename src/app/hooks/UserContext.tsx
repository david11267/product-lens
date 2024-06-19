"use client";
import { createContext, useContext, ReactNode } from "react";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { User } from "@prisma/client";

interface UserContextType {
  session: Session | null;
  status: "authenticated" | "loading" | "unauthenticated";
  user: User;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({
  children,
  user,
}: {
  children: ReactNode;
  user: User;
}) => {
  const { data: session, status } = useSession();

  return (
    <UserContext.Provider value={{ session, status, user }}>
      {children}
    </UserContext.Provider>
  );
};

export const UseUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
