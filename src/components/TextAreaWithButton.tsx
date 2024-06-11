import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function TextareaWithButton() {
  return (
    <div className="grid w-full gap-2">
      <Textarea
        rows={7}
        placeholder="Describe what is on your images, remember it can only be one product"
      />
      <Button>Send message</Button>
    </div>
  );
}
