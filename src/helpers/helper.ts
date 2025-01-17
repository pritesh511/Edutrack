import { EDUCAtION_LIST } from "@/utils/constant";
import { DropdownOption } from "@/utils/types";
import crypto from "crypto";
import { ReactNode } from "react";
import { ValidationError } from "yup";

export const randomString = (length = 5) => {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
};

export const renderOnConditionBase = (
  condition: boolean,
  trueValue: ReactNode,
  falseValue: ReactNode
) => {
  return condition ? trueValue : falseValue;
};

export const getMultiselectValue = (values: string[], options: DropdownOption[]) => {
  const filterData = options.filter((option) => values.includes(option.value));
  const data = filterData.map((data) => data.label);
  return data.join(", ");
};

export const transformYupErrorsIntoObject = (
  errors: ValidationError
): Record<string, string> => {
  const validationErrors: Record<string, string> = {};

  errors.inner.forEach((error: any) => {
    if (error.path !== undefined) {
      validationErrors[error.path] = error.errors[0];
    }
  });

  return validationErrors;
};

export const getLabelOfSubject = (value: string) => {
  const education = EDUCAtION_LIST.find((educ) => educ.value === value);
  if(education) {
    return education.label;
  } else {
    return "";
  }
};