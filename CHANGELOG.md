# Changelog

## [1.3.3] - 2026-04-11

### ⚒️ Fixes

- **Form Reinitialization**
  - Resolved an issue where form fields did not update when `defaultValues` were set asynchronously. The form now properly reinitializes using `reset()` when default values change.

## [1.3.2] - 2026-03-26

### ⚒️ Fixes

- **Required Field Validation**
  - Resolved an issue where required fields were not correctly validated across different input types.

## [1.3.1] - 2026-03-26

### ✨ Styling fix

- **Dark Mode - Password Field**
  - Fixed styling inconsistencies in the password field when using dark mode.

## [1.3.0] - 2026-03-26

### ✨ Enhancements

- **Dark Mode**
  - Improved dark mode support by adding dedicated classes for form fields, ensuring a seamless appearance across themes.

## [1.1.0] – 2025-03-25

### ✨ Enhancements

- **Configurable Validation Mode**:
  - Introduced `validationMode` in the config, allowing users to define form validation behavior.
  - Supported modes: `"onChange"` (default), `"onSubmit"`, `"onBlur"`, `onTouched` and `"all"`.
- **Improved Form Submission Handling**:
  - Submit button is now automatically disabled based on form validity (`isValid`).
  - Provides a smoother user experience by preventing invalid submissions.
- **Improvements for consistency and clarity**
  - Rename showFormReset to showFormResetButton to improve clarity and avoid ambiguity, ensuring it explicitly indicates that it controls the visibility of the form reset button.

---

## [1.0.0] – 2025-03-21

### 🚀 Initial Release – **Formwix**

- **Dynamic Form Generation**: Build forms based on configuration, reducing boilerplate.
- **Built-in Validation**: Supports Zod schema validation with React Hook Form.
- **Customizable Theming**: Global and per-form theming options available.
- **Field-Level Components**: Individual form fields can be used separately, enabling flexible custom form layouts.
