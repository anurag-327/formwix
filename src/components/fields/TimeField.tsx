import React from "react";
import { Controller, FieldValues } from "react-hook-form";
import { defaultTheme } from "../theme";
import { TypeTimeFieldConfig } from "../types";
import "../../styles.css";
import clsx from "clsx";
interface FieldProps {
  field: TypeTimeFieldConfig;
  control: any;
  errors: FieldValues;
  theme?: Partial<typeof defaultTheme>;
}

export default function TimeField({
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
          const parsedTime = new Date(`1970-01-01T${value}`);
          if (!isNaN(parsedTime.getTime())) {
            formattedValue = parsedTime.toISOString().slice(11, 16); // Extract HH:mm
          } else {
            formattedValue = value; // Keep original if parsing fails
          }
        }

        return (
          <input
            id={field.name}
            className={clsx(
              theme?.time,
              field.theme?.time,
              errors[field.name] && "border-red-500"
            )}
            type="time"
            onChange={(e) => onChange(e.target.value)}
            value={formattedValue}
          />
        );
      }}
    />
  );
}
