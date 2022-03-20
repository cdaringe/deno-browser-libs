# deno browser libs demo

A demonstration and recipe for compiling TypeScript -> browser ready `ESM` using `deno`.

`deno` is ESM oriented, instrinsically. Missing from `deno` is a recipe for building/publishing of TS source for browser consumption.

## demo

Run it:

```sh
$ deno install --unstable -f -A -n rad https://raw.githubusercontent.com/cdaringe/rad/v6.9.1/src/bin.ts && rad -l info build
```

- observe `foo/mod.ts`
  - observe an import to `bar/mod.ts`
    - this uses **`importMap.development.json`** to resolve the module locally
- run the build
  - `bar/mod.ts` is now resolved to the URL requested in **`importMap.production.json`**
  - see `rad.ts` for the `build` task.
    - the build task:
      - compiles all modules from TS => ESM, and
      - remaps `importMap.development.json` => `importMap.production.json`
        - you can provide your own import remapping function instead of using `rewriteImportMapPath`.

**Disclaimer**

- It probably goes without saying, it's up to you to upload your artifacts to the associated HTTP server
- `rad` is **not required for use**. the `build` function is hosted in the `rad` repository, however
