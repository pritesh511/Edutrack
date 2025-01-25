import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

interface Props {
  label?: string;
  placeholder: string;
  value: string | number;
  onChangeInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  fieldName: string;
  type?: string;
  handleFocusInput?: () => void;
  disabled?: boolean;
  onClickInput?: () => void;
  className?: string;
}

const CustomTextField = (props: Props) => {
  const {
    label,
    placeholder,
    value,
    onChangeInput,
    error,
    fieldName,
    type,
    handleFocusInput,
    onClickInput,
    disabled = false,
    className,
  } = props;
  return (
    <div className="w-full">
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
      <Input
        onClick={onClickInput}
        placeholder={placeholder}
        name={fieldName}
        value={value}
        onChange={onChangeInput}
        className={
          `${error ? "border-destructive" : ""} ${
            disabled ? "bg-border" : ""
          } ` + className
        }
        type={type ? type : "text"}
        onFocus={handleFocusInput}
        disabled={disabled}
      />
      {error && <span className="text-sm text-destructive">{error}</span>}
    </div>
  );
};

export default CustomTextField;
