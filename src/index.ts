import type { Plugin } from "@opencode-ai/plugin";

export const OfficePlugin: Plugin = async (ctx) => {
	console.log("Microsoft Office Plugin Loaded Successfully!")
	return {};
};

export default OfficePlugin;
