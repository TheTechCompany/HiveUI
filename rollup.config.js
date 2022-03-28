import typescript from "rollup-plugin-typescript2";

import pkg from "./package.json";

const extensions = [".js", ".jsx", ".ts", ".tsx"];
const input = "src/index.ts";

const plugins = [
  typescript({
    typescript: require("typescript"),
  }),
//   resolve(),
//   postcss({extract: true})
];

const external = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
];

export default [
  {
    input,
    output: {
      dir: 'dist',
      format: "esm",
      sourcemap: true,
    },
    preserveModules: true,
    plugins,
    external
  },
//   {
//     input,
//     output: {
//       dir: 'dist',
//       format: "cjs",
//       sourcemap: true,
//     },
//     preserveModules: true,
//     plugins,
//     external
//   },
];