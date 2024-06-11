"use client";
import { User } from "@prisma/client";
import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { link } from "fs";
interface props {
  user: User;
}

export default function Navbar({ user }: props) {
  const pathname = usePathname();

  const LINKS = [
    { name: "Identify", link: "/" },
    { name: "My Products", link: "/Products" },
    { name: "Profile", link: "/Profile" },
  ];

  return (
    <>
      <nav className="text-center">
        <div className="border p-1 inline-flex space-x-2 rounded-lg">
          {LINKS.map((link) => (
            <Link
              href={link.link}
              key={link.name}
              className={
                (pathname === link.link ? "bg-active" : "") + " p-4 rounded-lg"
              }
            >
              {link.name}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}

{
  /* <div className=" ">
<div className=" flex justify-center p-2  space-x-2 rounded-2xl">
  {buttons.map((b) => (
    <button
      key={b.link}
      className={`${
        pathname === b.link ? "bg-slate-50 " : "bg-white "
      }transition-all shadow-xl p-4 rounded-xl  hover:scale-105`}
    >
      {b.text}
    </button>
  ))}

  <Avatar>
    <AvatarImage src="https://github.com/shadcn.png" />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
  <Link className=" text-red-500 text-6xl" href={"/api/auth/signout"}>
    <FaSignOutAlt />
  </Link>
</div>
<div>{user.aiTokens}</div>
</div> */
}
