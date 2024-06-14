import { UploadedImage } from "@/app/page";
import { prisma } from "@/lib/dbService";
import { Prisma, User } from "@prisma/client";

interface RequestData {
  images: UploadedImage[];
  description: string;
  user: User;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    console.log()

    const description: string = formData.get("description") as string;
    const user: User = JSON.parse(formData.get("user") as string);
    const uploadedImages: File[] = formData.getAll("images") as File[];

    // Process the received data as needed
    console.log(description);
    console.log(user);
    console.log(uploadedImages);

    console.log("USER ID: ", user.id);

    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        aiTokens: {
          decrement: 1,
        },
      },
    });

    console.log("Updated user:", updatedUser);
    return Response.json({
      message: "Request processed successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return Response.json({ error: "Internal Server Error" });
  }
}
