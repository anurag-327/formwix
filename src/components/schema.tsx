import { z } from "zod";
import { TypeFieldConfig } from "./types";

/**
 * Predefined list of weak passwords to prevent
 * @type {string[]}
 */
const WEAK_PASSWORDS = [
  "123456",
  "password",
  "12345678",
  "qwerty",
  "abc123",
  "111111",
  "password1",
  "123123",
  "iloveyou",
  "abcdef",
  "654321",
  "qwerty123",
  "zxcvbnm",
  "asdfgh",
  "qwertyuiop",
  "asdf1234",
];

/**
 * Validation pattern for special characters
 * @type {RegExp}
 */
const SPECIAL_CHAR_REGEX = /[!@#$%^&*(),.?":{}|<>]/;

/**
 * Creates a default error message based on the validation type
 *
 * @param {string} fieldName - Name of the field being validated
 * @param {string} type - Type of validation (required, minLength, maxLength, etc.)
 * @param {any} [constraint] - Optional constraint value for the validation
 * @returns {string} Formatted error message
 */
const createDefaultMessage = (
  fieldName: string,
  type: string,
  constraint?: any,
): string => {
  switch (type) {
    case "required":
      return `${fieldName} is required`;
    case "minLength":
      return `${fieldName} must be at least ${constraint} characters long`;
    case "maxLength":
      return `${fieldName} cannot exceed ${constraint} characters`;
    case "min":
      return `${fieldName} must be at least ${constraint}`;
    case "max":
      return `${fieldName} cannot exceed ${constraint}`;
    default:
      return `Invalid ${fieldName}`;
  }
};

/**
 * Generates a Zod schema dynamically based on field configurations
 *
 * @param {TypeFieldConfig[]} fields - Array of field configuration objects
 * @returns {z.ZodObject<any>} Dynamically generated Zod schema
 *
 * @description
 * This function creates a Zod schema object by iterating through field configurations.
 * It supports various field types with different validation rules, including:
 * - Text and textarea fields (min/max length)
 * - Number fields (min/max value)
 * - Email validation
 * - Password complexity checks
 * - Custom regex patterns
 * - Optional field handling
 */
export const generateZodSchema = (
  fields: TypeFieldConfig[],
): z.ZodObject<any> => {
  const schemaMap: Record<string, z.ZodTypeAny> = {};

  fields.forEach((field) => {
    const { name, type, validation } = field;
    let fieldSchema: z.ZodTypeAny;

    // Base configuration for required fields
    const baseConfig = {
      required_error:
        validation?.required?.message || createDefaultMessage(name, "required"),
    };

    switch (type) {
      case "text":
        fieldSchema = z.string(baseConfig);

        if (validation?.minLength) {
          fieldSchema = (fieldSchema as z.ZodString).min(
            Number(validation.minLength.value),
            {
              message:
                validation.minLength?.message ||
                createDefaultMessage(
                  name,
                  "minLength",
                  validation.minLength.value,
                ),
            },
          );
        }

        if (validation?.maxLength) {
          fieldSchema = (fieldSchema as z.ZodString).max(
            Number(validation.maxLength.value),
            {
              message:
                validation.maxLength?.message ||
                createDefaultMessage(
                  name,
                  "maxLength",
                  validation.maxLength.value,
                ),
            },
          );
        }
        break;

      case "textarea":
        fieldSchema = z.string(baseConfig);

        if (validation?.minLength) {
          fieldSchema = (fieldSchema as z.ZodString).min(
            Number(validation.minLength.value),
            {
              message:
                validation.minLength?.message ||
                createDefaultMessage(
                  name,
                  "minLength",
                  validation.minLength.value,
                ),
            },
          );
        }

        if (validation?.maxLength) {
          fieldSchema = (fieldSchema as z.ZodString).max(
            Number(validation.maxLength.value),
            {
              message:
                validation.maxLength?.message ||
                createDefaultMessage(
                  name,
                  "maxLength",
                  validation.maxLength.value,
                ),
            },
          );
        }
        break;

      case "number":
        fieldSchema = z.number(baseConfig);

        if (validation?.min?.value !== undefined) {
          fieldSchema = (fieldSchema as z.ZodNumber).min(
            Number(validation.min.value),
            {
              message:
                validation.min?.message ||
                createDefaultMessage(name, "min", validation.min.value),
            },
          );
        }

        if (validation?.max?.value !== undefined) {
          fieldSchema = (fieldSchema as z.ZodNumber).max(
            Number(validation.max.value),
            {
              message:
                validation.max?.message ||
                createDefaultMessage(name, "max", validation.max.value),
            },
          );
        }
        break;

      case "email":
        fieldSchema = z
          .string(baseConfig)
          .email({ message: "Invalid email address" });
        break;

      case "password":
        fieldSchema = z.string(baseConfig);

        // Length validations
        if (validation?.minLength) {
          fieldSchema = (fieldSchema as z.ZodString).min(
            Number(validation.minLength.value),
            {
              message:
                validation.minLength?.message ||
                createDefaultMessage(
                  name,
                  "minLength",
                  validation.minLength.value,
                ),
            },
          );
        }

        if (validation?.maxLength) {
          fieldSchema = (fieldSchema as z.ZodString).max(
            Number(validation.maxLength.value),
            {
              message:
                validation.maxLength?.message ||
                createDefaultMessage(
                  name,
                  "maxLength",
                  validation.maxLength.value,
                ),
            },
          );
        }

        // Complex password checks
        const passwordChecks = [
          {
            condition: validation?.containUpperCase?.value,
            regex: /[A-Z]/,
            message:
              validation?.containUpperCase?.message ||
              "Password must contain at least one uppercase letter",
          },
          {
            condition: validation?.containLowerCase?.value,
            regex: /[a-z]/,
            message:
              validation?.containLowerCase?.message ||
              "Password must contain at least one lowercase letter",
          },
          {
            condition: validation?.containNumber?.value,
            regex: /[0-9]/,
            message:
              validation?.containNumber?.message ||
              "Password must contain at least one number",
          },
          {
            condition: validation?.containSpecialChar?.value,
            regex: SPECIAL_CHAR_REGEX,
            message:
              validation?.containSpecialChar?.message ||
              "Password must contain at least one special character",
          },
        ];

        passwordChecks.forEach((check) => {
          if (check.condition) {
            fieldSchema = fieldSchema.refine((val) => check.regex.test(val), {
              message: check.message,
            });
          }
        });

        // Prevent common passwords
        if (validation?.preventCommonPassword?.value) {
          fieldSchema = fieldSchema.refine(
            (val) => !WEAK_PASSWORDS.includes(val),
            {
              message:
                validation.preventCommonPassword?.message ||
                "Choose a stronger password",
            },
          );
        }
        break;

      case "select":
        fieldSchema = z.string(baseConfig);
        break;

      case "radio":
        fieldSchema = z.string(baseConfig);
        break;

      case "checkbox":
        fieldSchema = z.boolean(baseConfig);
        break;

      case "multiselect":
        fieldSchema = z.array(z.string());
        break;

      case "url":
        fieldSchema = z.string(baseConfig).url({ message: "Invalid URL" });
        break;

      case "date":
        fieldSchema = z.string(baseConfig).regex(/^\d{4}-\d{2}-\d{2}$/, {
          message: "Invalid date format. Expected YYYY-MM-DD",
        });
        break;

      case "time":
        fieldSchema = z.string(baseConfig).regex(/^\d{2}:\d{2}$/, {
          message: "Invalid time format. Expected HH:MM",
        });
        break;

      case "datetime-local":
        fieldSchema = z
          .string(baseConfig)
          .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/, {
            message: "Invalid datetime format. Expected YYYY-MM-DDTHH:MM",
          });
        break;

      case "tel":
        fieldSchema = z
          .string(baseConfig)
          .regex(/^\d{10,15}$/, {
            message: "Invalid phone number format. Expected 10-15 digits.",
          })
          .transform((value) => value.replace(/\D/g, "")); // Remove non-numeric characters

        break;

      default:
        fieldSchema = z.string(baseConfig);
    }

    if (validation?.required?.value) {
      fieldSchema = fieldSchema.refine(
        (val) => {
          if (Array.isArray(val)) return val.length > 0;
          return (
            val !== undefined && val !== null && val !== "" && val != false
          );
        },
        {
          message:
            validation?.required?.message ||
            createDefaultMessage(name, "required"),
        },
      );
    } else {
      fieldSchema = fieldSchema.optional();
    }

    if (validation?.pattern?.value) {
      const patternValue = String(validation.pattern.value).trim();
      let regexPattern: RegExp;
      try {
        if (patternValue.startsWith("/") && patternValue.lastIndexOf("/") > 0) {
          const lastSlashIndex = patternValue.lastIndexOf("/");
          let patternBody = patternValue.slice(1, lastSlashIndex);
          const flags = patternValue.slice(lastSlashIndex + 1);
          patternBody = patternBody
            .replace(/\\d/g, "\\d")
            .replace(/\\s/g, "\\s");
          regexPattern = new RegExp(patternBody, flags);
        } else {
          regexPattern = new RegExp(patternValue);
        }
        fieldSchema = (fieldSchema as z.ZodString).regex(regexPattern, {
          message:
            validation.pattern?.message ||
            `Input does not match the required pattern`,
        });
      } catch (error) {
        console.error("Invalid regex pattern:", patternValue, error);
      }
    }

    schemaMap[name] = fieldSchema;
  });

  return z.object(schemaMap);
};
