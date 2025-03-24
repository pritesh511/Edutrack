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
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { SlCalender } from "react-icons/sl";

export type FormSubFieldConfig = {
  id: string;
  name: string;
  label?: string;
  required: boolean;
  type:
    | "string"
    | "number"
    | "textarea"
    | "select"
    | "checkbox"
    | "datepicker"
    | "array";
  placeholder?: string;
  errorMessage?: string;
  options?: { value: string; label: string }[];
  subfields: FormSubFieldConfig[];
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
};

export type FormFieldConfig = {
  title: string;
  groupSize: 1 | 2;
  section: boolean;
  subfields: FormSubFieldConfig[];
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
    field.subfields.forEach((subfield) => {
      if (subfield.required) {
        let schema;
        switch (subfield.type) {
          case "number":
            schema = Yup.number()
              .min(1, subfield.errorMessage)
              .typeError("Must be a number");
            break;
          case "checkbox":
            schema = Yup.boolean();
            break;
          case "datepicker":
            schema = Yup.string()
              .test("is-valid-date", "Invalid date", function (value) {
                if (!value) return true;
                const date = new Date(value);
                return date.toISOString().split("T")[0] === value;
              })
              .required(subfield.errorMessage || "Required");
            break;
          case "array":
            schema = Yup.array().of(
              Yup.object().shape(
                subfield.subfields?.reduce((nestedAcc: any, nestedField) => {
                  if (nestedField.required) {
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
        acc[subfield.name] = schema.required(
          subfield.errorMessage || "Required"
        );
      }
    });
    return acc;
  }, {});

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object().shape(validationSchema),
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  const renderField = (field: FormSubFieldConfig) => {
    const isError = formik.touched[field.name] && formik.errors[field.name];
    const isDisabled = field.disabled;
    switch (field.type) {
      case "string":
        return (
          <div key={field.id}>
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
          <div key={field.id}>
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
          <div key={field.id}>
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
      case "datepicker":
        return (
          <div key={field.id} className="flex flex-col">
            {field.label && (
              <Label
                className={isError ? "text-destructive" : ""}
                htmlFor={field.id}
              >
                {field.label}
              </Label>
            )}
            <DatePicker
              showIcon
              className={`
                  border rounded-md text-sm w-full h-10 outline-none focus:border-primary ${
                    isError ? "border-destructive" : "border-input"
                  } ${isDisabled ? "bg-border" : ""}
                `}
              selected={
                formik.values[field.name]
                  ? new Date(formik.values[field.name])
                  : null
              }
              dateFormat="yyyy-MM-dd"
              placeholderText={field.placeholder} // Fixed typo from 'placeholer' to 'placeholder'
              icon={<SlCalender />}
              disabled={isDisabled}
              showYearDropdown={true}
              showMonthDropdown={true}
              dropdownMode="select"
              minDate={field.minDate}
              maxDate={field.maxDate}
              onChange={(date) => {
                if (date) {
                  const dateStr = date.toISOString().split("T")[0];
                  formik.setFieldValue(field.name, dateStr);
                } else {
                  formik.setFieldValue(field.name, "");
                }
              }}
            />
          </div>
        );
      case "select":
        return (
          <div key={field.id}>
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

  const renderSubfields = (fields: FormSubFieldConfig[]) => {
    return (
      <>
        {fields.map((field) => {
          return (
            <div className="flex flex-col" key={field.id}>
              <div>{renderField(field)}</div>
              {formik.touched[field.name] && formik.errors[field.name] && (
                <div className="text-sm text-red-500 mt-1">
                  {String(formik.errors[field.name])}
                </div>
              )}
            </div>
          );
        })}
      </>
    );
  };

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      {formConfig.map((field, index) => {
        return (
          <div
            className={`${
              field.section ? "p-4 border border-input rounded-xl" : ""
            }`}
            key={`field-${index}`}
          >
            {field.title && (
              <h4
                className={`text-lg font-medium ${
                  field.section ? "mt-1" : "mt-5"
                } mb-2`}
              >
                {field.title}
              </h4>
            )}
            <div
              className={`${
                field.groupSize == 1 ? "group-size-1" : "group-size-2"
              }`}
            >
              {renderSubfields(field.subfields)}
            </div>
          </div>
        );
      })}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? <CircularProgress /> : "Submit"}
      </Button>
    </form>
  );
};

export default DynamicForm;
