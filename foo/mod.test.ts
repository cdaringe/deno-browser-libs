import { foobar } from "./mod.ts";
Deno.test({
  name: "foobar",
  fn() {
    if (foobar() !== "foobar") {
      throw new Error("foobar bad");
    }
  },
});
