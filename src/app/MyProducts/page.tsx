import React, { Suspense } from "react";

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

  if (res.ok == false) {
    return (
      <>
        <div>PRODUCTS LOAD ERROR</div>
      </>
    );
  }
  console.log(products);

  return (
    <div className="flex justify-center">
      <div>
        {products.map((p) => (
          <div key={p.id} className="p-8">
            <p className="p-2">{p.description}</p>
            <div className="inline-flex">
              {p.images.uploadedImageUrls.map((iu) => (
                <img
                  key={iu}
                  className="h-40 w-40 object-cover px-2"
                  src={iu}
                ></img>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
