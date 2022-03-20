import { bar } from "bar/mod.ts";
export const foo = () => "foo";
export const foobar = () => `${foo()}${bar()}`;
