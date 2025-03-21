// hooks/useFormOperations.ts
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

interface UseFormOperationsProps<T> {
  postMutation: (values: T) => Promise<any>;
  editMutation: (id: string, values: T) => Promise<any>;
  entityName: string;
  initialValues: T;
  onSuccessCall: Function;
  editData?: { id: string; values?: T };
}

export const useFormOperations = <T extends {}>({
  postMutation,
  editMutation,
  entityName,
  initialValues,
  editData,
  onSuccessCall
}: UseFormOperationsProps<T>) => {
  const [formValues, setFormValues] = useState<T>(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFormValues(editData?.values || initialValues);
  }, [editData, initialValues]);

  const handleSubmit = async (values: T) => {
    setIsSubmitting(true);
    try {
      if (editData) {
        await editMutation(editData.id, values);
        toast.success(`${entityName} updated successfully!`);
      } else {
        await postMutation(values);
        toast.success(`${entityName} created successfully!`);
      }
      onSuccessCall();
      setIsSubmitting(false);
      return true;
    } catch (error: any) {
      toast.error(
        error.data?.message ||
          `Failed to ${editData ? "update" : "create"} ${entityName}`
      );
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { formValues, handleSubmit, isSubmitting };
};
