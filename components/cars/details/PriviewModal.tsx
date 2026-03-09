 "use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

import { ChevronLeft, ChevronRight } from "lucide-react";

type PreviewImage = {
  id: string | number;
  image_url: string;
};

export default function PriviewModal({
  open,
  onOpenChange,
  images,
  carName,
  index,
  onIndexChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  images: PreviewImage[];
  carName: string;
  index: number;
  onIndexChange: (nextIndex: number) => void;
}) {
  const previewImage = images[index] ?? null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl border-0 bg-black p-0 sm:max-w-6xl">
        <DialogTitle className="sr-only">{carName} - Preview</DialogTitle>

        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
          {previewImage ? (
            <Image
              key={previewImage.id}
              src={previewImage.image_url}
              alt={`${carName} preview`}
              fill
              sizes="100vw"
              className="object-contain"
            />
          ) : null}

          {images.length > 1 ? (
            <>
              <Button
                type="button"
                variant="ghost"
                onClick={() =>
                  onIndexChange((index - 1 + images.length) % images.length)
                }
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 text-white hover:bg-white/20"
                aria-label="Gambar sebelumnya"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden />
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => onIndexChange((index + 1) % images.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 text-white hover:bg-white/20"
                aria-label="Gambar berikutnya"
              >
                <ChevronRight className="h-5 w-5" aria-hidden />
              </Button>
            </>
          ) : null}

          {images.length > 0 ? (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/55 px-3 py-1 text-xs font-bold text-white">
              {index + 1} / {images.length}
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
