import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";

interface Option {
  label: string;
  value: string;
}

interface Props {
  placeholder: string;
  options: Array<Option>;
  label?: string;
  error?: string;
  value: string;
  handleChangeSelect: (value: string) => void;
  disabled?: boolean;
}

const CustomSelect = (props: Props) => {
  const {
    placeholder,
    options,
    label,
    error,
    handleChangeSelect,
    value,
    disabled = false,
  } = props;
  return (
    <div>
      {label && (
        <Label
          htmlFor={label}
          className={`${error ? "text-destructive" : ""} ${
            disabled ? "text-gray-500" : ""
          }`}
        >
          {label}
        </Label>
      )}
      <Select value={value} onValueChange={handleChangeSelect}>
        <SelectTrigger
          disabled={disabled}
          className={`w-full h-12 ${error ? "border-destructive" : ""}`}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => {
              return (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
      {error && <span className="text-sm text-destructive">{error}</span>}
    </div>
  );
};

export default CustomSelect;
