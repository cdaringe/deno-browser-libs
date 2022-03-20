import type { Task, Tasks } from "https://deno.land/x/rad@v6.9.1/src/mod.ts";
import { build } from "https://deno.land/x/rad@v6.9.1/src/build-buds/deb/mod.ts";

export const tasks: Tasks = {
  test: `deno test --import-map importMap.development.json ./foo/mod.test.ts`,
  build: {
    fn: async ({ logger, sh }) => {
      logger.info(`calling deb (deno esm browser) build`);
      await build({
        moduleFilenames: ["./bar/mod.ts", "./foo/mod.ts"],
        outDir: ".build",
        rewriteImportMapPath: "./importMap.production.json",
      });
      logger.info(`✅ browser ESM build complete (see ./.build):`);
      await sh(`tree ./.build`);
      logger.info(`upload the above modules, and use 'em in your browser`);
    },
  },
  publish: {
    async fn({ logger, sh }) {
      const user = Deno.env.get("HTTP_SERVER_ADMIN")!;
      const host = Deno.env.get("HTTP_SERVER_IP")!;
      const staticDirname = Deno.env.get("HTTP_SERVER_STATIC_DIRNAME")!;
      const cmd = `rsync -r ./.build/* ${user}@${host}:${staticDirname}/esm/dbl`;
      logger.info(cmd);
      await sh(cmd);
    },
  },
};
