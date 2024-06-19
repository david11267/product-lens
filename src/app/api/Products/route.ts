import { prisma } from "@/lib/dbService";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const identifyRequest = await prisma.identifyRequest.findMany({
      where: { userId: "3" },
    });
    console.log(identifyRequest);
    return NextResponse.json(identifyRequest);
  } catch (error) {
    console.error("Failed to fetch identifyRequest:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
