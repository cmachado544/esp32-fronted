import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface ImageCardProps {
  src: string;
  filename: string;
  date: string;
  selected: boolean;
  selectionMode: boolean;
  onSelect: () => void;
  onClick: () => void;
}

const ImageCard = ({ src, filename, date, selected, selectionMode, onSelect, onClick }: ImageCardProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border bg-card shadow-sm transition-all duration-300 hover:shadow-lg cursor-pointer",
        selected && "ring-2 ring-primary ring-offset-2"
      )}
      onClick={() => (selectionMode ? onSelect() : onClick())}
    >
      {/* Checkbox */}
      <div
        className={cn(
          "absolute top-2 left-2 z-10 transition-opacity duration-200",
          selectionMode ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        )}
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
      >
        <Checkbox checked={selected} className="h-5 w-5 bg-background/80 backdrop-blur-sm" />
      </div>

      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden bg-muted">
        {!loaded && <div className="h-full w-full animate-pulse bg-muted" />}
        <img
          src={src}
          alt={filename}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={cn(
            "h-full w-full object-cover transition-transform duration-300 group-hover:scale-105",
            !loaded && "opacity-0"
          )}
        />
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="truncate text-sm font-medium text-foreground">{filename}</p>
        <p className="text-xs text-muted-foreground">
          {new Date(date).toLocaleDateString("es-EC", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
};

export default ImageCard;
