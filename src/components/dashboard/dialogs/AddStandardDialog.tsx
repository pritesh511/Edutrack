"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import toast from "react-hot-toast";
import { Standard } from "@/utils/types";
import {
  useEditStandardMutation,
  usePostStandardMutation,
} from "@/redux/query/standard";
import CommonForm from "@/components/common/form/CommonForm";
import {
  standardFormConfig,
  standardIntialValues,
} from "@/utils/mocks/standard.mock";
import { FormikValues } from "formik";

interface Props {
  closeModal: () => void;
  isModalOpen: boolean;
  isEditStandard: Standard | null;
}

const AddStandardDialog = React.memo(function AddStandardDialog(props: Props) {
  const { closeModal, isModalOpen, isEditStandard } = props;
  const [postStandard, { isLoading: isPostFormLoading }] =
    usePostStandardMutation();
  const [editStandard, { isLoading: isEditFormLoading }] =
    useEditStandardMutation();
  const [formValues, setFormValues] = useState(standardIntialValues);
  const isFormLoading = isPostFormLoading || isEditFormLoading;

  useEffect(() => {
    if (isEditStandard) {
      setFormValues({
        ...isEditStandard,
        standard: isEditStandard.standard || "",
        description: isEditStandard.description || "",
      });
    }
  }, [isEditStandard]);

  const handleSubmitStandard = async (values: FormikValues) => {
    try {
      if (isEditStandard) {
        const { data, error } = await editStandard({
          id: isEditStandard._id,
          form: values,
        });
        if (error) {
          toast.error((error as any)?.data.message);
        } else {
          toast.success(data.message);
          closeModal();
        }
      } else {
        const { data, error } = await postStandard(values);
        if (error) {
          toast.error((error as any)?.data.message);
        } else {
          toast.success(data.message);
          closeModal();
        }
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleCloseModal = () => {
    if (isFormLoading) {
      return;
    } else {
      closeModal();
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditStandard ? "Edit Standard" : "Add Standard"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <CommonForm
            formConfig={standardFormConfig()}
            onSubmit={(values) => handleSubmitStandard(values)}
            initialValues={formValues}
            isSubmitting={isFormLoading}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
});

export default AddStandardDialog;
