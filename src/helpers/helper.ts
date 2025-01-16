import { DropdownOption } from "@/utils/types";
import crypto from "crypto";
import { ReactNode } from "react";

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
