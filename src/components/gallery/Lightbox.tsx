import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { GalleryImage } from "@/types/image";

interface LightboxProps {
  image: GalleryImage | null;
  isOpen: boolean;
  zoom: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  currentIndex: number | null;
  total: number;
}

const Lightbox = ({ image, isOpen, zoom, onClose, onNext, onPrev, onZoomIn, onZoomOut, currentIndex, total }: LightboxProps) => {
  const touchStartX = useRef<number | null>(null);
  const [dragX, setDragX] = useState(0);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    setDragX(e.touches[0].clientX - touchStartX.current);
  };

  const handleTouchEnd = () => {
    if (Math.abs(dragX) > 80) {
      if (dragX > 0) onPrev();
      else onNext();
    }
    touchStartX.current = null;
    setDragX(0);
  };

  const handleDownload = async () => {
    if (!image) return;
    const res = await fetch(image.url);
    const blob = await res.blob();
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = image.filename;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <AnimatePresence>
      {isOpen && image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          //className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
	  className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 overflow-hidden"
          onClick={onClose}
        >
          {/* Top bar */}
          <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4" onClick={(e) => e.stopPropagation()}>
            <span className="text-sm text-white/70">
              {(currentIndex ?? 0) + 1} / {total} — {image.filename}
            </span>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={onZoomOut}><ZoomOut className="h-5 w-5" /></Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={onZoomIn}><ZoomIn className="h-5 w-5" /></Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={handleDownload}><Download className="h-5 w-5" /></Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={onClose}><X className="h-5 w-5" /></Button>
            </div>
          </div>

          {/* Nav arrows */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 z-10 text-white hover:bg-white/20 h-12 w-12"
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 z-10 text-white hover:bg-white/20 h-12 w-12"
            onClick={(e) => { e.stopPropagation(); onNext(); }}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>

          {/* Image */}
          <motion.img
            key={image.id}
            src={image.url}
            alt={image.filename}
	    initial={{ opacity: 0 }}
            // initial={{ scale: 0.9, opacity: 0 }}
	    animate={{ opacity: 1 }}
            // animate={{ scale: 1, opacity: 1 }}
	    exit={{ opacity: 0 }}
            //exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="max-h-[80vh] max-w-[90vw] rounded-lg object-contain select-none"
            //style={{ transform: `scale(${zoom}) translateX(${dragX}px)` }}
            style={{
    	      scale: zoom,
    	      x: dragX
  	    }}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            draggable={false}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Lightbox;
