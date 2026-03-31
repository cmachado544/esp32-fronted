import type { GalleryImage } from "@/types/image";

//const API_URL = "https://esp32-backend-vecc.onrender.com";
const API_URL = import.meta.env.VITE_API_URL;

// Obtener imágenes desde tu backend
export const fetchImages = async (): Promise<GalleryImage[]> => {
  const res = await fetch(`${API_URL}/images`);
  const data = await res.json();

  // Transformar datos del backend → frontend
  return data.map((img: any) => ({
    id: img._id,
    url: img.url,
    thumbnailUrl: img.url,
    filename: img.filename || "sin_nombre.jpg",
    uploadedAt: img.createdAt,
    cloudinaryId: "", // lo dejamos vacío por ahora
  }));
};

// Eliminar imágenes (por ahora solo frontend, luego lo conectamos)
export const deleteImages = async (ids: string[]): Promise<void> => {
  await fetch(`${API_URL}/images`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ids }),
  });
};

// Subida (no se usa porque lo hace el ESP32)
export const uploadImage = async (_file: File): Promise<GalleryImage> => {
  throw new Error("La subida se hace desde la ESP32");
};