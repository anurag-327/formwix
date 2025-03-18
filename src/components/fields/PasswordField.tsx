import { Controller, FieldValues } from "react-hook-form";
import { TypePasswordFieldConfig } from "../types";
import { defaultTheme } from "../theme";
import { useState } from "react";
import clsx from "clsx";
import "../../styles.css";

interface FieldProps {
  field: TypePasswordFieldConfig;
  control: any;
  errors: FieldValues;
  theme?: Partial<typeof defaultTheme>;
}

export default function PasswordField({
  field,
  control,
  errors,
  theme = defaultTheme,
}: FieldProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <Controller
      name={field.name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <div
          className={clsx(theme?.passwordWrapper, field.theme?.passwordWrapper)}
        >
          <input
            type={showPassword ? "text" : "password"}
            onChange={onChange}
            value={value}
            id={field.name}
            placeholder={field.placeholder ?? "Your Answer"}
            className={clsx(
              theme?.password,
              field.theme?.password,
              errors[field.name] && "border-red-500"
            )}
          />
          <button
            type="button"
            className={clsx(
              theme.passwordEyeButtonWrapper,
              field.theme?.passwordEyeButtonWrapper
            )}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={clsx(
                  theme.passwordEyeCloseButton,
                  field.theme?.passwordEyeCloseButton
                )}
              >
                <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
                <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
                <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
                <path d="m2 2 20 20" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={clsx(
                  theme.passwordEyeButton,
                  field.theme?.passwordEyeButton
                )}
              >
                <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        </div>
      )}
    />
  );
}
