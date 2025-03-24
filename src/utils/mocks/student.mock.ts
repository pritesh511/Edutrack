import { FormFieldConfig } from "@/components/common/form/CommonForm";
import { DropdownOption } from "../types";

export const studentIntialvalue = {
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
};

const today = new Date();

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

export const studentFormconfig = (
  standardOptions: Array<DropdownOption>,
  classTeacherOptions: Array<DropdownOption>
) => {
  return [
    {
      title: "Student Details",
      groupSize: 2,
      section: true,
      subfields: [
        {
          id: "name",
          name: "name",
          label: "Student Name",
          type: "string",
          required: true,
          placeholder: "Enter student name",
          errorMessage: "Student name is required",
        },
        {
          id: "roleNo",
          name: "roleNo",
          label: "Role No",
          type: "number",
          required: true,
          placeholder: "Enter role number",
          errorMessage: "Role number is required",
        },
        {
          id: "standard",
          name: "standard",
          label: "Standard",
          type: "select",
          options: standardOptions,
          required: true,
          placeholder: "Please select standard",
          errorMessage: "Standard is required",
        },
        {
          id: "dob",
          name: "dob",
          label: "Dob",
          type: "datepicker",
          required: true,
          placeholder: "Please select standard",
          errorMessage: "Standard is required",
          minDate: minDate,
          maxDate: maxDate,
        },
        {
          id: "address",
          name: "address",
          label: "Address",
          type: "textarea",
          required: true,
          placeholder: "Please enter address",
          errorMessage: "Address is required",
        },
      ],
    },
    {
      title: "Parent's Details",
      groupSize: 2,
      section: true,
      subfields: [
        {
          id: "fatherName",
          name: "fatherName",
          label: "Father Name",
          type: "string",
          required: true,
          placeholder: "Enter father name",
          errorMessage: "Father name is required",
        },
        {
          id: "fatherOccupation",
          name: "fatherOccupation",
          label: "Father Occupation",
          type: "string",
          placeholder: "Enter father occupation",
        },
        {
          id: "fatherMobileNo",
          name: "fatherMobileNo",
          label: "Father Mobile No",
          required: true,
          type: "number",
          placeholder: "Enter father mobile no",
          errorMessage: "Father mobile no is required",
        },
        {
          id: "fatherEmail",
          name: "fatherEmail",
          label: "Father Email",
          type: "string",
          placeholder: "Enter father email",
        },
        {
          id: "motherName",
          name: "motherName",
          label: "Mother Name",
          type: "string",
          required: true,
          placeholder: "Enter mother name",
          errorMessage: "Mother name is required",
        },
        {
          id: "motherOccupation",
          name: "motherOccupation",
          label: "Mother Occupation",
          type: "string",
          placeholder: "Enter mother occupation",
        },
        {
          id: "motherMobileNo",
          name: "motherMobileNo",
          label: "Mother Mobile No",
          type: "string",
          placeholder: "Enter Mother Mobile No",
        },
      ],
    },
    {
      title: "Class's Teacher Details",
      groupSize: 2,
      section: true,
      subfields: [
        {
          id: "classTeacher",
          name: "classTeacher",
          label: "Class Teacher",
          type: "select",
          options: classTeacherOptions,
          required: true,
          placeholder: "Please select Class Teacher",
          errorMessage: "Class Teacher is required",
        },
      ],
    },
  ] as FormFieldConfig[];
};
