"use client";
import React, { useEffect, useState } from "react";
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
import { subjectSchema } from "@/utils/schema";
import { transformYupErrorsIntoObject } from "@/helpers/helper";
import CustomTextField from "@/components/common/CustomTextField";
import CustomTextarea from "@/components/common/CustomTextarea";

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
  const [errors, setErrors] = useState<any>({});
  const [postSubject, { isLoading: isAddSubjectLoading }] =
    usePostSubjectMutation();
  const [editSubject, { isLoading: isEditSubjectLoading }] =
    useEditSubjectMutation();

  const isFormLoading = isAddSubjectLoading || isEditSubjectLoading;

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

      setErrors((prev: any) => ({
        ...prev,
        file: "",
      }));
    }
  };

  const handleClickInput = (name: string) => {
    setErrors((prev: any) => ({
      ...prev,
      [name]: "",
    }));
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
      const { subjectName, description, file } = subjectForm;

      await subjectSchema.validate(subjectForm, { abortEarly: false });

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
            {isEditSubject ? "Edit Subject" : "Add Subject"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <CustomTextField
            label="Subject Name"
            placeholder="Subject Name"
            fieldName="subjectName"
            value={subjectForm.subjectName}
            onChangeInput={(event) => handleChangeInput(event)}
            error={errors?.subjectName}
            onClickInput={() => handleClickInput("subjectName")}
          />
          <CustomTextarea
            label="Description"
            fieldName="description"
            value={subjectForm.description}
            handleChange={(event) => handleChangeInput(event)}
            placeholder="Write your comment for subject here..."
            error={errors?.description}
            onClick={() => handleClickInput("description")}
          />
          {!isEditSubject && (
            <>
              <Input
                id="picture"
                type="file"
                accept="image/*"
                onChange={(event) => handleChangeImage(event.target.files)}
                className={`${errors?.file ? "border-destructive" : ""}`}
              />
              {errors?.file && (
                <span className="text-sm text-destructive">{errors?.file}</span>
              )}
            </>
          )}
          <div className="flex justify-end space-x-2">
            <Button
              disabled={isFormLoading}
              variant="outline"
              onClick={closeModal}
            >
              Cancel
            </Button>
            <Button disabled={isFormLoading} onClick={handleSubmitSubject}>
              {isFormLoading ? <CircularProgress /> : "Save"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
});

export default AddSubjectDialog;
