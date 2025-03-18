import * as React from "react";
import { FieldValues } from "react-hook-form";
import { TypeFieldConfig } from "./types";
import { defaultTheme } from "./theme";
import TextField from "./fields/TextField";
import EmailField from "./fields/EmailField";
import PasswordField from "./fields/PasswordField";
import DateField from "./fields/DateField";
import DateTimeLocalField from "./fields/DateTimeLocalField";
import NumberField from "./fields/NumberField";
import TextAreaField from "./fields/TextAreaField";
import CheckBoxField from "./fields/CheckboxField";
import RadioButtonField from "./fields/RadioButtonField";
import SelectField from "./fields/SelectFieldWrapper";
import MultiSelectField from "./fields/MultiSelectFieldWrapper";
import TimeField from "./fields/TimeField";
import URLField from "./fields/URLField";
import TelField from "./fields/TelField";
interface FieldProps {
  field: TypeFieldConfig;
  control: any;
  errors: FieldValues;
  theme?: Partial<typeof defaultTheme>;
}

export default function Field({ field, control, errors, theme }: FieldProps) {
  switch (field.type) {
    case "text":
      return (
        <TextField
          field={field}
          control={control}
          errors={errors}
          theme={theme}
        />
      );

    case "number":
      return (
        <NumberField
          field={field}
          control={control}
          errors={errors}
          theme={theme}
        />
      );

    case "email":
      return (
        <EmailField
          field={field}
          control={control}
          errors={errors}
          theme={theme}
        />
      );

    case "url":
      return (
        <URLField
          field={field}
          control={control}
          errors={errors}
          theme={theme}
        />
      );

    case "password":
      return (
        <PasswordField
          field={field}
          control={control}
          errors={errors}
          theme={theme}
        />
      );

    case "textarea":
      return (
        <TextAreaField
          field={field}
          control={control}
          errors={errors}
          theme={theme}
        />
      );

    case "date":
      return (
        <DateField
          field={field}
          control={control}
          errors={errors}
          theme={theme}
        />
      );

    case "datetime-local":
      return (
        <DateTimeLocalField
          field={field}
          control={control}
          errors={errors}
          theme={theme}
        />
      );

    case "time":
      return (
        <TimeField
          field={field}
          control={control}
          errors={errors}
          theme={theme}
        />
      );

    case "checkbox":
      return (
        <CheckBoxField
          field={field}
          control={control}
          errors={errors}
          theme={theme}
        />
      );

    case "select":
      return (
        <SelectField
          field={field}
          control={control}
          errors={errors}
          theme={theme}
        />
      );

    case "radio":
      return (
        <RadioButtonField
          field={field}
          control={control}
          errors={errors}
          theme={theme}
        />
      );

    case "multiselect":
      return (
        <MultiSelectField
          field={field}
          control={control}
          errors={errors}
          theme={theme}
        />
      );

    case "tel":
      return (
        <TelField
          field={field}
          control={control}
          errors={errors}
          theme={theme}
        />
      );
    default:
      return null;
  }
}
