import React from "react";
import { Controller, FieldValues } from "react-hook-form";
import clsx from "clsx";
import { TypeMultiSelectFieldConfig } from "../types";
import { defaultTheme } from "../theme";
import "../../styles.css";

interface FieldProps {
  field: TypeMultiSelectFieldConfig;
  control: any;
  errors: FieldValues;
  theme?: Partial<typeof defaultTheme>;
}

export default function MultiSelectField({
  field,
  control,
  errors,
  theme = defaultTheme,
}: FieldProps) {
  return (
    <Controller
      name={field.name}
      control={control}
      render={({ field: { onChange, value = [] } }) => (
        <div
          className={clsx(
            theme.multiSelectWrapper,
            field.theme?.multiSelectWrapper
          )}
        >
          {field.options.map((option) => (
            <div
              key={option.value}
              className={clsx(
                theme.multiSelectOptionsWrapper,
                field.theme?.multiSelectOptionsWrapper
              )}
            >
              <input
                type="checkbox"
                id={`${field.name}-${option.value}`}
                disabled={field?.disabled}
                checked={value.includes(option.value)}
                onChange={(e) => {
                  const newValue = e.target.checked
                    ? [...value, option.value]
                    : value.filter((v: string) => v !== option.value);
                  onChange(newValue);
                }}
                className={clsx(theme.mutliSelect, field.theme?.mutliSelect)}
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
