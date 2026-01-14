import { homedir } from "node:os";
import { join } from "node:path";

export const copyManifest = async () => {
  const sourcePath = join(process.cwd(), "assets", "manifest.xml");
  const destPath = join(
    homedir(),
    "Library/Containers/com.microsoft.Excel/Data/Documents/wef",
    "manifest.xml"
  );
  await Bun.write(destPath, Bun.file(sourcePath), { createPath: true });
};
