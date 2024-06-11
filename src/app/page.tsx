"use client";
import { TextareaWithButton } from "@/components/TextAreaWithButton";
import { url } from "inspector";
import { useState, ChangeEvent, EventHandler } from "react";
import { TiDelete } from "react-icons/ti";

interface UploadedImage {
  file: File;
  url: string;
}

export default function Home() {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [descriptionInput, setDescriptionInput] = useState<string>("");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileLimit = 4;

    if (event.target.files) {
      const files = Array.from(event.target.files);

      if (files.length + uploadedImages.length > fileLimit) {
        alert(`You can only upload up to ${fileLimit} files.`);
        return;
      }
      const imageObjects = files.map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }));

      setUploadedImages((prevImages) => [...prevImages, ...imageObjects]);
    }
  };

  function handleDeleteImage(url: string) {
    const newState = uploadedImages.filter((image) => image.url !== url);
    setUploadedImages(newState);
  }

  const uploadHTML = (
    <div className="flex items-center justify-center w-full">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center p-2">
          <svg
            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-center text-xs text-gray-500 dark:text-gray-400">
            SVG, PNG, JPG or GIF (MAX. 800x400px)
          </p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          multiple
          accept="image/*"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );

  return (
    <main>
      <div className="grid grid-cols-2 gap-4">
        {uploadedImages.map((image, index) => (
          <div key={image.url} className="relative">
            <img
              src={image.url}
              alt={`Uploaded ${index + 1}`}
              className="z-10 w-full h-48 object-cover rounded-lg "
            />
            <TiDelete
              onClick={() => handleDeleteImage(image.url)}
              className="transition absolute top-0 text-danger text-4xl cursor-pointer hover:scale-125 "
            />
          </div>
        ))}
        {uploadedImages.length <= 3 && uploadHTML}
      </div>

      <div className="fixed bottom-0 w-full -mx-8 p-4">
        <TextareaWithButton
          descriptionInput={descriptionInput}
          setDescriptionInput={setDescriptionInput}
        />
      </div>
    </main>
  );
}
