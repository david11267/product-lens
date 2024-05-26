import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TabProfile from "./TabProfile";
import { Session } from "next-auth";
interface props {
  session: Session;
}
export default function TabNav({ session }: props) {
  return (
    <Tabs defaultValue="account">
      <div className="flex justify-center">
        <TabsList>
          <TabsTrigger value="Identify">Identify</TabsTrigger>
          <TabsTrigger value="My Products">My Products</TabsTrigger>
          <TabsTrigger value="Profile">Profile</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="Identify">Identify </TabsContent>
      <TabsContent value="My Products">My Products </TabsContent>
      <TabsContent value="Profile">
        {session.user && <TabProfile user={session.user} />}
      </TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
    </Tabs>
  );
}
