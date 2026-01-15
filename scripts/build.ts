console.log("🧹 Cleaning dist...");
await Bun.$`rm -rf dist`.quiet();

console.log("📦 Bundling...");
const result = await Bun.build({
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
await Bun.$`cp -r assets dist/assets 2>/dev/null || true`.quiet();
console.log("✅ Build complete!");
