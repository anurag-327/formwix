import React from "react";
import { Controller, FieldValues } from "react-hook-form";
import { TypeRadioFieldConfig } from "../types";
import { defaultTheme } from "../theme";
import clsx from "clsx";
import "../../styles.css";

interface FieldProps {
  field: TypeRadioFieldConfig;
  control: any;
  errors: FieldValues;
  theme?: Partial<typeof defaultTheme>;
}

export default function RadioButtonField({
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
        <div className={clsx(theme.radioWrapper, field.theme?.radioWrapper)}>
          {field.options.map((option) => (
            <div
              key={option.value}
              className={clsx(
                theme.radioOptionsWrapper,
                field.theme?.radioOptionsWrapper
              )}
            >
              <input
                type="radio"
                id={`${field.name}-${option.value}`}
                value={option.value}
                checked={value === option.value}
                onChange={() => onChange(option.value)}
                className={clsx(
                  theme.radio,
                  field.theme?.radio,
                  errors[field.name] && "border-red-500"
                )}
              />
              <label
                htmlFor={`${field.name}-${option.value}`}
                className={clsx(theme.optionsLabel, field.theme?.optionsLabel)}
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      )}
    />
  );
}
