export interface GalleryImage {
  id: string;
  url: string;
  thumbnailUrl: string;
  filename: string;
  uploadedAt: string;
  label?: string;
  // Cloudinary public_id — needed for deletion via API
  cloudinaryId?: string;
}

export interface ImageApiResponse {
  success: boolean;
  data?: GalleryImage[];
  message?: string;
}
