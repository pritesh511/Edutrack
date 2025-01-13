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
}

const CustomSelect = (props: Props) => {
  const { placeholder, options, label } = props;
  return (
    <div>
      {label && <Label>{label}</Label>}
      <Select>
        <SelectTrigger className="w-full h-12">
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
    </div>
  );
};

export default CustomSelect;
