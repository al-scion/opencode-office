import { existsSync } from "node:fs";
import { cp, rm } from "node:fs/promises";
import { build } from "bun";

console.log("🧹 Cleaning dist...");
await rm("./dist", { recursive: true, force: true });

console.log("📦 Bundling...");
const result = await build({
  entrypoints: ["./src/index.ts"],
  outdir: "./dist",
  target: "bun",
});

if (!result.success) {
  console.error("❌ Build failed");
  for (const message of result.logs) {
    console.error(message);
  }
  process.exit(1);
}

console.log("📂 Copying assets...");
if (existsSync("assets")) {
  await cp("assets", "dist/assets", { recursive: true });
}

console.log("✅ Build complete!");
