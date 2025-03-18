import React from "react";
import { Controller, FieldValues } from "react-hook-form";
import { TypeCheckboxFieldConfig } from "../types";
import { defaultTheme } from "../theme";
import "../../styles.css";
import clsx from "clsx";
interface FieldProps {
  field: TypeCheckboxFieldConfig;
  control: any;
  errors: FieldValues;
  theme?: Partial<typeof defaultTheme>;
}

export default function CheckBoxField({
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
          className={clsx(theme.checkBoxWrapper, field.theme?.checkBoxWrapper)}
        >
          <input
            type="checkbox"
            id={field.name}
            checked={value || false}
            onChange={(e) => onChange(e.target.checked)}
            className={clsx(
              theme.checkbox,
              field.theme?.checkbox,
              errors[field.name] && "border-red-500"
            )}
          />
          <label
            htmlFor={field.name}
            className={clsx(theme.checkBoxLabel, field.theme?.checkBoxLabel)}
          >
            {field.label}
          </label>
        </div>
      )}
    />
  );
}
