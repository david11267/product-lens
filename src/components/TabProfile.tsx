import { Session, User } from "next-auth";
import React from "react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
interface props {
  user: User;
}

export default function TabProfile({ user }: props) {
  return (
    <div className="bg-zinc-100 rounded-md flex flex-col items-center space-y-4 p-4">
      <Image
        className="rounded-full"
        width={100}
        height={100}
        src={user.image as string}
        alt="your profile image"
      />
      <p>{user.name}</p>
      <p>{user.id}</p>

      <Link
        href={"/api/auth/signout"}
        className={buttonVariants({ variant: "destructive" })}
      >
        Logout
      </Link>
    </div>
  );
}
