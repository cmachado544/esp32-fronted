import { useState, useCallback, useEffect } from "react";
import type { GalleryImage } from "@/types/image";

export const useLightbox = (images: GalleryImage[]) => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);

  const isOpen = currentIndex !== null;
  const currentImage = currentIndex !== null ? images[currentIndex] : null;

  const open = useCallback((index: number) => {
    setCurrentIndex(index);
    setZoom(1);
  }, []);

  const close = useCallback(() => {
    setCurrentIndex(null);
    setZoom(1);
  }, []);

  const next = useCallback(() => {
    if (currentIndex === null) return;
    setCurrentIndex((currentIndex + 1) % images.length);
    setZoom(1);
  }, [currentIndex, images.length]);

  const prev = useCallback(() => {
    if (currentIndex === null) return;
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
    setZoom(1);
  }, [currentIndex, images.length]);

  const zoomIn = useCallback(() => setZoom((z) => Math.min(z + 0.5, 4)), []);
  const zoomOut = useCallback(() => setZoom((z) => Math.max(z - 0.5, 0.5)), []);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "+") zoomIn();
      if (e.key === "-") zoomOut();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, close, next, prev, zoomIn, zoomOut]);

  return { isOpen, currentImage, currentIndex, open, close, next, prev, zoom, zoomIn, zoomOut };
};
