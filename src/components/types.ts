import { FieldValues, UseFormReset } from "react-hook-form";
import { defaultTheme } from "./theme";

export interface TypeGenericValidationRule {
  value: number | string | boolean;
  message?: string;
}

export interface TypeMatchFieldValidationRule {
  field: string;
  message?: string;
}

export interface TypeValidationRules {
  min?: TypeGenericValidationRule;
  max?: TypeGenericValidationRule;
  minLength?: TypeGenericValidationRule;
  maxLength?: TypeGenericValidationRule;
  pattern?: TypeGenericValidationRule;
  minDate?: TypeGenericValidationRule;
  maxDate?: TypeGenericValidationRule;
  required?: TypeGenericValidationRule;
}

export interface TypeBaseFieldConfig {
  type: string;
  name: string;
  label: string;
  placeholder?: string;
  value?: string;
  validation?: TypeValidationRules;
  description?: string;
  theme?: Partial<typeof defaultTheme>;
  disabled?: boolean;
}

export interface TypeTextFieldConfig extends TypeBaseFieldConfig {
  type: "text";
}

export interface TypeNumberFieldConfig extends TypeBaseFieldConfig {
  type: "number";
}

export interface TypeEmailFieldConfig extends TypeBaseFieldConfig {
  type: "email";
}

export interface TypePasswordFieldConfig extends TypeBaseFieldConfig {
  type: "password";
  validation?: TypeValidationRules & {
    containNumber?: TypeGenericValidationRule;
    containSpecialChar?: TypeGenericValidationRule;
    containUpperCase?: TypeGenericValidationRule;
    containLowerCase?: TypeGenericValidationRule;
    preventCommonPassword?: TypeGenericValidationRule;
    matchField?: TypeMatchFieldValidationRule;
  };
}

export interface TypeTextAreaFieldConfig extends TypeBaseFieldConfig {
  type: "textarea";
  rows?: number;
}

export interface TypeOption {
  label: string;
  value: string | number;
}

export interface TypeSelectFieldConfig extends TypeBaseFieldConfig {
  type: "select";
  options: TypeOption[];
}

export interface TypeMultiSelectFieldConfig extends TypeBaseFieldConfig {
  type: "multiselect";
  options: TypeOption[];
}

export interface TypeRadioFieldConfig extends TypeBaseFieldConfig {
  type: "radio";
  options: TypeOption[];
}

export interface TypeCheckboxFieldConfig extends TypeBaseFieldConfig {
  type: "checkbox";
  label: string;
}

export interface TypeDateTimeLocalFieldConfig extends TypeBaseFieldConfig {
  type: "datetime-local";
}

export interface TypeDateFieldConfig extends TypeBaseFieldConfig {
  type: "date";
}

export interface TypeTimeFieldConfig extends TypeBaseFieldConfig {
  type: "time";
}

export interface TypeURLFieldConfig extends TypeBaseFieldConfig {
  type: "url";
}

export interface TypeTelFieldConfig extends TypeBaseFieldConfig {
  type: "tel";
}

export type TypeFieldConfig =
  | TypeTextFieldConfig
  | TypeEmailFieldConfig
  | TypePasswordFieldConfig
  | TypeNumberFieldConfig
  | TypeTextAreaFieldConfig
  | TypeSelectFieldConfig
  | TypeMultiSelectFieldConfig
  | TypeRadioFieldConfig
  | TypeCheckboxFieldConfig
  | TypeDateTimeLocalFieldConfig
  | TypeDateFieldConfig
  | TypeTimeFieldConfig
  | TypeURLFieldConfig
  | TypeTelFieldConfig;

export type TypeFormUtils = {
  reset: UseFormReset<{
    [x: string]: any;
  }>;
};

export type TypeSubmitButtonArgsConfig = {
  data: TypeFormData;
  formutils: TypeFormUtils;
};

export interface TypeFormConfig {
  fields: TypeFieldConfig[];
  submitButtonLabel?: string;
  validationMode?: "onBlur" | "onChange" | "onSubmit" | "onTouched" | "all";
  // eslint-disable-next-line no-unused-vars
  onSubmit: (data: TypeFormData, formUtils: TypeFormUtils) => void;
  defaultValues?: TypeFormData;
  showFormReset?: boolean;
  resetButtonLabel?: string;
}

export interface FieldProps {
  field: TypeFieldConfig;
  control: any;
  errors: FieldValues;
  classNames?: Partial<typeof defaultTheme>;
}
export type TypeFormData = Record<string, unknown>;
