import React from "react";
import { Controller, FieldValues } from "react-hook-form";
import { TypeURLFieldConfig } from "../types";
import { defaultTheme } from "../theme";
import "../../styles.css";
import clsx from "clsx";
interface FieldProps {
  field: TypeURLFieldConfig;
  control: any;
  errors: FieldValues;
  theme?: Partial<typeof defaultTheme>;
}
export default function URLField({
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
          type="url"
          onChange={onChange}
          disabled={field?.disabled}
          value={value || ""}
          id={field.name}
          placeholder={field.placeholder ?? "Your Answer"}
          className={clsx(
            theme?.url,
            field.theme?.url,
            errors[field.name] && "border-red-500",
          )}
        />
      )}
    />
  );
}
