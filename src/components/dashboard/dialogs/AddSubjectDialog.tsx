"use client";
import React, { useState } from "react";
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

interface Props {
  closeModal: () => void;
  isModalOpen: boolean;
}

interface SubjectForm {
  subjectName: string;
  description: string;
  file: File | null;
}

const AddSubjectDialog = (props: Props) => {
  const [subjectForm, setSubjectForm] = useState<SubjectForm>({
    subjectName: "",
    description: "",
    file: null,
  });
  const { closeModal, isModalOpen } = props;

  const handleChangeImage = (file: FileList | null) => {
    if (file) {
      setSubjectForm({
        ...subjectForm,
        file: file[0],
      });
    }
  };

  const handleChangeInput = (
    event: React.ChangeEvent<{ name: string; value: string }>
  ) => {
    const name = event.target.name;
    const value = event.target.value;

    setSubjectForm({
      ...subjectForm,
      [name]: value,
    });
  };

  const handleSubmitSubject = async () => {
    try {
      const formData = new FormData();
      formData.append("subjectName", subjectForm.subjectName);
      formData.append("description", subjectForm.description);
      if (subjectForm.file) {
        formData.append("file", subjectForm.file);
      }
      const response = await axios.post("/api/dashboard/subject", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response);
      closeModal();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Subject</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Subject Name"
            name="subjectName"
            onChange={(event) => handleChangeInput(event)}
          />
          <textarea
            id="description"
            rows={3}
            name="description"
            onChange={(event) => handleChangeInput(event)}
            placeholder="Write your comment for subject here..."
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <Input
            id="picture"
            type="file"
            accept="image/*"
            onChange={(event) => handleChangeImage(event.target.files)}
          />
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={closeModal}>
              Cancel
            </Button>
            <Button onClick={handleSubmitSubject}>Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddSubjectDialog;
