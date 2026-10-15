# Word count

A small example kit for [Jimkit](https://github.com/jim-kit/jimkit). It counts words, characters, lines and reading time as you type, and has
one server route (`POST /api/a/word-count/count`) so the same count can be asked of the server.

## Install

In Jimkit, open **Kits**, paste `The-JimmyDev/jimkit-word-count` and review what it adds before you confirm.

## Use it as a starting point

- `package.json`: the manifest, under `"jimkit"`.
- `src/client.ts`: which component belongs to which tool.
- `src/Tool.tsx`: the tool, written in React with `@jimkit/ui`.
- `src/server.ts`: the server route.

Inside a Jimkit checkout this folder goes in `addons/word-count`; `npm run dev` runs it. To publish a new version, raise `version` in
`package.json`, build the bundle with `node cli/jimkit.mjs kits pack addons/word-count`, and attach `dist/jimkit-kit.json` to a GitHub release.
See [Writing a kit](https://github.com/jim-kit/jimkit/blob/main/docs/kits.md#writing-and-publishing-a-kit).

MIT licensed.
