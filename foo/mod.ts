import { name as bName } from "bar/mod.ts";
export const name: string = "lib-a";
export const greet = () =>
  console.log(`hi im ${name} and i have brother, ${bName}`);
