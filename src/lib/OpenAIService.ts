import OpenAI from "openai";
import { toBase64 } from "openai/core.mjs";
import { json } from "stream/consumers";

export async function GetOpenAIResult(
  imageUrls: string[],
  description: string
) {
  const openai = new OpenAI({
    organization: "org-OpPz72NILcFSx0bRufDxlIky",
    apiKey: process.env.OPENAI_API_KEY,
  });

  const assistant = openai.beta.assistants.retrieve("");

  const imageContentList:
    | string
    | OpenAI.Chat.Completions.ChatCompletionContentPart[] = imageUrls.map(
    (iu) => {
      return {
        type: "image_url",
        image_url: {
          url: iu,
          detail: "high",
        },
      };
    }
  );

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.1,
    stream: false,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content:
          "You are a product and price expert that will identify what single product is presented on the images and the user might provide clues",
      },
      {
        role: "system",
        content: `You only return data in a "json" format in the following fashion: {  confidence: number; name: string; brand: string; releaseYear: number; priceHistory: { used: { date: Date; price: Number }; new: { date: Date; price: Number };}[];}`,
      },
      {
        role: "user",
        content: [{ type: "text", text: description }, ...imageContentList],
      },
    ],
  });

  const result = response.choices[0].message.content;
  console.log(result);

  if (result) {
    const jsonResult = JSON.parse(result);
    console.log(jsonResult);
  }
}
