import { z } from "zod";
import { TypeFieldConfig } from "./types";

export const generateZodSchema = (
  fields: TypeFieldConfig[]
): z.ZodObject<any> => {
  const schemaMap: Record<string, z.ZodTypeAny> = {};
  fields.forEach((field) => {
    let fieldSchema: z.ZodTypeAny;
    switch (field.type) {
      case "text":
        fieldSchema = z.string();
        if (field.validation?.minLength) {
          fieldSchema = (fieldSchema as z.ZodString).min(
            Number(field.validation?.minLength.value),
            field.validation?.minLength?.message ||
              `Minimum ${field.validation?.minLength.value} characters required`
          );
        }
        if (field.validation?.maxLength) {
          fieldSchema = (fieldSchema as z.ZodString).max(
            Number(field.validation?.maxLength?.value),
            field.validation?.maxLength?.message ||
              `Maximum ${field.validation.maxLength.value} characters allowed`
          );
        }
        break;

      case "email":
        fieldSchema = z.string().email("Invalid email address");
        break;

      case "password":
        fieldSchema = z.string();

        if (field.validation?.minLength) {
          fieldSchema = (fieldSchema as z.ZodString).min(
            Number(field.validation?.minLength.value),
            field.validation?.minLength?.message ||
              `Minimum ${field.validation.minLength.value} characters required`
          );
        }

        if (field.validation?.maxLength) {
          fieldSchema = (fieldSchema as z.ZodString).max(
            Number(field.validation?.maxLength.value),
            field.validation?.maxLength?.message ||
              `Maximum ${field.validation.maxLength} characters allowed`
          );
        }

        if (field.validation?.containUpperCase?.value) {
          fieldSchema = fieldSchema.refine(
            (val) => /[A-Z]/.test(val),
            field.validation?.containUpperCase?.message ||
              "Password must contain at least one uppercase letter"
          );
        }

        if (field.validation?.containLowerCase?.value) {
          fieldSchema = fieldSchema.refine(
            (val) => /[a-z]/.test(val),
            field.validation?.containLowerCase?.message ||
              "Password must contain at least one lowercase letter"
          );
        }

        if (field.validation?.containNumber?.value) {
          fieldSchema = fieldSchema.refine(
            (val) => /[0-9]/.test(val),
            field.validation?.containNumber?.message ||
              "Password must contain at least one number"
          );
        }

        if (field.validation?.containSpecialChar?.value) {
          fieldSchema = fieldSchema.refine(
            (val) => /[!@#$%^&*(),.?":{}|<>]/.test(val),
            field.validation?.containSpecialChar?.message ||
              "Password must contain at least one special character"
          );
        }

        const weakPasswords = [
          "password",
          "123456",
          "qwerty",
          "abc123",
          "111111",
        ];
        if (field.validation?.preventCommonPassword?.value) {
          fieldSchema = fieldSchema.refine(
            (val) => !weakPasswords.includes(val),
            field.validation?.preventCommonPassword?.message ||
              "This password is too common. Choose a stronger password"
          );
        }

        // if (field.validation?.matchField) {
        //   fieldSchema = fieldSchema.refine(
        //     (val) =>
        //       field?.validation?.matchField?.field !== undefined &&
        //       val === formValues[field.validation.matchField.field],
        //     {
        //       message:
        //         field.validation.matchField.message ?? "Passwords do not match",
        //     }
        //   );
        // }

        break;

      case "number":
        fieldSchema = z.number();
        if (field.validation?.min?.value !== undefined) {
          fieldSchema = (fieldSchema as z.ZodNumber).min(
            Number(field.validation?.min?.value),
            field.validation?.min?.message ||
              `Minimum value is ${field.validation.min.value}`
          );
        }
        if (field.validation?.max?.value !== undefined) {
          fieldSchema = (fieldSchema as z.ZodNumber).max(
            Number(field.validation?.max?.value),
            field.validation?.max?.message ||
              `Maximum value is ${field.validation.max.value}`
          );
        }
        break;

      case "textarea":
        fieldSchema = z.string();
        if (field.validation?.minLength?.value) {
          fieldSchema = (fieldSchema as z.ZodString).min(
            Number(field.validation.minLength.value),
            field.validation?.minLength?.message ||
              `Minimum ${field.validation?.minLength?.value} characters required`
          );
        }
        if (field.validation?.maxLength?.value) {
          fieldSchema = (fieldSchema as z.ZodString).max(
            Number(field.validation.maxLength.value),
            field.validation?.maxLength?.message ||
              `Maximum ${field.validation?.maxLength?.value} characters allowed`
          );
        }
        break;

      case "select":
        fieldSchema = z.string();
        break;

      case "radio":
        fieldSchema = z.string();
        break;

      case "checkbox":
        fieldSchema = z.boolean();
        break;

      case "multiselect":
        fieldSchema = z.array(z.string());
        break;

      case "url":
        fieldSchema = z.string().url();
        break;

      case "date":
        fieldSchema = z
          .string()
          .regex(
            /^\d{4}-\d{2}-\d{2}$/,
            "Invalid date format. Expected YYYY-MM-DD"
          );
        break;

      case "time":
        fieldSchema = z
          .string()
          .regex(/^\d{2}:\d{2}$/, "Invalid time format. Expected HH:MM");
        break;

      case "datetime-local":
        fieldSchema = z
          .string()
          .regex(
            /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/,
            "Invalid datetime format. Expected YYYY-MM-DDTHH:MM"
          );
        break;

      default:
        fieldSchema = z.string();
    }

    if (field.validation?.pattern?.value) {
      const patternValue = String(field.validation?.pattern?.value);
      // Check if the pattern already includes delimiters (like /pattern/)
      const regexPattern =
        patternValue.startsWith("/") && patternValue.lastIndexOf("/") > 0
          ? new RegExp(
              patternValue.slice(1, patternValue.lastIndexOf("/")),
              patternValue.slice(patternValue.lastIndexOf("/") + 1)
            )
          : new RegExp(patternValue);

      fieldSchema = (fieldSchema as z.ZodString).regex(
        regexPattern,
        field.validation?.pattern?.message ||
          `Input does not match the required pattern: ${patternValue}`
      );
    }

    if (field.validation?.required?.value) {
      fieldSchema = fieldSchema;
    } else {
      fieldSchema = fieldSchema.optional();
    }

    schemaMap[field.name] = fieldSchema;
  });

  return z.object(schemaMap);
};
