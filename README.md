![Made with love](https://img.shields.io/badge/Made%20with-%E2%9D%A4-red)
![TypeScript](https://img.shields.io/badge/TypeScript-Supported-blue?logo=typescript)
![npm](https://img.shields.io/npm/v/formwix)
![npm](https://img.shields.io/npm/dm/formwix)
![License](https://img.shields.io/npm/l/formwix)

# Formwix

![Banner](https://github.com/user-attachments/assets/fab47f8e-4947-4de8-9317-cd2c826a9c90)

> Dynamic form generation for React applications

Formwix is a powerful React library that enables developers to create dynamic, customizable forms through a simple configuration-based approach. Built on top of `react-hook-form`, Formwix combines the flexibility of custom form building with robust validation capabilities.

## Features

- **Configuration-based form generation** - Create complex forms with minimal code
- **Built-in validation** - Leverage the power of react-hook-form for form validation
- **Customizable theming** - Style your forms globally or at the individual field level
- **Responsive design** - Forms adapt to different screen sizes

## Installation

```bash
# Using npm
npm install formwix

# Using yarn
yarn add formwix

# Using pnpm
pnpm add formwix

```

## Quick Start

```tsx
import { Formwix, TypeFieldConfig, TypeFormConfig } from "formwix";
import { toast } from "sonner";
import "formwix/dist/formwix.css";

// Define your form fields
const fields: TypeFieldConfig[] = [
  {
    type: "email",
    label: "Email",
    name: "email",
    placeholder: "Enter your email",
    validation: {
      required: { value: true, message: "Email is required" },
    },
  },
  {
    type: "password",
    label: "Password",
    name: "password",
    placeholder: "Enter your password",
    validation: {
      required: { value: true, message: "Password is required" },
      minLength: {
        value: 6,
        message: "Password must be at least 6 characters",
      },
    },
  },
];

// Configure your form
const config: TypeFormConfig = {
  fields,
  submitButtonLabel: "Login",
  onSubmit: (values, { reset }) => {
    toast.success("Form submitted successfully!");
    reset();
  },
};

// Use the Formwix component
export default function LoginForm() {
  return <Formwix config={config} />;
}
```

## Core Concepts

### Form Configuration

Forms in Formwix are defined using a configuration object that specifies fields, validation rules, and submission behavior.

#### TypeFormConfig

| Property              | Type                        | Description                            |
| --------------------- | --------------------------- | -------------------------------------- |
| `fields`              | `TypeFieldConfig[]`         | Array of field configurations          |
| `submitButtonLabel`   | `string`                    | Label for the submit button            |
| `onSubmit`            | `(data, formUtils) => void` | Function called when form is submitted |
| `defaultValues`       | `TypeFormData`              | Default values for the form fields     |
| `showFormResetButton` | `boolean`                   | Whether to show a reset button         |
| `resetButtonLabel`    | `string`                    | Label for the reset button             |
| `validationMode`      | `string`                    | Defines the validation behaviour       |

### Field Configuration

Each field in the form is defined using a field configuration object.

#### TypeFieldConfig

| Property      | Type                                      | Description                                           |
| ------------- | ----------------------------------------- | ----------------------------------------------------- |
| `type`        | `string`                                  | Type of the field (e.g., "text", "email", "password") |
| `name`        | `string`                                  | Name of the field (used as the form data key)         |
| `label`       | `string`                                  | Label displayed for the field                         |
| `placeholder` | `string` (optional)                       | Placeholder text for the field                        |
| `value`       | `string` (optional)                       | Initial value for the field                           |
| `validation`  | `TypeValidationRules` (optional)          | Validation rules for the field                        |
| `description` | `string` (optional)                       | Description displayed below the field                 |
| `theme`       | `Partial<typeof defaultTheme>` (optional) | Field-specific theme overrides                        |
| `disabled`    | `boolean` (optional)                      | Whether the field is disabled                         |

### Validation

Formwix leverages `react-hook-form` for validation and provides a simple interface to define validation rules.

#### TypeValidationRules

| Property    | Type                        | Description                   |
| ----------- | --------------------------- | ----------------------------- |
| `min`       | `TypeGenericValidationRule` | Minimum value                 |
| `max`       | `TypeGenericValidationRule` | Maximum value                 |
| `minLength` | `TypeGenericValidationRule` | Minimum length                |
| `maxLength` | `TypeGenericValidationRule` | Maximum length                |
| `pattern`   | `TypeGenericValidationRule` | Regular expression pattern    |
| `required`  | `TypeGenericValidationRule` | Whether the field is required |

## Theming

Formwix provides a flexible theming system that allows you to customize the appearance of your forms.

### Default Theme

Formwix comes with a default theme that you can override either globally or at the field level.

```tsx
// Default theme classes
const defaultTheme = {
  form: "df-form",
  formContainer: "df-form-container",
  fieldContainer: "df-field-container",
  fieldWrapper: "df-field-wrapper",
  fieldLabelWrapper: "df-field-label-wrapper",
  label: "df-label",
  optionsLabel: "df-options-label",
  requiredLabel: "df-required-label",
  fieldDescription: "df-field-description",
  fieldError: "df-field-error",
  text: "df-text",
  email: "df-email",
  tel: "df-tel",
  textarea: "df-textarea",
  number: "df-number",
  date: "df-date",
  passwordWrapper: "df-password-wrapper",
  password: "df-password",
  passwordEyeButtonWrapper: "df-password-eye-button-wrapper",
  passwordEyeButton: "df-password-eye-button",
  passwordEyeCloseButton: "df-password-eye-close-button",
  checkBoxWrapper: "df-checkbox-wrapper",
  checkbox: "df-checkbox",
  checkBoxLabel: "df-checkbox-label",
  selectOptionsWrapper: "df-select-options-wrapper",
  select: "df-select",
  radioWrapper: "df-radio-wrapper",
  radioOptionsWrapper: "df-radio-options-wrapper",
  multiSelectWrapper: "df-multi-select-wrapper",
  multiSelect: "df-multi-select",
  multiSelectOptionsWrapper: "df-multi-select-options-wrapper",
  radio: "df-radio",
  formActionWrapper: "df-form-action-wrapper",
  submitButton: "df-submit-button",
  formResetButton: "df-form-reset-button",
  time: "df-time",
  url: "df-url",
};
```

### Custom Theming

To apply custom styles, pass a `theme` object to the `Formwix` component:

```tsx
<Formwix
  config={config}
  theme={{
    email: "border border-gray-300 w-full py-2 px-2 rounded-lg outline-none",
    passwordWrapper:
      "border flex justify-end items-center relative border-gray-300 w-full py-2 px-2 rounded-lg",
    submitButton: "bg-black text-white w-full py-2 rounded-lg",
  }}
/>
```

#### Global Theming

Apply styles globally by passing a theme object to the `Formwix` component.

#### Field-Level Theming

Override styles for specific fields by including a `theme` property in the field configuration:

```tsx
const fields: TypeFieldConfig[] = [
  {
    type: "email",
    label: "Email",
    name: "email",
    theme: {
      email: "border-2 border-blue-500 rounded-md p-2",
    },
  },
];
```

## Field Types

Formwix supports various field types to address different input needs:

| Type             | Description                                 |
| ---------------- | ------------------------------------------- |
| `text`           | Single-line text input                      |
| `email`          | Email input with validation                 |
| `password`       | Password input with show/hide functionality |
| `tel`            | Telephone number input                      |
| `number`         | Numeric input                               |
| `date`           | Date picker                                 |
| `time`           | Time picker                                 |
| `url`            | URL input with validation                   |
| `textarea`       | Multi-line text input                       |
| `select`         | Dropdown selection                          |
| `radio`          | Radio button group                          |
| `checkbox`       | Checkbox input                              |
| `multiSelect`    | Multiple selection dropdown                 |
| `datetime-local` | Date and time picker                        |

## Examples

### Login Form

```tsx
import { Formwix, TypeFieldConfig, TypeFormConfig } from "formwix";

const fields: TypeFieldConfig[] = [
  {
    type: "email",
    label: "Email",
    name: "email",
    placeholder: "Enter your email",
    validation: {
      required: { value: true, message: "Email is required" },
    },
  },
  {
    type: "password",
    label: "Password",
    name: "password",
    placeholder: "Enter your password",
    validation: {
      required: { value: true, message: "Password is required" },
      minLength: {
        value: 6,
        message: "Password must be at least 6 characters",
      },
    },
  },
];

const config: TypeFormConfig = {
  fields,
  submitButtonLabel: "Login",
  onSubmit: (values, { reset }) => {
    console.log(values);
    // Handle form submission
  },
};

export default function LoginForm() {
  return <Formwix config={config} />;
}
```

### Contact Form

```tsx
import { Formwix, TypeFieldConfig, TypeFormConfig } from "formwix";

const fields: TypeFieldConfig[] = [
  {
    type: "text",
    label: "Name",
    name: "name",
    placeholder: "Enter your full name",
    validation: {
      required: { value: true, message: "Name is required" },
    },
  },
  {
    type: "email",
    label: "Email",
    name: "email",
    placeholder: "Enter your email",
    validation: {
      required: { value: true, message: "Email is required" },
    },
  },
  {
    type: "tel",
    label: "Phone",
    name: "phone",
    placeholder: "Enter your phone number",
  },
  {
    type: "select",
    label: "Subject",
    name: "subject",
    options: [
      { label: "General Inquiry", value: "general" },
      { label: "Support", value: "support" },
      { label: "Feedback", value: "feedback" },
    ],
    validation: {
      required: { value: true, message: "Subject is required" },
    },
  },
  {
    type: "textarea",
    label: "Message",
    name: "message",
    placeholder: "Enter your message",
    validation: {
      required: { value: true, message: "Message is required" },
      minLength: {
        value: 10,
        message: "Message must be at least 10 characters",
      },
    },
  },
];

const config: TypeFormConfig = {
  fields,
  submitButtonLabel: "Send Message",
  onSubmit: (values, { reset }) => {
    console.log(values);
    // Handle form submission
    reset();
  },
};

export default function ContactForm() {
  return <Formwix config={config} />;
}
```

## API Reference

### Components

#### Formwix

The main component for generating forms.

```tsx
import { Formwix } from "formwix";

<Formwix config={formConfig} theme={customTheme} />;
```

##### Props

| Prop     | Type                           | Description               |
| -------- | ------------------------------ | ------------------------- |
| `config` | `TypeFormConfig`               | Form configuration object |
| `theme`  | `Partial<typeof defaultTheme>` | Theme overrides           |

### Type Definitions

#### TypeFormConfig

Defines the overall form configuration.

```ts
export interface TypeFormConfig {
  fields: TypeFieldConfig[];
  submitButtonLabel?: string;
  validationMode?: "onBlur" | "onChange" | "onSubmit" | "onTouched" | "all";
  onSubmit: (data: TypeFormData, formUtils: TypeFormUtils) => void;
  defaultValues?: TypeFormData;
  showFormResetButton?: boolean;
  resetButtonLabel?: string;
}
```

#### TypeFieldConfig

Defines the structure of form fields.

```ts
export interface TypeFieldConfig {
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
```

#### TypeValidationRules

Defines validation rules for fields.

```ts
export interface TypeValidationRules {
  min?: TypeGenericValidationRule;
  max?: TypeGenericValidationRule;
  minLength?: TypeGenericValidationRule;
  maxLength?: TypeGenericValidationRule;
  pattern?: TypeGenericValidationRule;
  required?: TypeGenericValidationRule;
}
```

#### TypeFormUtils

Provides utilities for form manipulation.

```ts
export interface TypeFormUtils {
  reset: () => void;
}
```

## Advanced Usage

### Dynamic Form Generation

You can dynamically generate form fields based on data:

```tsx
import { Formwix, TypeFieldConfig, TypeFormConfig } from "formwix";

function DynamicForm({ schema }) {
  // Transform schema into Formwix field configuration
  const fields: TypeFieldConfig[] = schema.map((item) => ({
    type: item.fieldType,
    label: item.label,
    name: item.name,
    placeholder: item.placeholder,
    validation: item.validation,
  }));

  const config: TypeFormConfig = {
    fields,
    submitButtonLabel: "Submit",
    onSubmit: (values) => {
      console.log(values);
    },
  };

  return <Formwix config={config} />;
}
```

### Multi-step Forms

Create multi-step forms by conditionally rendering different Formwix components:

```tsx
import { useState } from "react";
import { Formwix, TypeFieldConfig, TypeFormConfig } from "formwix";

function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const handleStep1Submit = (data) => {
    setFormData({ ...formData, ...data });
    setStep(2);
  };

  const handleStep2Submit = (data) => {
    const finalData = { ...formData, ...data };
    console.log("Final form data:", finalData);
    // Submit final data
  };

  const step1Fields: TypeFieldConfig[] = [
    // Step 1 fields
  ];

  const step2Fields: TypeFieldConfig[] = [
    // Step 2 fields
  ];

  const step1Config: TypeFormConfig = {
    fields: step1Fields,
    submitButtonLabel: "Next",
    onSubmit: handleStep1Submit,
  };

  const step2Config: TypeFormConfig = {
    fields: step2Fields,
    submitButtonLabel: "Submit",
    onSubmit: handleStep2Submit,
    defaultValues: formData,
  };

  return (
    <div>
      {step === 1 && <Formwix config={step1Config} />}
      {step === 2 && <Formwix config={step2Config} />}
    </div>
  );
}
```

## Field Type Examples

Below are examples of how to configure each supported field type in Formwix.

### Text Field

```tsx
{
  type: "text",
  name: "textField",
  label: "Text Field",
  placeholder: "Enter text",
  validation: {
    required: { value: true, message: "Required" },
    minLength: { value: 3, message: "Minimum 3 characters required" },
    maxLength: { value: 30, message: "Maximum 30 characters allowed" },
  }
}

```

### Email Field

```tsx
{
  type: "email",
  name: "email",
  label: "Email",
  placeholder: "Enter your email",
  validation: {
    required: { value: true, message: "Email is required" },
  }
}

```

### Password Field

```tsx
{
  type: "password",
  name: "password",
  label: "Password",
  placeholder: "Enter your password",
  validation: {
    required: { value: true, message: "Password is required" },
    minLength: { value: 8, message: "Password must be at least 8 characters" },
    containUpperCase: { value: true, message: "Password must contain at least one uppercase letter" },
    containLowerCase: { value: true, message: "Password must contain at least one lowercase letter" },
    containNumber: { value: true, message: "Password must contain at least one number" },
    containSpecialChar: { value: true, message: "Password must contain at least one special character" },
    matchField:  { field:  "password", message:  "Passwords do not match"},
  }
}

```

### Number Field

```tsx
{
  type: "number",
  name: "quantity",
  label: "Quantity",
  placeholder: "Enter quantity",
  validation: {
    required: { value: true, message: "Quantity is required" },
    min: { value: 1, message: "Minimum quantity is 1" },
    max: { value: 100, message: "Maximum quantity is 100" }
  }
}

```

### Select Field

```tsx
{
  type: "select",
  name: "country",
  label: "Country",
  placeholder: "Select your country",
  options: [
    { label: "United States", value: "us" },
    { label: "Canada", value: "ca" },
    { label: "United Kingdom", value: "uk" }
  ],
  validation: {
    required: { value: true, message: "Please select a country" }
  }
}

```

### Textarea Field

```tsx
{
  type: "textarea",
  name: "description",
  label: "Description",
  placeholder: "Enter description",
  rows: 4,
  validation: {
    required: { value: true, message: "Description is required" },
    maxLength: { value: 500, message: "Maximum 500 characters allowed" }
  }
}

```

### Checkbox Field

```tsx
{
  type: "checkbox",
  name: "terms",
  label: "I agree to the terms and conditions",
  validation: {
    required: { value: true, message: "You must agree to the terms" }
  }
}

```

### Radio Field

```tsx
{
  type: "radio",
  name: "gender",
  label: "Gender",
  options: [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" }
  ],
  validation: {
    required: { value: true, message: "Please select a gender" }
  }
}

```

### Tel Field

```tsx
{
  type: "tel",
  name: "tel",
  label: "Phone No.",
  placeholder: "Enter Phone Number",
  validation: {
    required: { value: true, message: "Required" },
    minLength: { value: 3, message: "Minimum 3 characters required" },
    maxLength: { value: 50, message: "Maximum 50 characters allowed" },
    pattern: { value: `/^[0-9]*$/`, message: "Only numbers are allowed" }
  }
}

```

### URL Field

```tsx
{
  type: "url",
  name: "website",
  label: "Website",
  placeholder: "Enter your website URL",
  validation: {
    required: { value: true, message: "URL is required" }
  }
}

```

### DateTime-Local Field

```tsx
{
  type: "datetime-local",
  name: "appointment",
  label: "Appointment Time",
  validation: {
    required: { value: true, message: "Appointment time is required" },
    minDate: { value: "2024-01-01T00:00", message: "Appointment must be after January 1, 2024" }
  }
}

```

### Time Field

```tsx
{
  type: "time",
  name: "time",
  label: "Time",
  validation: {
    required: { value: true, message: "Time is required" }
  }
}

```

### Date Field

```tsx
{
  type: "date",
  name: "dob",
  label: "Date of Birth",
  validation: {
    required: { value: true, message: "Date of birth is required" },
    minDate: { value: "1990-01-01", message: "Date must be after 1990" },
    maxDate: { value: "2025-12-31", message: "Date cannot be after 2025" }
  }
}

```

### Multi-Select Field

```tsx
{
  type: "multiselect",
  name: "skills",
  label: "Skills",
  options: [
    { label: "JavaScript", value: "js" },
    { label: "TypeScript", value: "ts" },
    { label: "React", value: "react" },
    { label: "Node.js", value: "node" }
  ],
  validation: {
    required: { value: true, message: "Please select at least one skill" }
  }
}

```

## Best Practices

- **Use meaningful field names**: Choose field names that reflect their purpose for better code readability.
- **Provide clear validation messages**: Help users understand what went wrong when validation fails.
- **Use field descriptions**: Add descriptions to complex fields to guide users.
- **Keep forms focused**: Each form should have a clear purpose and collect only necessary information.
- **Use appropriate field types**: Choose the right field type for each input to improve the user experience.
- **Test form validation**: Ensure your validation rules work as expected.

## Troubleshooting

### Common Issues

**Problem**: Form isn't submitting.

**Solution**: Check if your validation rules are preventing submission. Look for validation errors in the form.

**Problem**: Custom styles aren't applying.

**Solution**: Ensure you're importing the CSS file and check the specificity of your CSS selectors.

**Problem**: Form values aren't being cleared after submission.

**Solution**: Make sure you're calling the `reset()` function in your `onSubmit` handler.

## Documentation

For more detailed documentation and examples, visit docs

- [Documentation](https://formwix-docs.vercel.app/)

## Resources

- [GitHub Repository](https://github.com/anurag-327/formwix)
- [Contribution Guidelines](https://github.com/anurag-327/formwix/blob/main/CONTRIBUTING.md)
- [Documentation](https://formwix-docs.vercel.app/)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
