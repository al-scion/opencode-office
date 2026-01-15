import type { Plugin } from "@opencode-ai/plugin";
import { copyManifest } from "./utils";

export const OfficePlugin: Plugin = async (ctx) => {
  console.log("Microsoft Office Plugin Loaded Successfully!");
  await copyManifest();

  return {};
};

export default OfficePlugin;
