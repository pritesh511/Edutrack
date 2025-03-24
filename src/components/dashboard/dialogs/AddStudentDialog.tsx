"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetStandardDropdownQuery } from "@/redux/query/standard";
import { transformYupErrorsIntoObject } from "@/helpers/helper";
import toast from "react-hot-toast";
import {
  useEditStudentMutation,
  usePostStudentMutation,
} from "@/redux/query/student";
import { Student } from "@/utils/types";
import { useGetTeacherDropdownQuery } from "@/redux/query/teacher";
import { useSelector } from "react-redux";
import { getUserData } from "@/redux/slices/userSlice";
import CommonForm from "@/components/common/form/CommonForm";
import {
  studentFormconfig,
  studentIntialvalue,
} from "@/utils/mocks/student.mock";
import { FormikValues } from "formik";

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

  const handleSubmitForm = async (values: FormikValues) => {
    try {
      if (isEditStudent) {
        const { data, error } = await putStudent({
          form: values,
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
        const { data, error } = await postStudent(values);
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
        <CommonForm
          formConfig={studentFormconfig(
            standardDrodownData?.standards || [],
            teacherDrodownData?.teachers || []
          )}
          onSubmit={(values) => handleSubmitForm(values)}
          isSubmitting={isFormLoading}
          initialValues={studentIntialvalue}
        />
      </DialogContent>
    </Dialog>
  );
});

export default AddStudentModal;
