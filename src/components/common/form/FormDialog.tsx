// components/common/FormDialog.tsx
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CommonForm from "@/components/common/form/CommonForm";

interface FormDialogProps<T> {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  formConfig: any;
  initialValues: T;
  onSubmit: (values: T) => Promise<boolean>;
  isSubmitting: boolean;
}

const FormDialog = <T extends {}>({
  isOpen,
  onClose,
  title,
  formConfig,
  initialValues,
  onSubmit,
  isSubmitting,
}: FormDialogProps<T>) => {
  const handleClose = () => {
    if (!isSubmitting) onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <CommonForm
            formConfig={formConfig}
            onSubmit={onSubmit}
            initialValues={initialValues}
            isSubmitting={isSubmitting}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FormDialog;
