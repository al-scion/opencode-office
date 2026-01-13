import { type Plugin } from '@opencode-ai/plugin';

export const OfficePlugin: Plugin = async (ctx) => {
  console.log('Microsoft Office Plugin Loaded Successfully!');

  return {
    'tool.execute.before': async (input, output) => {
      // Example: add logic for office-related tools
    },
  };
};

export default OfficePlugin;
