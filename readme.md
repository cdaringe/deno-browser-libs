# deno browser libs (dbl) demo

Compiling TypeScript -> browser ready `ESM` modules/libraries using `deno`.

`deno` is ESM oriented, instrinsically, however, `deno` does not offer a recipe for building/publishing of TS source for browser consumption.

This project demonstrates [deb](https://github.com/cdaringe/rad/tree/main/src/build-buds/deb) to prepare deno browser libraries for publishing to HTTP servers.

## Demo

This project hosts **two** libaries, `foo` & `bar`. Observe them in `./foo` & `./bar` respectively.

Let's build these modules for the browser. Run the build:

```sh
$ deno install --unstable -f -A -n rad https://raw.githubusercontent.com/cdaringe/rad/v6.9.1/src/bin.ts && rad -l info build
```

What happened end-to-end?

- Open `foo/mod.ts`
  - Observe an import to `bar/mod.ts`
    - This uses **`importMap.development.json`** to resolve the module locally
- Run the build
  - `bar/mod.ts` is now resolved to the URL requested in **`importMap.production.json`**
  - This mapping is configured in `rad.ts`, in the `build` task.
  - The build task does the following:
    - compiles all modules from TS => ESM, and
    - remaps `importMap.development.json` => `importMap.production.json`
      - You may provide your own import remapping function instead of using `rewriteImportMapPath`, if desired

Finally, upload your artifacts to the associated HTTP server. In my example, I sync the `./.build` directory to `https://static.cdaringe.com/esm/dbl/bar/`

Disclaimer, the `rad` build tool is **not required for use**. The `build` function is hosted in the `rad` repository. :)

## Tasks

- `rad -l info test` - run tests
- `rad -l info build` - build browser ESM modules, ready to publish
- `rad -l info publish` - rsync ESM modules to HTTP server
