import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchImages, deleteImages } from "@/services/imageService";
import { toast } from "@/hooks/use-toast";

export const useImages = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["images"],
    queryFn: fetchImages,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteImages,
    onSuccess: (_, ids) => {
      queryClient.invalidateQueries({ queryKey: ["images"] });
      toast({
        title: "Imágenes eliminadas",
        description: `${ids.length} imagen(es) eliminada(s) correctamente.`,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "No se pudieron eliminar las imágenes.",
        variant: "destructive",
      });
    },
  });

  return {
    images: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    deleteImages: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
  };
};
