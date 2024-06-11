"use client";

import React, { Suspense } from "react";
import { useUser } from "../hooks/UserContext";
import { Skeleton } from "@/components/ui/skeleton";
import { SkeletonCard } from "@/components/SkeletonCard";

export default function page() {
  const { session, status, user } = useUser();

  const currentStatus = () => {
    if (status === "loading") return <SkeletonCard />;
    if (status === "authenticated") return <h1>authenticated</h1>;
    if (status === "unauthenticated") return <h1>unauthenticated</h1>;
  };

  return (
    <div className=" ">
      <div>{currentStatus()}</div>
      <div>{session?.expires}</div>
      <div>{user.id}</div>
      <div>{session?.user?.email}</div>
      <div>{session?.user?.name}</div>
      {session?.user?.image && <img src={session?.user?.image}></img>}
      <div>{user.aiTokens}</div>
    </div>
  );
}
