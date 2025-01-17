"use client";
import React, { useEffect, useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import CircularProgress from "@/components/common/CircularProgress";
import { Standard } from "@/utils/types";
import { Textarea } from "@/components/ui/textarea";
import {
  useEditStandardMutation,
  usePostStandardMutation,
} from "@/redux/query/standard";
import { standardSchema } from "@/utils/schema";
import { transformYupErrorsIntoObject } from "@/helpers/helper";
import CustomTextField from "@/components/common/CustomTextField";
import CustomTextarea from "@/components/common/CustomTextarea";

interface Props {
  closeModal: () => void;
  isModalOpen: boolean;
  isEditStandard: Standard | null;
}

interface StandardForm {
  standard: string;
  description: string;
}

const AddStandardDialog = React.memo(function AddStandardDialog(props: Props) {
  const { closeModal, isModalOpen, isEditStandard } = props;
  const [postStandard, { isLoading: isPostFormLoading }] =
    usePostStandardMutation();
  const [editStandard, { isLoading: isEditFormLoading }] =
    useEditStandardMutation();
  const [formData, setFormData] = useState<StandardForm>({
    standard: "",
    description: "",
  });
  const [errors, setErrors] = useState<any>({});

  const isFormLoading = isPostFormLoading || isEditFormLoading;

  useEffect(() => {
    if (isEditStandard) {
      setFormData({
        ...isEditStandard,
        standard: isEditStandard.standard || "",
        description: isEditStandard.description || "",
      });
    } else {
      setFormData({
        standard: "",
        description: "",
      });
    }
  }, [isEditStandard]);

  const handleChangeInput = (
    event: React.ChangeEvent<{ name: string; value: string }>
  ) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors((prev: any) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmitStandard = async () => {
    try {
      const { standard, description } = formData;

      await standardSchema.validate(formData, { abortEarly: false });

      if (isEditStandard) {
        const { data, error } = await editStandard({
          id: isEditStandard._id,
          form: formData,
        });
        if (error) {
          toast.error((error as any)?.data.message);
        } else {
          toast.success(data.message);
          closeModal();
          setFormData({
            standard: "",
            description: "",
          });
        }
      } else {
        const { data, error } = await postStandard(formData);
        if (error) {
          toast.error((error as any)?.data.message);
        } else {
          toast.success(data.message);
          closeModal();
          setFormData({
            standard: "",
            description: "",
          });
        }
      }
    } catch (validationsErrors: any) {
      const errors = transformYupErrorsIntoObject(validationsErrors);
      setErrors(errors);
    }
  };

  const handleCloseModal = () => {
    if (isFormLoading) {
      return;
    } else {
      closeModal();
      setErrors({});
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
          <CustomTextField
            label="Standard Name"
            placeholder="Standard Name"
            fieldName="standard"
            value={formData.standard}
            onChangeInput={(event) => handleChangeInput(event)}
            error={errors?.standard}
          />
          <CustomTextarea
            label="Description"
            fieldName="description"
            value={formData.description}
            handleChange={(event) => handleChangeInput(event)}
            placeholder="Write your comment for standard here..."
            error={errors?.description}
          />
          <div className="flex justify-end space-x-2">
            <Button
              disabled={isFormLoading}
              variant="outline"
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
            <Button disabled={isFormLoading} onClick={handleSubmitStandard}>
              {isFormLoading ? <CircularProgress /> : "Save"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
});

export default AddStandardDialog;
