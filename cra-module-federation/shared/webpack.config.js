const HtmlWebpackPlugin = require("html-webpack-plugin");
const InterpolateHtmlPlugin = require("interpolate-html-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const { MFLiveReloadPlugin } = require("@module-federation/fmr");
// const path = require("path");
const deps = require("./package.json").dependencies;

module.exports = {
  entry: "./src/index.ts",
  mode: "development",
  devServer: {
    port: 8002,
    open: false,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    hot: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new MFLiveReloadPlugin({
      port: 8002, // the port your app runs on
      container: "shared", // the name of your app, must be unique
      standalone: false, // false uses chrome extention
    }),
    new ModuleFederationPlugin({
      name: "shared",
      filename: "remoteEntry.js",
      exposes: {
        // expose each component
        "./Button": "./src/components/Button.tsx",
        "./Hooks": "./src/utils/hooks.tsx",
        "./Context": "./src/utils/context.tsx",
      },
      shared: [
        {
          ...deps,
          react: { singleton: true, eager: true, requiredVersion: deps.react },
          "react-dom": {
            singleton: true,
            eager: true,
            requiredVersion: deps["react-dom"],
          },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.ico",
    }),
    new InterpolateHtmlPlugin({
      PUBLIC_URL: "./", // can modify `static` to another name or get it from `process`
    }),
  ],
};
