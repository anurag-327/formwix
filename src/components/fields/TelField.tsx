import React from "react";
import { Controller, FieldValues } from "react-hook-form";
import { TypeTelFieldConfig } from "../types";
import { defaultTheme } from "../theme";
import clsx from "clsx";
import "../../styles.css";

interface FieldProps {
  field: TypeTelFieldConfig;
  control: any;
  errors: FieldValues;
  theme?: Partial<typeof defaultTheme>;
}

export default function TelField({
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
          type="tel"
          id={field.name}
          onChange={onChange}
          value={value || ""}
          placeholder={field.placeholder ?? "Your Answer"}
          className={clsx(
            theme?.tel,
            field.theme?.tel,
            errors[field.name] && "border-red-500"
          )}
        />
      )}
    />
  );
}
