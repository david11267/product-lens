import { auth } from "@/auth";
import { prisma } from "@/lib/dbService";
import { User } from "@prisma/client";
import { put } from "@vercel/blob";
import { randomUUID } from "crypto";
import { GetOpenAIResult } from "@/lib/OpenAIService";

interface RequestData {
  images: File[];
  description: string;
  user: User;
}

export async function POST(req: Request) {
  try {
    const user = await VerifyUserAsync();

    if (user) {
      // User is verified and available
      console.log(`Verified User: ${user.name} ID: ${user.id}`);
      // Access other user properties as needed
      const parsedRequestData = await ParseFormData(req);
      const uploadedImageUrls = await UploadImages(parsedRequestData);
      const IdentifyRequest = {
        id: randomUUID(),
        description: parsedRequestData.description,
        images: uploadedImageUrls,
      };

      const result = await GetOpenAIResult(
        uploadedImageUrls,
        parsedRequestData.description
      );

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
    } else {
      // Handle case where user is not found
      console.log("User not found or not authenticated");
    }
  } catch (error) {
    // Handle errors
    console.error("Error verifying user:", error);
    return Response.json({ error: "Internal Server Error" });
  }
}

async function ParseFormData(request: Request) {
  const formData = await request.formData();
  const description: string = formData.get("description") as string;
  const user: User = JSON.parse(formData.get("user") as string);
  const uploadedImages: File[] = formData.getAll("images") as File[];
  console.log(description);
  console.log(user);
  console.log(uploadedImages);
  console.log("USER ID: ", user.id);

  const parsedRequestData: RequestData = {
    description: description,
    user: user,
    images: uploadedImages,
  };

  return parsedRequestData;
}

async function UploadImages(parsedRequestData: RequestData) {
  // Array to store URLs of uploaded images
  const uploadedImageUrls: string[] = [];

  // Upload each image
  for (const image of parsedRequestData.images) {
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload image to Vercel Blob storage
    const { url } = await put(
      `user-uploads/${parsedRequestData.user.id}/${image.name}`,
      buffer,
      { access: "public" }
    );
    uploadedImageUrls.push(url);
  }
  console.log("Uploaded image URLs:", uploadedImageUrls);
  return uploadedImageUrls;
}

async function VerifyUserAsync(): Promise<User | null> {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return null;
  }

  const userInDb = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  return userInDb;
}
function DeligateToAiAgentsAsync(images: File[], description: string) {
  throw new Error("Function not implemented.");
}
