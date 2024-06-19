import { prisma } from "@/lib/dbService";
import { IdentifyRequest, Prisma, User } from "@prisma/client";
import { put } from "@vercel/blob";
import { randomUUID } from "crypto";

interface RequestData {
  images: File[];
  description: string;
  user: User;
}

export async function POST(request: Request) {
  try {
    const parsedRequestData = await ParseFormData(request);
    const uploadedImageUrls = await UploadImages(parsedRequestData);
    const jsonUploadedImageUrls = {
      imageUrls: uploadedImageUrls,
    };
    const IdentifyRequest = {
      id: randomUUID(),
      description: parsedRequestData.description,
      images: jsonUploadedImageUrls,
    };

    const updatedUser = await prisma.user.update({
      where: {
        id: parsedRequestData.user.id,
      },
      data: {
        aiTokens: {
          decrement: 1,
        },
        identifyRequests: {
          create: IdentifyRequest,
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
