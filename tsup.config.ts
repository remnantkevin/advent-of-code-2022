import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["index.ts"],
  clean: true,
  onSuccess: "node dist/index.js",
  splitting: false,
  sourcemap: true,
  bundle: true,
  minify: false,
  format: "esm",
  target: "esnext",
  platform: "node",
});
