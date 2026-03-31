import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { toast } from "@/hooks/use-toast";

import { useImages } from "@/hooks/useImages";
import { useImageSelection } from "@/hooks/useImageSelection";
import { useLightbox } from "@/hooks/useLightbox";

import ImageGrid from "@/components/gallery/ImageGrid";
import Lightbox from "@/components/gallery/Lightbox";
import SelectionToolbar from "@/components/gallery/SelectionToolbar";

const Gallery = () => {
  const navigate = useNavigate();
  const { images, isLoading, deleteImages, isDeleting } = useImages();
  const { selectedIds, selectedCount, toggle, selectAll, clearSelection, isSelected } = useImageSelection();
  const lightbox = useLightbox(images);

  const handleDelete = useCallback(async () => {
    const ids = Array.from(selectedIds);
    await deleteImages(ids);
    clearSelection();
  }, [selectedIds, deleteImages, clearSelection]);

  const handleDownload = useCallback(async () => {
    const selected = images.filter((img) => selectedIds.has(img.id));
    if (selected.length === 0) return;

    if (selected.length === 1) {
      try {
        const res = await fetch(selected[0].url);
        const blob = await res.blob();
        saveAs(blob, selected[0].filename);
        toast({ title: "Descarga iniciada", description: selected[0].filename });
      } catch {
        toast({ title: "Error", description: "No se pudo descargar la imagen.", variant: "destructive" });
      }
      return;
    }

    toast({ title: "Preparando ZIP...", description: `Empaquetando ${selected.length} imágenes.` });
    try {
      const zip = new JSZip();
      const results = await Promise.all(
        selected.map(async (img) => {
          const res = await fetch(img.url);
          const blob = await res.blob();
          return { name: img.filename, blob };
        })
      );
      results.forEach(({ name, blob }) => zip.file(name, blob));
      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, `esp32_capturas_${Date.now()}.zip`);
      toast({ title: "Descarga completada", description: `${selected.length} imágenes descargadas.` });
    } catch {
      toast({ title: "Error", description: "No se pudo generar el archivo ZIP.", variant: "destructive" });
    }
  }, [images, selectedIds]);

  const selectionMode = selectedCount > 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Camera className="h-5 w-5 text-primary" />
            <h1 className="text-lg font-semibold text-foreground">Galería ESP32-CAM</h1>
          </div>
          <span className="text-sm text-muted-foreground">
            {images.length} imagen{images.length !== 1 ? "es" : ""}
          </span>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto space-y-4 px-4 py-6">
        <SelectionToolbar
          selectedCount={selectedCount}
          totalCount={images.length}
          onSelectAll={() => selectAll(images.map((i) => i.id))}
          onClearSelection={clearSelection}
          onDelete={handleDelete}
          onDownload={handleDownload}
          isDeleting={isDeleting}
        />

        <ImageGrid
          images={images}
          isLoading={isLoading}
          selectionMode={selectionMode}
          isSelected={isSelected}
          onToggleSelect={toggle}
          onImageClick={lightbox.open}
        />
      </main>

      {/* Lightbox */}
      <Lightbox
        image={lightbox.currentImage}
        isOpen={lightbox.isOpen}
        zoom={lightbox.zoom}
        onClose={lightbox.close}
        onNext={lightbox.next}
        onPrev={lightbox.prev}
        onZoomIn={lightbox.zoomIn}
        onZoomOut={lightbox.zoomOut}
        currentIndex={lightbox.currentIndex}
        total={images.length}
      />
    </div>
  );
};

export default Gallery;
