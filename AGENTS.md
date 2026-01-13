# AGENTS.md

## Build & Test Commands

- **Build**: `npm run build`
- **Test**: `npm run test` or `bun test`
- **Single Test**: `bun test <file-pattern>`
- **Watch Mode**: `bun test --watch`
- **Lint**: `npm run lint` (biome)
- **Fix & Format**: `npm run lint:fix` (biome check --write)
- **Format**: `npm run format` (biome format)

## Code Style Guidelines

### Imports & Module System

- Use ES6 `import`/`export` syntax (module: "ESNext", type: "module")
- Group imports: external libraries first, then internal modules
- Use explicit file extensions (`.ts`) for internal imports

### Formatting & Linting (Biome)

- **Single quotes**: enabled
- **Line width**: 100 characters
- **Indent style**: space (2 width)
- **Trailing commas**: ES5
- **Semicolons**: always

### TypeScript & Naming

- **NeverNesters**: avoid deeply nested structures. Always exit early.
- **Strict mode**: enforced (`"strict": true`)
- **Classes**: PascalCase (e.g., `OfficePlugin`)
- **Methods/properties**: camelCase
- **Status strings**: use union types (e.g., `'pending' | 'running' | 'completed' | 'failed' | 'cancelled'`)
- **Explicit types**: prefer explicit type annotations over inference
- **Return types**: optional (not required but recommended for public methods)

### Error Handling

- Check error type before accessing error properties: `error instanceof Error ? error.toString() : String(error)`
- Log errors with `[ERROR]` prefix for consistency
- Always provide error context when recording output

### Linting Rules

- Biome `recommended` rules are enabled.
- `no-console`: minimize console logs in production code, prefer `ctx.client.app.log`.

## Testing

- Framework: **vitest** with `describe` & `it` blocks
- Style: Descriptive nested test cases with clear expectations
- Assertion library: `expect()` (vitest)

## Project Context

- **Type**: ES Module package for Bun modules
- **Target**: Bun runtime, ES2021+
- **Purpose**: Microsoft Office plugin for OpenCode
- **Release**: Automated via Release Please and GitHub Actions (OIDC)
