import { FormFieldConfig } from "@/components/common/form/CommonForm";

export const blogIntialValues = {
  title: "",
  description: "",
};

export const blogFormConfig = () => {
  return [
    {
      title: "",
      groupSize: 1,
      section: false,
      subfields: [
        {
          id: "title",
          name: "title",
          label: "Title",
          type: "string",
          required: true,
          placeholder: "Enter Title",
          errorMessage: "Title is required",
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
