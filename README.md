# nvAux

The in-the-zone, idea-capturing sidekick for creative knowledge workers.

[![Dependencies](https://david-dm.org/matterofabstract/nvAux.svg)](https://github.com/matterofabstract/nvAux)
![Github All Releases](https://img.shields.io/github/downloads/matterofabstract/nvAux/total.svg)
![Lint](https://github.com/matterofabstract/nvAux/workflows/Lint/badge.svg)
![Build/release](https://github.com/matterofabstract/nvAux/workflows/Build/release/badge.svg)

nvAux is a note-taking app that knows how to get weird. It's purpose is to capture and retrieve things at the speed of thought so that you can maximize on your journey through flowstate.
![Screenshot of nvAux](https://bpk-disk.s3.us-east-1.amazonaws.com/nvAux-screenshot.png?c=5)

## Development

Get a local develop instance running with:

```sh
yarn && yarn dev
```

You can generate a build for macOS, Windows and Linux all in one go with:

```sh
yarn electron-pack
```

Don't forget to take a peak at `packages.json` for more commands.

## Releasing updates

Releases are managed through GitHub Actions, namely Samuelmeuli's [action-electron-builder](https://github.com/samuelmeuli/action-electron-builder). See the [workflows](https://github.com/matterofabstract/nvAux/tree/master/.github/workflows) directory for details.

When you want to create a new release, follow these steps:

1. Update the version in your project's `package.json` file (e.g. `1.2.3`)
2. Commit that change (`git commit -am v1.2.3`)
3. Tag your commit (`git tag v1.2.3`). Make sure your tag name's format is `v*.*.*`. Your workflow will use this tag to detect when to create a release
4. Push your changes to GitHub (`git push && git push --tags`)

After building successfully, the action will publish your release artifacts. By default, a new release draft will be created on GitHub with download links for your app. If you want to change this behavior, have a look at the [`electron-builder` docs](https://www.electron.build/).

![](https://bpk-disk.s3.us-east-1.amazonaws.com/designed-by-abstractly-footer.png?c=1)
