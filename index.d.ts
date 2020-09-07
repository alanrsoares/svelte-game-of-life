import { Plugin } from "rollup";

declare module "rollup-plugin-livereload" {
  export default function livereload(
    options: string | { watch: string }
  ): Plugin;
}
