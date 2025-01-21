import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Label } from "../ui/label";
import { SlCalender } from "react-icons/sl";

interface Props {
  label?: string;
  error?: string;
  fieldName: string;
  disabled?: boolean;
  onChangeDate: (date: Date | null) => void;
  value: Date | null;
  placeholder: string;
  minDate?: Date;
  maxDate?: Date;
}

const CustomDatepicker = (props: Props) => {
  const {
    label,
    fieldName,
    error,
    disabled = false,
    onChangeDate,
    value,
    placeholder,
    minDate,
    maxDate,
  } = props;

  return (
    <div className="flex flex-col">
      {label && (
        <Label
          htmlFor={fieldName}
          className={`${error ? "text-destructive" : ""} ${
            disabled ? "text-gray-500" : ""
          } leading-5 mb-1`}
        >
          {label}
        </Label>
      )}
      <DatePicker
        showIcon
        className={`border rounded-md text-sm w-full h-12 outline-none focus:border-primary ${
          error ? "border-destructive" : "border-input"
        } ${disabled ? "bg-border" : ""}`}
        selected={value}
        onChange={(date) => onChangeDate(date)}
        icon={<SlCalender />}
        placeholderText={placeholder}
        disabled={disabled}
        showYearDropdown
        showMonthDropdown
        dropdownMode="select"
        minDate={minDate}
        maxDate={maxDate}
      />
      {error && <span className="text-sm text-destructive">{error}</span>}
    </div>
  );
};

export default CustomDatepicker;
