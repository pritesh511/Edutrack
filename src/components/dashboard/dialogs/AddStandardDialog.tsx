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
import axios from "axios";
import CircularProgress from "@/components/common/CircularProgress";
import { Standard } from "@/utils/types";
import { Textarea } from "@/components/ui/textarea";
import axiosInstance from "@/helpers/axios/axiosInstance";

interface Props {
  closeModal: () => void;
  isModalOpen: boolean;
  getAllStandards: Function;
  isEditStandard: Standard | null;
}

interface StandardForm {
  standard: string;
  description: string;
}

const AddStandardDialog = React.memo(function AddStandardDialog(props: Props) {
  const { closeModal, isModalOpen, getAllStandards, isEditStandard } = props;
  const [formData, setFormData] = useState<StandardForm>({
    standard: "",
    description: "",
  });
  const [isPending, startTransition] = useTransition();

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

  const handleSubmitSubject = async () => {
    const { standard, description } = formData;
    if (standard && description) {
      startTransition(async () => {
        try {
          const url = isEditStandard
            ? `/api/dashboard/standard?subjectId=${isEditStandard._id}`
            : "/api/dashboard/standard";

          const method = isEditStandard ? "PUT" : "POST";

          const response = await axiosInstance({
            method,
            url,
            data: formData,
          });

          closeModal();
          toast.success(response.data.message);
          getAllStandards();
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Something went wrong");
        }
      });
    } else {
      toast.error("Please fill required data");
    }
  };

  const handleCloseModal = () => {
    if (isPending) {
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
            <Button disabled={isPending} variant="outline" onClick={closeModal}>
              Cancel
            </Button>
            <Button disabled={isPending} onClick={handleSubmitSubject}>
              {isPending ? <CircularProgress /> : "Save"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
});

export default AddStandardDialog;
