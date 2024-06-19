import { IdentifyRequest } from "@prisma/client";
import React from "react";
import { json } from "stream/consumers";

interface Product {
  id: string;
  description: string | null;
  images: {
    uploadedImageUrls: string[];
  };
  userId: string;
}

export default async function page() {
  const res = await fetch("http://localhost:3000/api/Products", {
    cache: "no-cache",
  }); //server side requires full url

  console.log(res);
  const products: Product[] = await res.json();
  console.log(products);

  return (
    <div className="flex justify-center">
      <div>
        {products.map((p) => (
          <div className="p-8">
            <p>{p.description}</p>
            <p>
              {p.images.uploadedImageUrls.map((iu) => (
                <img src={iu}></img>
              ))}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
