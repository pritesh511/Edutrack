import React from "react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

interface Props {
  label?: string;
  value: string;
  handleChange: (
    event: React.ChangeEvent<{ name: string; value: string }>
  ) => void;
  placeholder: string;
  error?: string;
  fieldName: string;
  disabled?: boolean;
  onClick?: () => void;
}

const CustomTextarea = (props: Props) => {
  const {
    label,
    value,
    handleChange,
    placeholder,
    error,
    fieldName,
    onClick,
    disabled = false,
  } = props;
  return (
    <div>
      {label && (
        <Label
          htmlFor={fieldName}
          className={`${error ? "text-destructive" : ""} ${
            disabled ? "text-gray-500" : ""
          }`}
        >
          {label}
        </Label>
      )}
      <Textarea
        id={fieldName}
        name={fieldName}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        onClick={onClick}
        className={`${error ? "border-destructive" : ""} ${
          disabled ? "bg-border" : ""
        }`}
      />
      {error && <span className="text-sm text-destructive">{error}</span>}
    </div>
  );
};

export default CustomTextarea;
