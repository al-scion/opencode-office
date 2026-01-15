import { homedir } from "node:os";
import { join } from "node:path";
import { unzipSync, zipSync } from "fflate";
import winreg from "winreg";

export const openFile = async (path: string) => {
  const process = Bun.spawn(["open", path]);
  await process.exited;
};

export const copyManifest = async () => {
  console.log("Copying manifest...");

  const manifestId = "dac8f4c2-ab45-4714-9e5b-eddc1457e727";
  const sourcePath = join(import.meta.dir, "assets", "manifest.xml");

  const platform = process.platform;

  if (platform === "darwin") {
    // macOS: Copy manifest to the wef folder
    const destPath = join(
      homedir(),
      "Library/Containers/com.microsoft.Excel/Data/Documents/wef",
      "manifest.xml"
    );
    await Bun.write(destPath, Bun.file(sourcePath), { createPath: true });
    console.log("Manifest copied successfully!");
  } else if (platform === "win32") {
    // Windows: Register manifest path in the registry
    new winreg({
      hive: winreg.HKCU,
      key: "\\SOFTWARE\\Microsoft\\Office\\16.0\\Wef\\Developer",
    }).set(manifestId, winreg.REG_SZ, sourcePath, (e) => console.error(e));

    console.log("Manifest registered in Windows registry successfully!");
  } else {
    throw new Error(`Unsupported platform: ${platform}`);
  }
};

export const replaceWebExtension = async (
  filePath: string,
  id: string,
  version: string
) => {
  const webExtensionPath = "xl/webextensions/webextension.xml";

  // Read the file as Uint8Array
  const fileData = await Bun.file(filePath).arrayBuffer();
  const zipData = new Uint8Array(fileData);
  const unzippedFile = unzipSync(zipData);

  const webExtEntry = unzippedFile[webExtensionPath];
  if (!webExtEntry) {
    throw new Error("Web extension not found");
  }

  // Decode the XML, replace placeholders, and re-encode
  const xmlContent = new TextDecoder()
    .decode(webExtEntry)
    .replace(/00000000-0000-0000-0000-000000000000/g, id)
    .replace(/1.0.0.0/g, version);
  const encodedXmlContent = new TextEncoder().encode(xmlContent);

  const updatedUnzipped = {
    ...unzippedFile,
    [webExtensionPath]: encodedXmlContent,
  };

  const newZip = zipSync(updatedUnzipped);
  await Bun.write(filePath, newZip);
};
