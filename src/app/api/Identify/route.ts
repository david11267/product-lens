import { UploadedImage } from "@/app/page";
import { User } from "@prisma/client";

interface RequestData {
  images: UploadedImage[];
  description: string;
  user: User;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // Example: Access description and user data
    const description: string = formData.get("description") as string;
    const user: User = JSON.parse(formData.get("user") as string);

    // Example: Access uploaded images (if using files)
    const uploadedImages: File[] = formData.getAll("images") as File[];

    // Process the received data as needed
    console.log("Received description:", description);
    console.log("Received user:", user);
    console.log("Received images:", uploadedImages);
  } catch (error) {
    return Response.json("there was some server side error");
  }

  return Response.json("hello");
}
