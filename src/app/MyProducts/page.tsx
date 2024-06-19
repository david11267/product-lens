import { IdentifyRequest } from "@prisma/client";
import React from "react";

export default async function page() {
  const res = await fetch("http://localhost:3000/api/Products", {
    cache: "no-cache",
  }); //server side requires full url

  console.log(res);
  const products: IdentifyRequest[] = await res.json();
  console.log(products);

  return (
    <div className="flex justify-center">
      <div>
        {products.map((p) => (
          <div>
            <p>{p.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
