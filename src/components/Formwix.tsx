import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";

import {
  TypeFormConfig,
  TypeFormData,
  TypeMultiSelectFieldConfig,
  TypePasswordFieldConfig,
} from "./types";
import { generateZodSchema } from "./schema";
import Field from "./Field";
import { defaultTheme } from "./theme";

export default function Formwix({
  config,
  theme,
}: {
  config: TypeFormConfig;
  theme?: Partial<typeof defaultTheme>;
}) {
  const styles = { ...defaultTheme, ...theme };
  const {
    control,
    resetField,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    setError,
  } = useForm({
    resolver: zodResolver(generateZodSchema(config.fields)),
    defaultValues: config.defaultValues ?? {},
  });

  function resetForm() {
    config.fields.forEach((field) => {
      resetField(field.name, { defaultValue: "" });
    });
  }

  function onSubmit(data: TypeFormData) {
    let hasError = false;
    const multiSelectFields = config.fields.filter(
      (field) => field.type === "multiselect",
    );
    (multiSelectFields as TypeMultiSelectFieldConfig[]).forEach(
      (field: TypeMultiSelectFieldConfig) => {
        if (field?.validation?.required?.value) {
          const values = getValues(field.name);
          if (values.length === 0) {
            hasError = true;
            setError(field.name, {
              type: "manual",
              message:
                field?.validation?.required?.message ??
                "This field is required",
            });
          }
        }
      },
    );

    const matchingRequiredFields = config.fields.filter(
      (field) => field.type === "password" && field?.validation?.matchField,
    );
    (matchingRequiredFields as TypePasswordFieldConfig[]).forEach(
      (field: TypePasswordFieldConfig) => {
        const matchFieldName = field.validation?.matchField?.field;
        if (matchFieldName) {
          const matchFieldValue = getValues(matchFieldName);
          const fieldValue = getValues(field.name);
          if (fieldValue !== matchFieldValue) {
            hasError = true;
            setError(field.name, {
              type: "manual",
              message:
                field?.validation?.matchField?.message ??
                "Passwords do not match",
            });
          }
        }
      },
    );

    if (hasError) return;
    if (Object.keys(errors).length > 0) return;
    config.onSubmit(data, { reset: resetForm });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.formContainer}>
        {config.fields.map((field) => (
          <div
            key={field.name}
            className={clsx(
              styles.fieldContainer,
              field.theme?.fieldContainer,
              `field-${field.name}`,
            )}
            id={`field-${field.name}`}
          >
            {field.type !== "checkbox" && (
              <div
                className={clsx(
                  styles.fieldLabelWrapper,
                  field.theme?.fieldLabelWrapper,
                )}
              >
                <label
                  htmlFor={field.name}
                  className={clsx(styles.label, field.theme?.label)}
                >
                  {field.label}
                </label>
                {field?.validation?.required?.value && (
                  <span
                    className={clsx(
                      styles.requiredLabel,
                      field.theme?.requiredLabel,
                    )}
                  >
                    *
                  </span>
                )}
              </div>
            )}
            {field.description && (
              <p
                className={clsx(
                  styles.fieldDescription,
                  field.theme?.fieldDescription,
                )}
              >
                {field.description}
              </p>
            )}
            <div
              className={clsx(styles.fieldWrapper, field.theme?.fieldWrapper)}
            >
              <Field
                field={field}
                control={control}
                errors={errors}
                theme={styles}
              />
            </div>
            {errors[field.name] && (
              <p
                className={clsx(styles.fieldError, field.theme?.fieldError)}
                id={`${field.name}-error`}
              >
                {errors[field.name]?.message as string}
              </p>
            )}
          </div>
        ))}
      </div>
      <div className={styles.formActionWrapper}>
        {config.showFormReset && (
          <button
            type="button"
            onClick={() => resetForm()}
            className={styles.formResetButton}
          >
            {config.resetButtonLabel || "Reset"}
          </button>
        )}
        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting" : config.submitButtonLabel || "Submit"}
        </button>
      </div>
    </form>
  );
}
