"use client";
import React, { useState } from "react";
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

interface Props {
  closeModal: () => void;
  isModalOpen: boolean;
}

interface StudentForm {
  name: string;
  roleNo: number;
  standard: string;
  parents_mobile_no: string;
  address: string;
}

const AddStudentModal = React.memo(function AddStudentModal(props: Props) {
  const { closeModal, isModalOpen } = props;
  const { data: standardDrodownData } = useGetStandardDropdownQuery("");
  const [formData, setFormData] = useState<StudentForm>({
    name: "",
    roleNo: 0,
    standard: "",
    parents_mobile_no: "",
    address: "",
  });
  const [errors, setErrors] = useState<any>({});

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
    closeModal();
    setErrors({});
  };

  const handleSubmitForm = async () => {
    try {
      await studentSchema.validate(formData, { abortEarly: false });
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
          />
          <CustomSelect
            label="Standard"
            placeholder={"Select Standard"}
            options={standardDrodownData?.standards || []}
            error={errors?.standard}
            handleChangeSelect={(value) => handleSelectValue("name", value)}
          />
          <CustomTextField
            label="Mobile No"
            fieldName="parents_mobile_no"
            placeholder="Mobile Number"
            value={formData.parents_mobile_no}
            onChangeInput={(event) => handleChangeInput(event)}
            error={errors?.parents_mobile_no}
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
            <Button variant="outline" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button onClick={handleSubmitForm}>Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
});

export default AddStudentModal;
