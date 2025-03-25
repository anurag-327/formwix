import type { Meta, StoryObj } from "@storybook/react";
import Formwix from "./Formwix";
import {
  TypeFieldConfig,
  TypeFormConfig,
  TypeFormData,
} from "../components/types";

export default {
  title: "Example/Formwix",
  component: Formwix,
} satisfies Meta<typeof Formwix>;

type Story = StoryObj<typeof Formwix>;

const fields: TypeFieldConfig[] = [
  {
    type: "text",
    name: "username",
    label: "Username",
    placeholder: "Enter your username",
    validation: {
      required: { value: true, message: "Username is required" },
      maxLength: {
        value: 20,
        message: "Username must be at most 20 characters",
      },
    },
  },
  {
    type: "email",
    name: "email",
    label: "Email Address",
    placeholder: "Enter your email",
    validation: {
      required: { value: true, message: "Email is required" },
    },
  },
  {
    type: "password",
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    validation: {
      required: { value: true, message: "Password is required" },
      minLength: {
        value: 8,
        message: "Password must be at least 8 characters",
      },
      containNumber: {
        value: true,
        message: "Password must contain at least one number",
      },
      containSpecialChar: {
        value: true,
        message: "Password must contain at least one special character",
      },
      containUpperCase: {
        value: true,
        message: "Password must contain at least one uppercase letter",
      },
      containLowerCase: {
        value: true,
        message: "Password must contain at least one lowercase letter",
      },
      preventCommonPassword: {
        value: true,
        message: "Do not use a common password",
      },
    },
  },
  {
    type: "textarea",
    name: "bio",
    label: "Bio",
    placeholder: "Tell us about yourself",
    rows: 5,
    validation: {
      maxLength: {
        value: 500,
        message: "Bio must be at most 500 characters",
      },
    },
  },
  {
    type: "select",
    name: "country",
    label: "Country",
    options: [
      { label: "United States", value: "us" },
      { label: "Canada", value: "ca" },
      { label: "United Kingdom", value: "uk" },
    ],
    validation: {
      required: { value: true, message: "Please select a country" },
    },
  },
  {
    type: "multiselect",
    name: "skills",
    label: "Skills",
    options: [
      { label: "JavaScript", value: "js" },
      { label: "TypeScript", value: "ts" },
      { label: "React", value: "react" },
      { label: "Node.js", value: "node" },
    ],
    validation: {
      required: { value: true, message: "Please select at least one skill" },
    },
  },
  {
    type: "radio",
    name: "gender",
    label: "Gender",
    options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
      { label: "Other", value: "other" },
    ],
    validation: {
      required: { value: true, message: "Please select your gender" },
    },
  },
  {
    type: "checkbox",
    name: "acceptTerms",
    label: "I accept the terms and conditions",
    validation: {
      required: {
        value: true,
        message: "You must accept the terms and conditions",
      },
    },
  },
  {
    type: "date",
    name: "dob",
    label: "Date of Birth",
    validation: {
      required: { value: true, message: "Date of birth is required" },
      minDate: { value: "1900-01-01", message: "Date must be after 1900" },
      maxDate: {
        value: "2025-12-31",
        message: "Date cannot be in the future",
      },
    },
  },
  {
    type: "time",
    name: "time",
    label: "Time",
  },
  {
    type: "url",
    name: "website",
    label: "Website",
  },
  {
    type: "datetime-local",
    name: "appointment",
    label: "Appointment Time",
    validation: {
      required: { value: true, message: "Appointment time is required" },
      minDate: {
        value: "2024-01-01T00:00",
        message: "Appointment must be after today",
      },
    },
  },
];

const formConfig: TypeFormConfig = {
  onSubmit: (data: TypeFormData) => {
    console.log(data);
  },
  defaultValues: {
    skills: ["js", "react"],
    acceptTerms: true,
    gender: "male",
    country: "uk",
    dob: "2000-01-01",
    time: "12:00",
    appointment: "2024-01-01T12:00",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  },
  fields,
  validationMode: "all",
};
export const DarkModeTest: Story = {
  args: {
    config: formConfig,
  },
};
