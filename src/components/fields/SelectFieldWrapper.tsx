import React from "react";
import { Controller, FieldValues } from "react-hook-form";
import { TypeSelectFieldConfig } from "../types";
import { defaultTheme } from "../theme";
import clsx from "clsx";
import "../../styles.css";

interface FieldProps {
  field: TypeSelectFieldConfig;
  control: any;
  errors: FieldValues;
  theme?: Partial<typeof defaultTheme>;
}

export default function SelectField({
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
        <div
          className={clsx(
            theme.selectOptionsWrapper,
            field.theme?.selectOptionsWrapper
          )}
        >
          <select
            onChange={onChange}
            value={value || ""}
            className={clsx(theme.select, field.theme?.select)}
          >
            {field.options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className={clsx(theme.optionsLabel, field.theme?.optionsLabel)}
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}
    />
  );
}
