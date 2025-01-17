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
import { useGetTeacherDropdownQuery } from "@/redux/query/teacher";

interface Props {
  closeModal: () => void;
  isModalOpen: boolean;
  isEditStudent: Student | null;
  isViewStudent: boolean;
}

interface StudentForm {
  name: string;
  roleNo: number;
  standard: string;
  address: string;
  fatherName: string;
  fatherOccupation: string;
  fatherMobileNo: string;
  fatherEmail: string;
  motherName: string;
  motherOccupation: string;
  motherMobileNo: string;
  classTeacher: string;
}

const AddStudentModal = React.memo(function AddStudentModal(props: Props) {
  const { closeModal, isModalOpen, isEditStudent, isViewStudent } = props;
  const { data: standardDrodownData } = useGetStandardDropdownQuery("");
  const { data: teacherDrodownData } = useGetTeacherDropdownQuery("");
  const [postStudent, { isLoading: isAddStudentLoading }] =
    usePostStudentMutation();
  const [putStudent, { isLoading: isEditStudentLoading }] =
    useEditStudentMutation();
  const [formData, setFormData] = useState<StudentForm>({
    name: "",
    roleNo: 0,
    standard: "",
    address: "",
    fatherName: "",
    fatherOccupation: "",
    fatherMobileNo: "",
    fatherEmail: "",
    motherName: "",
    motherOccupation: "",
    motherMobileNo: "",
    classTeacher: "",
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
        address: isEditStudent.address || "",
        fatherName: isEditStudent.fatherName || "",
        fatherOccupation: isEditStudent.fatherOccupation || "",
        fatherMobileNo: isEditStudent.fatherMobileNo || "",
        fatherEmail: isEditStudent.fatherEmail || "",
        motherName: isEditStudent.motherName || "",
        motherOccupation: isEditStudent.motherOccupation || "",
        motherMobileNo: isEditStudent.motherMobileNo || "",
        classTeacher: isEditStudent.classTeacher._id || "",
      });
    } else {
      setFormData({
        name: "",
        roleNo: 0,
        standard: "",
        address: "",
        fatherName: "",
        fatherOccupation: "",
        fatherMobileNo: "",
        fatherEmail: "",
        motherName: "",
        motherOccupation: "",
        motherMobileNo: "",
        classTeacher: "",
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
            address: "",
            fatherName: "",
            fatherOccupation: "",
            fatherMobileNo: "",
            fatherEmail: "",
            motherName: "",
            motherOccupation: "",
            motherMobileNo: "",
            classTeacher: "",
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
            address: "",
            fatherName: "",
            fatherOccupation: "",
            fatherMobileNo: "",
            fatherEmail: "",
            motherName: "",
            motherOccupation: "",
            motherMobileNo: "",
            classTeacher: "",
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
      <DialogContent className="md:max-w-lg lg:max-w-4xl student-dialog">
        <DialogHeader>
          <DialogTitle>
            {isViewStudent
              ? "View Student"
              : isEditStudent
              ? "Edit Student"
              : "Add Student"}
          </DialogTitle>
        </DialogHeader>
        <div>
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-3">
            <CustomTextField
              label="Name*"
              fieldName="name"
              placeholder="Student Full Name"
              value={formData.name}
              onChangeInput={(event) => handleChangeInput(event)}
              error={errors?.name}
              disabled={isViewStudent}
            />
            <CustomTextField
              label="Role No*"
              fieldName="roleNo"
              placeholder="Role Number"
              type="number"
              value={formData.roleNo}
              onChangeInput={(event) => handleChangeInput(event)}
              error={errors?.roleNo}
              disabled={Boolean(isEditStudent) || isViewStudent}
            />
            <CustomSelect
              label="Standard*"
              placeholder={"Select Standard"}
              options={standardDrodownData?.standards || []}
              error={errors?.standard}
              value={formData.standard}
              handleChangeSelect={(value) =>
                handleSelectValue("standard", value)
              }
              disabled={isViewStudent}
            />
            <CustomTextarea
              label="Address*"
              value={formData.address}
              handleChange={(event) => handleChangeInput(event)}
              placeholder={"Please enter address"}
              fieldName={"address"}
              error={errors?.address}
              disabled={isViewStudent}
            />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold my-2">Parent's Details</h3>
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-3">
            <CustomTextField
              label="Father Name*"
              fieldName="fatherName"
              placeholder="Father Full Name"
              value={formData.fatherName}
              onChangeInput={(event) => handleChangeInput(event)}
              error={errors?.fatherName}
              disabled={isViewStudent}
            />
            <CustomTextField
              label="Father Occupation"
              fieldName="fatherOccupation"
              placeholder="Father Occupation"
              value={formData.fatherOccupation}
              onChangeInput={(event) => handleChangeInput(event)}
              error={errors?.fatherOccupation}
              disabled={isViewStudent}
            />
            <CustomTextField
              label="Father Mobile No*"
              fieldName="fatherMobileNo"
              placeholder="Father Mobile No"
              value={formData.fatherMobileNo}
              onChangeInput={(event) => handleChangeInput(event)}
              error={errors?.fatherMobileNo}
              disabled={isViewStudent}
            />
            <CustomTextField
              label="Father Email"
              fieldName="fatherEmail"
              placeholder="Father Email"
              value={formData.fatherEmail}
              onChangeInput={(event) => handleChangeInput(event)}
              error={errors?.fatherEmail}
              disabled={isViewStudent}
            />
            <CustomTextField
              label="Mother Name*"
              fieldName="motherName"
              placeholder="Mother Full Name"
              value={formData.motherName}
              onChangeInput={(event) => handleChangeInput(event)}
              error={errors?.motherName}
              disabled={isViewStudent}
            />
            <CustomTextField
              label="Mother Occupation"
              fieldName="motherOccupation"
              placeholder="Mother Occupation"
              value={formData.motherOccupation}
              onChangeInput={(event) => handleChangeInput(event)}
              error={errors?.motherOccupation}
              disabled={isViewStudent}
            />
            <CustomTextField
              label="Mother Mobile No"
              fieldName="motherMobileNo"
              placeholder="Mother Mobile No"
              value={formData.motherMobileNo}
              onChangeInput={(event) => handleChangeInput(event)}
              error={errors?.motherMobileNo}
              disabled={isViewStudent}
            />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold my-2">Class Teacher Details</h3>
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-3">
            <CustomSelect
              label="Class Teacher*"
              placeholder={"Select Teacher"}
              options={teacherDrodownData?.teachers || []}
              error={errors?.classTeacher}
              value={formData.classTeacher}
              handleChangeSelect={(value) =>
                handleSelectValue("classTeacher", value)
              }
              disabled={isViewStudent}
            />
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button
            disabled={isFormLoading}
            variant="outline"
            onClick={handleCloseModal}
          >
            Cancel
          </Button>
          {!isViewStudent && (
            <Button onClick={handleSubmitForm} disabled={isFormLoading}>
              {isFormLoading ? <CircularProgress /> : "Save"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
});

export default AddStudentModal;
