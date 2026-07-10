'use client';

import { useState } from 'react';

interface MarkdownImageProps {
  src?: string;
  alt?: string;
}

// Renders markdown images: .mp4 sources become an autoplaying muted video,
// everything else becomes a clickable image that opens a fullscreen preview.
export function MarkdownImage({ src, alt }: MarkdownImageProps) {
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  if (!src) return null;

  if (src.endsWith('.mp4')) {
    return (
      <video
        src={src}
        title={alt}
        autoPlay
        muted
        loop
        playsInline
        className="my-4 w-full rounded-lg shadow"
      />
    );
  }

  return (
    <>
      <img
        src={src}
        alt={alt}
        className="my-4 w-full cursor-pointer rounded-lg shadow"
        onClick={() => setPreviewSrc(src)}
      />
      {previewSrc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setPreviewSrc(null)}
        >
          <img
            src={previewSrc}
            alt="preview"
            className="max-h-full max-w-full rounded-md shadow-lg"
          />
        </div>
      )}
    </>
  );
}

export default MarkdownImage;
