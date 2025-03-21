import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import prettier from "eslint-plugin-prettier";

export default [
    js.configs.recommended,
    {
        files: ["**/*.ts", "**/*.tsx"],
        ignores: ["node_modules", "dist", ".vite", ".eslintcache"],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: "./tsconfig.json",
                ecmaVersion: "latest",
                sourceType: "module",
            },
            globals: {
                console: "readonly"
            }
        },
        plugins: { "@typescript-eslint": tsPlugin, react, prettier },
        rules: {
            "prettier/prettier": "error",
            "react/react-in-jsx-scope": "off",
            "import/prefer-default-export": "off",
            "@typescript-eslint/no-unused-vars": "warn",
            "react/prop-types": "off",
        },
    },
];
