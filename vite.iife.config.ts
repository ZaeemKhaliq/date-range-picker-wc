import { resolve } from "path";
import { defineConfig } from "vite";

// https://vite.dev
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/date-range-picker-wc.ts"),
      name: "DateRangePickerWc",
      formats: ["iife"],
      fileName: () => "date-range-picker-w.iife.js",
    },
    emptyOutDir: false,
  },
});
