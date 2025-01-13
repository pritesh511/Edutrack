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
  };

  const handleSubmitStandard = async () => {
    const { standard, description } = formData;
    if (standard && description) {
      try {
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
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    } else {
      toast.error("Please fill required data");
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
            {isEditStandard ? "Edit Standard" : "Add New Standard"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Subject Name"
            name="standard"
            value={formData.standard}
            onChange={(event) => handleChangeInput(event)}
          />
          <Textarea
            name="description"
            value={formData.description}
            onChange={(event) => handleChangeInput(event)}
            placeholder="Write your comment for standard here..."
          />
          <div className="flex justify-end space-x-2">
            <Button
              disabled={isFormLoading}
              variant="outline"
              onClick={closeModal}
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
