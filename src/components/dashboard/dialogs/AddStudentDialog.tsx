"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CustomTextField from "@/components/common/CustomTextField";
import { useGetStandardDropdownQuery } from "@/redux/query/standard";
import CustomSelect from "@/components/common/CustomSelect";
import CustomTextarea from "@/components/common/CustomTextarea";
import { transformYupErrorsIntoObject } from "@/helpers/helper";
import { studentSchema } from "@/utils/schema";
import toast from "react-hot-toast";
import {
  useEditStudentMutation,
  usePostStudentMutation,
} from "@/redux/query/student";
import CircularProgress from "@/components/common/CircularProgress";
import { Student } from "@/utils/types";

interface Props {
  closeModal: () => void;
  isModalOpen: boolean;
  isEditStudent: Student | null;
}

interface StudentForm {
  name: string;
  roleNo: number;
  standard: string;
  mobileNo: string;
  address: string;
}

const AddStudentModal = React.memo(function AddStudentModal(props: Props) {
  const { closeModal, isModalOpen, isEditStudent } = props;
  const { data: standardDrodownData } = useGetStandardDropdownQuery("");
  const [postStudent, { isLoading: isAddStudentLoading }] =
    usePostStudentMutation();
  const [putStudent, { isLoading: isEditStudentLoading }] =
    useEditStudentMutation();
  const [formData, setFormData] = useState<StudentForm>({
    name: "",
    roleNo: 0,
    standard: "",
    mobileNo: "",
    address: "",
  });
  const [errors, setErrors] = useState<any>({});

  const isFormLoading = isAddStudentLoading || isEditStudentLoading;

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

  const handleSelectValue = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors((prev: any) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleCloseModal = () => {
    if (!isFormLoading) {
      closeModal();
      setErrors({});
    }
  };

  useEffect(() => {
    if (isEditStudent) {
      setFormData({
        ...formData,
        name: isEditStudent.name || "",
        roleNo: isEditStudent.roleNo || 0,
        standard: isEditStudent.standard._id || "",
        mobileNo: isEditStudent.mobileNo || "",
        address: isEditStudent.address || "",
      });
    } else {
      setFormData({
        name: "",
        roleNo: 0,
        standard: "",
        mobileNo: "",
        address: "",
      });
    }
  }, [isEditStudent]);

  const handleSubmitForm = async () => {
    try {
      await studentSchema.validate(formData, { abortEarly: false });

      if (isEditStudent) {
        const { data, error } = await putStudent({
          form: formData,
          id: isEditStudent._id,
        });
        if (error) {
          toast.error((error as any)?.data.message);
        } else {
          toast.success(data.message);
          setFormData({
            name: "",
            roleNo: 0,
            standard: "",
            mobileNo: "",
            address: "",
          });
          handleCloseModal();
        }
      } else {
        const { data, error } = await postStudent(formData);
        if (error) {
          toast.error((error as any)?.data.message);
        } else {
          toast.success(data.message);
          setFormData({
            name: "",
            roleNo: 0,
            standard: "",
            mobileNo: "",
            address: "",
          });
          handleCloseModal();
        }
      }
    } catch (validationsErrors: any) {
      const errors = transformYupErrorsIntoObject(validationsErrors);
      setErrors(errors);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Student</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <CustomTextField
            label="Name"
            fieldName="name"
            placeholder="Student Name"
            value={formData.name}
            onChangeInput={(event) => handleChangeInput(event)}
            error={errors?.name}
          />
          <CustomTextField
            label="Role No"
            fieldName="roleNo"
            placeholder="Role Number"
            type="number"
            value={formData.roleNo}
            onChangeInput={(event) => handleChangeInput(event)}
            error={errors?.roleNo}
            disabled={Boolean(isEditStudent)}
          />
          <CustomSelect
            label="Standard"
            placeholder={"Select Standard"}
            options={standardDrodownData?.standards || []}
            error={errors?.standard}
            value={formData.standard}
            handleChangeSelect={(value) => handleSelectValue("standard", value)}
          />
          <CustomTextField
            label="Mobile No"
            fieldName="mobileNo"
            placeholder="Mobile Number"
            value={formData.mobileNo}
            onChangeInput={(event) => handleChangeInput(event)}
            error={errors?.mobileNo}
            type="number"
          />
          <CustomTextarea
            label="Address"
            value={formData.address}
            handleChange={(event) => handleChangeInput(event)}
            placeholder={"Please enter address"}
            fieldName={"address"}
            error={errors?.address}
          />
          <div className="flex justify-end space-x-2">
            <Button
              disabled={isFormLoading}
              variant="outline"
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmitForm} disabled={isFormLoading}>
              {isFormLoading ? <CircularProgress /> : "Save"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
});

export default AddStudentModal;
