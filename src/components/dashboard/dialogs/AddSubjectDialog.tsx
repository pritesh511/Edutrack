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
import { Subject } from "@/utils/types";
import {
  useEditSubjectMutation,
  usePostSubjectMutation,
} from "@/redux/query/subject";

interface Props {
  closeModal: () => void;
  isModalOpen: boolean;
  isEditSubject: Subject | null;
}

interface SubjectForm {
  subjectName: string;
  description: string;
  file: File | null;
}

const AddSubjectDialog = React.memo(function AddSubjectDialog(props: Props) {
  const { closeModal, isModalOpen, isEditSubject } = props;
  const [subjectForm, setSubjectForm] = useState<SubjectForm>({
    subjectName: "",
    description: "",
    file: null,
  });
  const [postSubject] = usePostSubjectMutation();
  const [editSubject] = useEditSubjectMutation();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (isEditSubject) {
      setSubjectForm({
        ...subjectForm,
        subjectName: isEditSubject.subjectName || "",
        description: isEditSubject.description || "",
      });
    } else {
      setSubjectForm({
        subjectName: "",
        description: "",
        file: null,
      });
    }
  }, [isEditSubject]);

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
    const { subjectName, description, file } = subjectForm;
    if (subjectName && description) {
      startTransition(async () => {
        try {
          const formData = new FormData();
          formData.append("subjectName", subjectName);
          formData.append("description", description);
          if (file) {
            formData.append("file", file);
          }

          if (isEditSubject) {
            const { data, error } = await editSubject({
              form: formData,
              id: isEditSubject._id,
            });
            if (error) {
              toast.error((error as any)?.data.message);
            } else {
              toast.success(data.message);
              setSubjectForm({
                subjectName: "",
                description: "",
                file: null,
              });
              closeModal();
            }
          } else {
            const { data, error } = await postSubject(formData);
            if (error) {
              toast.error((error as any)?.data.message);
            } else {
              toast.success(data.message);
              setSubjectForm({
                subjectName: "",
                description: "",
                file: null,
              });
              closeModal();
            }
          }
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
            {isEditSubject ? "Edit Subject" : "Add New Subject"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Subject Name"
            name="subjectName"
            value={subjectForm.subjectName}
            onChange={(event) => handleChangeInput(event)}
          />
          <textarea
            id="description"
            rows={3}
            name="description"
            value={subjectForm.description}
            onChange={(event) => handleChangeInput(event)}
            placeholder="Write your comment for subject here..."
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          {!isEditSubject && (
            <Input
              id="picture"
              type="file"
              accept="image/*"
              onChange={(event) => handleChangeImage(event.target.files)}
            />
          )}
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

export default AddSubjectDialog;
