import { FormFieldConfig } from "@/components/common/form/CommonForm";

export const standardIntialValues = {
  standard: "",
  description: "",
};

export const standardFormConfig = () => {
  return [
    {
      id: "standard",
      name: "standard",
      label: "Standard Name",
      type: "string",
      validate: true,
      placeholder: "Enter standard name",
      errorMessage: "Standard name is required",
    },
    {
      id: "description",
      name: "description",
      label: "Description",
      type: "textarea",
      validate: true,
      placeholder: "Enter description",
      errorMessage: "Description is required",
    },
  ] as FormFieldConfig[];
};
