import React from "react";
import Image from "next/image";

export default function MerseysideLogo({
  className = "w-auto h-8",
  alt = "MERSEYSIDE",
  sizes = "(max-width: 640px) 92vw, 768px",
  priority = false,
}: {
  className?: string;
  alt?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/merseyside.webp"
      alt={alt}
      width={6356}
      height={938}
      sizes={sizes}
      priority={priority}
      loading={priority ? "eager" : undefined}
      className={`object-contain select-none ${className}`}
      style={{ filter: "brightness(0) invert(1)" }}
    />
  );
}
