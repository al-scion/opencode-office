# opencode-office

Microsoft Office Plugin for OpenCode.

## Features

- 🏗️ TypeScript-based module architecture
- ⚡ Biome for high-performance linting and formatting
- 📦 Bun/npm build tooling
- 🧪 Vitest testing setup
- 🚀 GitHub Actions CI/CD with Trusted Publishing (OIDC)
- 📝 Automated releases with Release Please

## Getting Started

1. **Install dependencies:**

   ```bash
   bun install
   ```

2. **Development:**
   - `npm run build` - Build the module
   - `npm run lint` - Lint code
   - `npm run format` - Format code
   - `npm run test` - Run tests

## Releasing & Publishing

This project uses **Release Please** for automated versioning and changelogs.

### 1. Conventional Commits

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification for all changes:

- `fix:` bumps patch version (0.1.0 -> 0.1.1)
- `feat:` bumps minor version (0.1.0 -> 0.2.0)
- `feat!:` or `fix!:` bumps major version (breaking changes)

### 2. Automated Release Workflow

1. Push your commits to the `main` branch.
2. Release Please will automatically open/update a "Release PR" with the new version and changelog.
3. Merge the Release PR to trigger the automated build and publish to npm.

### 3. NPM Trusted Publishing

Authentication with npm is handled automatically via GitHub Actions OIDC (OpenID Connect). No manual tokens are required.

## Author

- [al-scion](https://github.com/al-scion)

## License

MIT License. See the [LICENSE](LICENSE) file for details.
