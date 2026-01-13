import { $ } from "bun";

const args = process.argv.slice(2);
const tag = args[0] ?? "latest";
const dryRun = args.includes("--dry-run") || args[1] === "true";

const packageJson = JSON.parse(await Bun.file("package.json").text()) as {
  version: string;
};

console.log("Publishing to npm");
console.log(` > with tag: ${tag}...`);
console.log(` > npm version: ${(await $`npm --version`).text().trim()}`);

if (tag === "next") {
  let lastTag = "";
  try {
    lastTag = (await $`git describe --tags --abbrev=0`.text()).trim();
  } catch {
    lastTag = "";
  }

  let buildNumber = "";
  if (lastTag) {
    buildNumber = (
      await $`git rev-list ${lastTag}..HEAD --count`.text()
    ).trim();
    console.log(` > last tag: ${lastTag}`);
    console.log(` > commits since last tag: ${buildNumber}`);
  } else {
    buildNumber = (await $`git rev-list HEAD --count`.text()).trim();
    console.log(" > no previous tag found");
    console.log(` > total commits: ${buildNumber}`);
  }

  const releaseVersion = packageJson.version.split("-")[0];
  const prereleaseVersion = `${releaseVersion}-next.${buildNumber}`;
  console.log(
    ` > bumping version: ${packageJson.version} -> ${prereleaseVersion}`,
  );

  if (!dryRun) {
    await $`npm version ${prereleaseVersion} --no-git-tag-version --allow-same-version`;
  }
}

if (!dryRun) {
  let provenanceFlag: string[] = [];
  if (!process.env.GITHUB_ACTIONS) {
    provenanceFlag = ["--no-provenance"];
    console.log(" > provenance: disabled (local environment)");
  } else {
    console.log(" > provenance: enabled (GitHub Actions with OIDC)");
  }

  await $`npm publish --access public --tag ${tag} ${provenanceFlag}`;
  console.log("Published successfully!");
} else {
  console.log("Dry run mode - skipping actual publish");
}
