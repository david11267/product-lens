import TabNav from "@/components/TabNav";
import Image from "next/image";
import Link from "next/link";
import { auth, signIn, signOut } from "@/auth";
import { Props } from "next/script";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (!session) {
    redirect("/api/auth/signin");
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <TabNav session={session} />
    </main>
  );
}
