"use client";
import { useFormik, FieldArray, FormikValues } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import CircularProgress from "../CircularProgress";

export type FormFieldConfig = {
  id: string;
  name: string;
  label?: string;
  validate?: boolean;
  type: "string" | "number" | "textarea" | "select" | "checkbox" | "array";
  placeholder?: string;
  errorMessage?: string;
  options?: { value: string; label: string }[];
  subfields?: FormFieldConfig[];
  disabled?: boolean;
};

interface DynamicFormProps {
  formConfig: FormFieldConfig[];
  onSubmit: (values: any) => void;
  initialValues: FormikValues;
  isSubmitting: boolean;
}

const DynamicForm = ({
  formConfig,
  onSubmit,
  initialValues,
  isSubmitting,
}: DynamicFormProps) => {
  // Generate initial values
  // const initialValues = formConfig.reduce((acc: Record<string, any>, field) => {
  //   if (field.type === "array") {
  //     acc[field.name] = [];
  //   } else if (field.type === "checkbox") {
  //     acc[field.name] = false;
  //   } else {
  //     acc[field.name] = "";
  //   }
  //   return acc;
  // }, {});

  // Generate validation schema
  const validationSchema = formConfig.reduce((acc: any, field) => {
    if (field.validate) {
      let schema;
      switch (field.type) {
        case "number":
          schema = Yup.number().typeError("Must be a number");
          break;
        case "checkbox":
          schema = Yup.boolean();
          break;
        case "array":
          schema = Yup.array().of(
            Yup.object().shape(
              field.subfields?.reduce((nestedAcc: any, nestedField) => {
                if (nestedField.validate) {
                  nestedAcc[nestedField.name] = Yup.string().required(
                    nestedField.errorMessage
                  );
                }
                return nestedAcc;
              }, {}) || {}
            )
          );
          break;
        default:
          schema = Yup.string();
      }
      acc[field.name] = schema.required(field.errorMessage || "Required");
    }
    return acc;
  }, {});

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object().shape(validationSchema),
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  const renderField = (field: FormFieldConfig) => {
    const isError = formik.touched[field.name] && formik.errors[field.name];
    console.log("isError::", isError);
    switch (field.type) {
      case "string":
        return (
          <div key={field.id} className="space-y-2">
            {field.label && (
              <Label
                className={`${isError ? "text-destructive" : ""}`}
                htmlFor={field.id}
              >
                {field.label}
              </Label>
            )}
            <Input
              id={field.id}
              name={field.name}
              placeholder={field.placeholder}
              value={formik.values[field.name]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`${
                isError
                  ? "outline outline-1 outline-destructive outline-offset-2"
                  : ""
              }`}
            />
          </div>
        );
      case "number":
        return (
          <div key={field.id} className="space-y-2">
            {field.label && (
              <Label
                className={`${isError ? "text-destructive" : ""}`}
                htmlFor={field.id}
              >
                {field.label}
              </Label>
            )}
            <Input
              type="number"
              id={field.id}
              name={field.name}
              placeholder={field.placeholder}
              value={formik.values[field.name]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`${
                isError
                  ? "outline outline-1 outline-destructive outline-offset-2"
                  : ""
              }`}
            />
          </div>
        );
      case "textarea":
        return (
          <div key={field.id} className="space-y-2">
            {field.label && (
              <Label
                className={`${isError ? "text-destructive" : ""}`}
                htmlFor={field.id}
              >
                {field.label}
              </Label>
            )}
            <Textarea
              id={field.id}
              name={field.name}
              placeholder={field.placeholder}
              value={formik.values[field.name]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`${
                isError
                  ? "outline outline-1 outline-destructive outline-offset-2"
                  : ""
              }`}
            />
          </div>
        );
      case "select":
        return (
          <div key={field.id} className="space-y-2">
            {field.label && (
              <Label
                className={`${isError ? "text-destructive" : ""}`}
                htmlFor={field.id}
              >
                {field.label}
              </Label>
            )}
            <Select
              name={field.name}
              value={formik.values[field.name]}
              onValueChange={(value) => formik.setFieldValue(field.name, value)}
            >
              <SelectTrigger
                className={`${
                  isError
                    ? "outline outline-1 outline-destructive outline-offset-2"
                    : ""
                }`}
              >
                <SelectValue placeholder={field.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      case "checkbox":
        return (
          <div key={field.id} className="flex items-center space-x-2">
            <Checkbox
              id={field.id}
              name={field.name}
              checked={formik.values[field.name]}
              onCheckedChange={(checked) =>
                formik.setFieldValue(field.name, checked)
              }
            />
            {field.label && <Label htmlFor={field.id}>{field.label}</Label>}
          </div>
        );
      case "array":
        // return (
        //   <FieldArray
        //     key={field.id}
        //     name={field.name}
        //     render={(arrayHelpers) => (
        //       <div className="space-y-4">
        //         {formik.values[field.name]?.map((_: any, index: number) => (
        //           <div key={index} className="space-y-4 border p-4 rounded-lg">
        //             {field.subfields?.map((nestedField) => {
        //               const nestedName = `${field.name}.${index}.${nestedField.name}`;
        //               return renderField({
        //                 ...nestedField,
        //                 name: nestedName,
        //                 id: `${nestedField.id}-${index}`,
        //               });
        //             })}
        //             <Button
        //               type="button"
        //               variant="destructive"
        //               onClick={() => arrayHelpers.remove(index)}
        //             >
        //               Remove
        //             </Button>
        //           </div>
        //         ))}
        //         <Button type="button" onClick={() => arrayHelpers.push({})}>
        //           Add {field.label}
        //         </Button>
        //       </div>
        //     )}
        //   />
        // );
        return (
          <div>{field.subfields?.map((subfield) => renderField(subfield))}</div>
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      {formConfig.map((field) => (
        <div key={field.id}>
          {renderField(field)}
          {formik.touched[field.name] && formik.errors[field.name] && (
            <div className="text-sm text-red-500 mt-2">
              {String(formik.errors[field.name])}
            </div>
          )}
        </div>
      ))}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? <CircularProgress /> : "Submit"}
      </Button>
    </form>
  );
};

export default DynamicForm;
