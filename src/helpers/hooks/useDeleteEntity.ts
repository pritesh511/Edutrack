// hooks/useDeleteEntity.ts
import toast from "react-hot-toast";
import { useState } from "react";

interface UseDeleteEntityProps {
  entityName: string;
  successMessage?: string;
  errorMessage?: string;
}

export const useDeleteEntity = <T extends (id: string) => any>({
  entityName,
  successMessage,
  errorMessage,
}: UseDeleteEntityProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (id: string, deleteMutation: T) => {
    setIsDeleting(true);
    try {
      const { data, error } = await deleteMutation(id);

      if (error) {
        toast.error(
          error.data?.message ||
            errorMessage ||
            `Failed to delete ${entityName}`
        );
      } else {
        toast.success(
          data?.message ||
            successMessage ||
            `${entityName} deleted successfully!`
        );
      }
      return { data, error };
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || errorMessage || "Something went wrong"
      );
      return { error };
    } finally {
      setIsDeleting(false);
    }
  };

  return { handleDelete, isDeleting };
};
