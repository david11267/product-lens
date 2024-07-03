import React, { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { SkeletonCard } from "@/components/SkeletonCard";
import { auth } from "@/auth";
import SignOut from "@/components/SignOut";

export default async function page() {
  const session = await auth();

  if (!session) {
    return (
      <>
        <div>NOT AUTHENTICATED</div>
      </>
    );
  }

  return (
    <div>
      <div>{session?.expires}</div>
      <div>{session?.user?.id}</div>
      <div>{session?.user?.email}</div>
      <div>{session?.user?.name}</div>

      {session?.user?.image && <img src={session?.user?.image}></img>}
      <div className="pt-6">
        <SignOut />
      </div>
    </div>
  );
}
