import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { visualizer } from "rollup-plugin-visualizer";
export default defineConfig({
  plugins: [
    react({
      jsxRuntime: "automatic",
    }),
    dts({ insertTypesEntry: true, rollupTypes: false }),
    visualizer({ open: true }),
  ],
  build: {
    minify: true,
    sourcemap: false,
    lib: {
      entry: "src/index.ts",
      name: "formwix",
      fileName: (format) => `formwix.${format}.js`,
      formats: ["es"],
    },
    rollupOptions: {
      treeshake: true,
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react-hook-form",
        "zod",
      ],
      output: {
        preserveModules: false,
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "jsxRuntime",
          "react-hook-form": "ReactHookForm",
          zod: "Zod",
        },
      },
    },
  },
});
