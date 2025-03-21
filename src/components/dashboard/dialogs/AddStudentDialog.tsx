"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CustomTextField from "@/components/common/custom/CustomTextField";
import { useGetStandardDropdownQuery } from "@/redux/query/standard";
import CustomSelect from "@/components/common/custom/CustomSelect";
import CustomTextarea from "@/components/common/custom/CustomTextarea";
import { transformYupErrorsIntoObject } from "@/helpers/helper";
import { studentSchema } from "@/utils/schema";
import toast from "react-hot-toast";
import {
  useEditStudentMutation,
  usePostStudentMutation,
} from "@/redux/query/student";
import CircularProgress from "@/components/common/common/CircularProgress";
import { Student } from "@/utils/types";
import { useGetTeacherDropdownQuery } from "@/redux/query/teacher";
import CustomDatepicker from "@/components/common/custom/CustomDatepicker";
import { useSelector } from "react-redux";
import { getUserData } from "@/redux/slices/userSlice";

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
  dob: Date | null;
}

// Get current date
const today = new Date();

// Calculate the minimum and maximum allowed dates
const minDate = new Date(
  today.getFullYear() - 18,
  today.getMonth(),
  today.getDate()
);
const maxDate = new Date(
  today.getFullYear() - 7,
  today.getMonth(),
  today.getDate()
);

const AddStudentModal = React.memo(function AddStudentModal(props: Props) {
  const { closeModal, isModalOpen, isEditStudent, isViewStudent } = props;
  const { currentUser } = useSelector(getUserData);
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
    dob: null,
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
  };

  const handleClickInput = (name: string) => {
    setErrors((prev: any) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleChangeDob = (name: string, value: Date | null) => {
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
        dob: isEditStudent.dob || null,
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
        dob: null,
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
            dob: null,
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
            dob: null,
          });
          handleCloseModal();
        }
      }
    } catch (validationsErrors: any) {
      if (validationsErrors.response?.data?.message) {
        toast.error(validationsErrors.response?.data?.message);
      } else {
        const errors = transformYupErrorsIntoObject(validationsErrors);
        setErrors(errors);
      }
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
              onClickInput={() => handleClickInput("name")}
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
              onClickInput={() => handleClickInput("roleNo")}
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
            <CustomDatepicker
              label="Date of birth"
              fieldName={"dob"}
              onChangeDate={(date) => handleChangeDob("dob", date)}
              value={formData.dob}
              error={errors?.dob}
              disabled={isViewStudent}
              placeholder={"Date of birth"}
              minDate={minDate}
              maxDate={maxDate}
            />
            <CustomTextarea
              label="Address*"
              value={formData.address}
              handleChange={(event) => handleChangeInput(event)}
              placeholder={"Please enter address"}
              fieldName={"address"}
              error={errors?.address}
              onClick={() => handleClickInput("address")}
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
              onClickInput={() => handleClickInput("fatherName")}
              disabled={isViewStudent}
            />
            <CustomTextField
              label="Father Occupation"
              fieldName="fatherOccupation"
              placeholder="Father Occupation"
              value={formData.fatherOccupation}
              onChangeInput={(event) => handleChangeInput(event)}
              error={errors?.fatherOccupation}
              onClickInput={() => handleClickInput("fatherOccupation")}
              disabled={isViewStudent}
            />
            <CustomTextField
              label="Father Mobile No*"
              fieldName="fatherMobileNo"
              placeholder="Father Mobile No"
              value={formData.fatherMobileNo}
              onChangeInput={(event) => handleChangeInput(event)}
              error={errors?.fatherMobileNo}
              onClickInput={() => handleClickInput("fatherMobileNo")}
              disabled={isViewStudent}
            />
            <CustomTextField
              label="Father Email"
              fieldName="fatherEmail"
              placeholder="Father Email"
              value={formData.fatherEmail}
              onChangeInput={(event) => handleChangeInput(event)}
              error={errors?.fatherEmail}
              onClickInput={() => handleClickInput("fatherEmail")}
              disabled={isViewStudent}
            />
            <CustomTextField
              label="Mother Name*"
              fieldName="motherName"
              placeholder="Mother Full Name"
              value={formData.motherName}
              onChangeInput={(event) => handleChangeInput(event)}
              error={errors?.motherName}
              onClickInput={() => handleClickInput("motherName")}
              disabled={isViewStudent}
            />
            <CustomTextField
              label="Mother Occupation"
              fieldName="motherOccupation"
              placeholder="Mother Occupation"
              value={formData.motherOccupation}
              onChangeInput={(event) => handleChangeInput(event)}
              error={errors?.motherOccupation}
              onClickInput={() => handleClickInput("motherOccupation")}
              disabled={isViewStudent}
            />
            <CustomTextField
              label="Mother Mobile No"
              fieldName="motherMobileNo"
              placeholder="Mother Mobile No"
              value={formData.motherMobileNo}
              onChangeInput={(event) => handleChangeInput(event)}
              error={errors?.motherMobileNo}
              onClickInput={() => handleClickInput("motherMobileNo")}
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
              value={
                formData.classTeacher
                  ? formData.classTeacher
                  : teacherDrodownData?.teachers[0]?.value || ""
              }
              handleChangeSelect={(value) =>
                handleSelectValue("classTeacher", value)
              }
              disabled={isViewStudent || currentUser?.role === "teacher"}
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
