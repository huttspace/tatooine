import { fileURLToPath } from "url";
import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    setupFiles: "./src/test/setup",
    exclude: [...configDefaults.exclude, "**/playwright/**"],
    alias: {
      "src/": fileURLToPath(new URL("./src/", import.meta.url)),
    },
  },
});
