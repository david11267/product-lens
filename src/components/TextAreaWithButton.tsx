import { UploadedImage } from "@/app/page";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dispatch, SetStateAction } from "react";

interface props {
  descriptionInput: string;
  setDescriptionInput: Dispatch<SetStateAction<string>>;
  IdentifyRequest(): Promise<void>;
}

export function TextareaWithButton({
  descriptionInput,
  setDescriptionInput,
  IdentifyRequest,
}: props) {
  function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setDescriptionInput(e.target.value);
  }

  return (
    <div className="grid w-full gap-2">
      <Textarea
        onChange={(e) => handleInputChange(e)}
        rows={3}
        placeholder="Describe your product"
        value={descriptionInput}
      />
      <Button onClick={IdentifyRequest}>Send message</Button>{" "}
    </div>
  );
}
