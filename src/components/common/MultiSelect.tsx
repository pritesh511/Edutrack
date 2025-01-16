"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "../ui/label";
import { getMultiselectValue } from "@/helpers/helper";

type Option = {
  label: string;
  value: string;
};

interface MultiSelectProps {
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  label: string;
  placeholder: string;
  customWidth?: number;
  error?: string;
}

export function MultiSelect({
  options,
  value,
  onChange,
  label,
  placeholder,
  customWidth,
  error,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  const handleToggle = (val: string) => {
    if (value.includes(val)) {
      onChange(value.filter((item) => item !== val));
    } else {
      onChange([...value, val]);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Label className={`${error ? "text-destructive" : ""}`}>{label}</Label>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`w-full justify-between h-12 ${
            error ? "border-destructive" : ""
          }`}
          aria-haspopup="true"
          aria-expanded={open}
        >
          {value.length > 0 ? getMultiselectValue(value, options) : placeholder}
          <ChevronDown
            className={`ml-2 h-4 w-4 shrink-0 opacity-50 ${
              error ? "text-destructive" : ""
            }`}
          />
        </Button>
      </PopoverTrigger>
      {error && <span className="text-destructive text-sm">{error}</span>}
      <PopoverContent
        className={`w-[${customWidth}px] p-2`}
        style={{ width: customWidth }}
      >
        <div className="flex flex-col gap-1">
          {options.map((option) => (
            <div
              key={option.value}
              className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-md"
              onClick={() => handleToggle(option.value)}
            >
              <Checkbox
                id={option.value}
                checked={value.includes(option.value)}
                onCheckedChange={() => handleToggle(option.value)}
                className="border-border"
              />
              <label
                htmlFor={option.value}
                className="text-sm font-medium leading-none cursor-pointer"
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
