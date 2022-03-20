import type { Task, Tasks } from "https://deno.land/x/rad@v6.9.1/src/mod.ts";
import { build } from "https://deno.land/x/rad@v6.9.1/src/build-buds/deb/mod.ts";

/**
 * example rad tasks
 */
export const tasks: Tasks = {
  /**
   * make-style tasks!
   */
  build: {
    fn: async ({ logger, sh }) => {
      logger.info(`calling deb (deno esm browser) build`);
      await build({
        moduleFilenames: ["./bar/mod.ts", "./foo/mod.ts"],
        outDir: "build",
        rewriteImportMapPath: "./importMap.production.json",
      });
      logger.info(`✅ browser ESM build complete (see ./build):`);
      await sh(`tree ./build`);
      logger.info(`upload the above modules, and use 'em in your browser`);
    },
  },
};
