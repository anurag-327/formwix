import React from "react";
import { Controller, FieldValues } from "react-hook-form";
import { TypeTextFieldConfig } from "../types";
import { defaultTheme } from "../theme";
import "../../styles.css";
import clsx from "clsx";
interface FieldProps {
  field: TypeTextFieldConfig;
  control: any;
  errors: FieldValues;
  theme?: Partial<typeof defaultTheme>;
}
export default function TextField({
  field,
  control,
  errors,
  theme = defaultTheme,
}: FieldProps) {
  return (
    <Controller
      name={field.name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <input
          type={field.type}
          disabled={field?.disabled}
          onChange={onChange}
          value={value || ""}
          id={field.name}
          placeholder={field.placeholder ?? "Your Answer"}
          className={clsx(
            theme?.text,
            field.theme?.text,
            errors[field.name] && "border-red-500",
          )}
        />
      )}
    />
  );
}
