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
    disabled = false,
  } = props;
  return (
    <div>
      {label && (
        <Label
          htmlFor={fieldName}
          className={`${error ? "text-destructive" : ""}`}
        >
          {label}
        </Label>
      )}
      <Input
        placeholder={placeholder}
        name={fieldName}
        value={value}
        onChange={onChangeInput}
        className={`${error ? "border-destructive" : ""}`}
        type={type ? type : "text"}
        onFocus={handleFocusInput}
        disabled={disabled}
      />
      {error && <span className="text-sm text-destructive">{error}</span>}
    </div>
  );
};

export default CustomTextField;
