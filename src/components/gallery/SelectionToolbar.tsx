import { Trash2, Download, CheckSquare, XSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface SelectionToolbarProps {
  selectedCount: number;
  totalCount: number;
  onSelectAll: () => void;
  onClearSelection: () => void;
  onDelete: () => void;
  onDownload: () => void;
  isDeleting: boolean;
}

const SelectionToolbar = ({
  selectedCount,
  totalCount,
  onSelectAll,
  onClearSelection,
  onDelete,
  onDownload,
  isDeleting,
}: SelectionToolbarProps) => {
  if (selectedCount === 0) return null;

  return (
    <div className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-3 rounded-xl border bg-card/95 backdrop-blur-sm p-4 shadow-md">
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-foreground">
          {selectedCount} seleccionada{selectedCount !== 1 ? "s" : ""}
        </span>
        <Button variant="outline" size="sm" onClick={selectedCount === totalCount ? onClearSelection : onSelectAll}>
          {selectedCount === totalCount ? (
            <><XSquare className="mr-1 h-4 w-4" /> Deseleccionar</>
          ) : (
            <><CheckSquare className="mr-1 h-4 w-4" /> Seleccionar todo</>
          )}
        </Button>
        <Button variant="ghost" size="sm" onClick={onClearSelection}>
          Cancelar
        </Button>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={onDownload}>
          <Download className="mr-1 h-4 w-4" /> Descargar
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm" disabled={isDeleting}>
              <Trash2 className="mr-1 h-4 w-4" /> Eliminar
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Eliminar {selectedCount} imagen{selectedCount !== 1 ? "es" : ""}?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción no se puede deshacer. Las imágenes se eliminarán permanentemente del servidor y del almacenamiento en la nube.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Sí, eliminar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default SelectionToolbar;
