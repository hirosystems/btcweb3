# Technical Documentation

This document describes the technical decisions and conventions used throughout the codebase.

## Environment and package manager

This project is expected to run on a recent version of Node.js 18 and [pnpm][pnpm-website]. Note that Node.js 18 comes with corepack, which itself already has pnpm, and may be used by running

```sh
corepack enable pnpm # enables built-in pnpm package mamanger

# pnpm binary is now available

pnpm install
```

To install and manage Node.js versions, you may want to consider tools like [nvm](https://github.com/nvm-sh/nvm), [n](https://github.com/tj/n) and [avn](https://github.com/wbyoung/avn).

## Build tools

This project uses,

- [Vite](https://vitejs.dev/)
- [Typescript](https://www.typescriptlang.org/)
- [ESLint](https://eslint.org/).
- [Prettier](https://prettier.io/)

## Config files

### `tsconfig.json`

Mostly follows the defaults recommended by Vite 4's autogenerated config, with the addition of `paths` and `esModuleInterop` to allow for an easier development experience. The fields are alphabetical and divided into the same sections used in [Typescript's Config Reference](https://www.typescriptlang.org/tsconfig).

### `tsconfig.node.json`

Autogenerated when bootstrapping the app with `pnpm create vite`. Used for typechecking Vite's config file.

### `.prettierrc.cjs`

Uses the `.cjs` extension to ensure code is run as CommonJS given this package is set to type `module`. [Prettier needs to export a `module.exports` object](https://prettier.io/docs/en/configuration.html), only available in a CommonJS environment, when using a JS config file.

## Import aliases

Import aliases allow defining special `import` paths that map to specific locations. Different tools support this in different ways, and must all be set up to understand the same mappings.

The aliases as defined in `tsconfig.json` are considered the source of truth. Other tools should import this config or, when not possible, have it manually copied over.

The tools using aliases are,

- Typescript uses `tsconfig.json`'s [`paths` field](https://www.typescriptlang.org/tsconfig#paths).
- Vite uses the [`vite-tsconfig-paths` plugin](https://github.com/aleclarson/vite-tsconfig-paths) to read path aliases from `tsconfig.json`.

## Environment variables

The app uses Vite to manage environment variables. The environment variables used by the app are defined in [`env.d.ts`](../../src/env.d.ts). This file is also used for their documentation.

Environment variables are typed as possibly undefined strings as they are defined outside of the type system. This ensures the app checks their values and gracefully handles a misconfigured environment. Variables are checked in and should be consumed from [`env.ts`](../../src/env.ts).

The file [`.env.dev`](../.env.dev) is committed to allow for quickly running the app without any configuration. It provides reasonable defaults that are useful in most scenarios.

During development, the available environment variables and their values may be set as described in [Vite's environment files documentation](https://vitejs.dev/guide/env-and-mode.html#env-files).

To create a local production build, we recommend creating a `.env.local` with the necessary values. This file has the highest precedence of all git-ignored `.env*` files.

The production build's environment variables are set in TODO.

## Adding a new variable

To add a new environment variable to the app,

- declare it in [`env.d.ts`](../../src/env.d.ts)
- add a reasonable default in [`.env.dev`](../../.env.dev)
- TODO set it in pipeline

## Tests

### Unit tests with Jest

Not yet set up. Tests have been copied over from the desktop wallet and Jest types installed to pass the type checks.

## User sessions

The app currently relies on a default session created by `@stacks/connect`, which it creates when necessary. Internally, `@stacks/connect` uses the [`getOrCreateUserSession`](https://github.com/hirosystems/connect/blob/3ff4ab441a3e7b1c57459794b286eb27442aa2ff/packages/connect/src/auth.ts#L33) function, which it provides as an export. Whenever interacting with the user session in the app, this function should be used to ensure all code is referring to the same user session instance.

[pnpm-website]: https://pnpm.io/
