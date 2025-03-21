import React from "react";
import { Controller, FieldValues } from "react-hook-form";
import clsx from "clsx";
import { TypeDateFieldConfig } from "../types";
import { defaultTheme } from "../theme";
import "../../styles.css";

interface FieldProps {
  field: TypeDateFieldConfig;
  control: any;
  errors: FieldValues;
  theme?: Partial<typeof defaultTheme>;
}

export default function DateField({
  field,
  control,
  errors,
  theme = defaultTheme,
}: FieldProps) {
  return (
    <Controller
      name={field.name}
      control={control}
      render={({ field: { onChange, value } }) => {
        let formattedValue = "";
        if (value) {
          const parsedDate = new Date(value);
          if (!isNaN(parsedDate.getTime())) {
            formattedValue = parsedDate.toISOString().slice(0, 10);
          } else {
            formattedValue = value; // Keep original if parsing fails
          }
        }

        const minDate =
          typeof field?.validation?.minDate?.value === "string" ||
          typeof field?.validation?.minDate?.value === "number"
            ? field.validation.minDate.value
            : undefined;

        const maxDate =
          typeof field?.validation?.maxDate?.value === "string" ||
          typeof field?.validation?.maxDate?.value === "number"
            ? field.validation.maxDate.value
            : undefined;

        return (
          <input
            id={field.name}
            disabled={field?.disabled}
            className={clsx(
              theme.date,
              field.theme?.date,
              errors[field.name] && "border-red-500"
            )}
            type={field.type}
            onChange={(e) => onChange(e.target.value)}
            value={formattedValue}
            min={minDate}
            max={maxDate}
          />
        );
      }}
    />
  );
}
