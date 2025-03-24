import { FormFieldConfig } from "@/components/common/form/CommonForm";

export const standardIntialValues = {
  standard: "",
  description: "",
};

export const standardFormConfig = () => {
  return [
    {
      title: "",
      groupSize: 1,
      section: false,
      subfields: [
        {
          id: "standard",
          name: "standard",
          label: "Standard Name",
          type: "string",
          required: true,
          placeholder: "Enter standard name",
          errorMessage: "Standard name is required",
        },
        {
          id: "description",
          name: "description",
          label: "Description",
          type: "textarea",
          required: true,
          placeholder: "Enter description",
          errorMessage: "Description is required",
        },
      ]
    }
  ] as FormFieldConfig[];
};
