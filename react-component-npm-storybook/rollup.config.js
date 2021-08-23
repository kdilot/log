import resolve from "@rollup/plugin-node-resolve";
import image from "@rollup/plugin-image";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import sourcemaps from "rollup-plugin-sourcemaps";
import svgr from "@svgr/rollup";
import url from "@rollup/plugin-url";
import babel from "@rollup/plugin-babel";
import pkg from "./package.json";

const extensions = [".js", ".jsx", ".ts", ".tsx"];
const external = ["react", "react-dom", "styled-components"];

export default {
  input: "./index.ts",
  output: [
    {
      sourcemap: true,
      file: pkg.main,
      format: "cjs",
    },
    {
      sourcemap: true,
      file: pkg.module,
      format: "esm",
    },
  ],
  external,
  plugins: [
    peerDepsExternal(),
    resolve({ extensions }),
    babel({ exclude: "node_modules/**" }),
    commonjs({ include: "node_modules/**" }),
    typescript({ tsconfig: "./tsconfig.json", clean: true }),
    svgr(),
    image(),
    url(),
    sourcemaps(),
  ],
};
