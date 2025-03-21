import React from "react";
import { Controller, FieldValues } from "react-hook-form";
import { TypeEmailFieldConfig } from "../types";
import { defaultTheme } from "../theme";
import "../../styles.css";
import clsx from "clsx";
interface FieldProps {
  field: TypeEmailFieldConfig;
  control: any;
  errors: FieldValues;
  theme?: Partial<typeof defaultTheme>;
}
export default function EmailField({
  field,
  control,
  errors,
  theme,
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
          value={value}
          id={field.name}
          placeholder={field.placeholder ?? "Your Answer"}
          className={clsx(
            theme?.email,
            field.theme?.email,
            errors[field.name] && "border-red-500"
          )}
        />
      )}
    />
  );
}
