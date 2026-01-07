import { useEffect, useState } from "react";
import { FALLBACK_IMAGE_URL } from "../utils/images.js";

export default function ImageWithFallback({
  src,
  alt,
  className,
  fallbackSrc = FALLBACK_IMAGE_URL
}) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    if (!src) {
      setCurrentSrc(fallbackSrc);
      setShowFallback(true);
      return;
    }
    setCurrentSrc(src);
    setShowFallback(false);
  }, [src, fallbackSrc]);

  const handleError = () => {
    if (currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setShowFallback(true);
    }
  };

  return (
    <div className="relative h-full w-full">
      <img
        src={currentSrc}
        alt={alt}
        className={className}
        loading="lazy"
        onError={handleError}
      />
      {showFallback ? (
        <span className="absolute inset-x-0 bottom-3 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/60">
          Image unavailable
        </span>
      ) : null}
    </div>
  );
}
