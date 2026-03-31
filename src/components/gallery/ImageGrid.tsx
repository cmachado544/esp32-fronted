import type { GalleryImage } from "@/types/image";
import ImageCard from "./ImageCard";
import { Skeleton } from "@/components/ui/skeleton";

interface ImageGridProps {
  images: GalleryImage[];
  isLoading: boolean;
  selectionMode: boolean;
  isSelected: (id: string) => boolean;
  onToggleSelect: (id: string) => void;
  onImageClick: (index: number) => void;
}

const ImageGrid = ({ images, isLoading, selectionMode, isSelected, onToggleSelect, onImageClick }: ImageGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="aspect-[4/3] w-full rounded-xl" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="rounded-full bg-muted p-6 mb-4">
          <svg className="h-12 w-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <p className="text-lg font-medium text-foreground">No hay imágenes aún</p>
        <p className="text-sm text-muted-foreground">Las capturas de la ESP32-CAM aparecerán aquí</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {images.map((image, index) => (
        <ImageCard
          key={image.id}
          src={image.thumbnailUrl}
          filename={image.filename}
          date={image.uploadedAt}
          selected={isSelected(image.id)}
          selectionMode={selectionMode}
          onSelect={() => onToggleSelect(image.id)}
          onClick={() => onImageClick(index)}
        />
      ))}
    </div>
  );
};

export default ImageGrid;
