import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
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
  handleChangeSelect: (value: string) => void;
}

const CustomSelect = (props: Props) => {
  const { placeholder, options, label, error, handleChangeSelect } = props;
  return (
    <div>
      {label && (
        <Label className={`${error ? "text-destructive" : ""}`}>{label}</Label>
      )}
      <Select onValueChange={handleChangeSelect}>
        <SelectTrigger
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
