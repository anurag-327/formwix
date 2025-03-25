# Changelog

## [1.1.0] – 2025-03-26

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
