import React from "react";
import { Controller, FieldValues } from "react-hook-form";
import { TypeTextAreaFieldConfig } from "../types";
import { defaultTheme } from "../theme";
import "../../styles.css";
import clsx from "clsx";
interface FieldProps {
  field: TypeTextAreaFieldConfig;
  control: any;
  errors: FieldValues;
  theme?: Partial<typeof defaultTheme>;
}
export default function TextAreaField({
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
        <textarea
          onChange={onChange}
          value={value}
          rows={field.rows || 4}
          id={field.name}
          placeholder={field.placeholder ?? "Your Answer"}
          className={clsx(
            theme?.textarea,
            field.theme?.textarea,
            errors[field.name] && "border-red-500"
          )}
        />
      )}
    />
  );
}
