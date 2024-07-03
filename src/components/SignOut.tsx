import Link from "next/link";
import React from "react";

export default function SignOut() {
  return (
    <Link
      className="bg-danger p-4 rounded-xl font-extrabold "
      href={"/api/auth/signout"}
    >
      SignOut
    </Link>
  );
}
