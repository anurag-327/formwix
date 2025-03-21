import React from "react";
import { Controller, FieldValues } from "react-hook-form";
import { TypeNumberFieldConfig } from "../types";
import { defaultTheme } from "../theme";
import "../../styles.css";
import clsx from "clsx";
interface FieldProps {
  field: TypeNumberFieldConfig;
  control: any;
  errors: FieldValues;
  theme?: Partial<typeof defaultTheme>;
}
export default function NumberField({
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
          id={field.name}
          disabled={field?.disabled}
          type="number"
          onChange={(e) => onChange(e.target.valueAsNumber)}
          value={value}
          placeholder={field.placeholder ?? "Your Answer"}
          className={clsx(
            theme.number,
            field.theme?.number,
            errors[field.name] && "border-red-500"
          )}
        />
      )}
    />
  );
}
