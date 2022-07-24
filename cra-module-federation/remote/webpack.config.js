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
    port: 8001,
    open: false,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    hot: true,
    historyApiFallback: true,
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
      port: 8001, // the port your app runs on
      container: "remote", // the name of your app, must be unique
      standalone: false, // false uses chrome extention
    }),
    new ModuleFederationPlugin({
      name: "remote",
      filename: "remoteEntry.js",
      remotes: {
        shared: "shared@http://localhost:8002/remoteEntry.js",
      },
      exposes: {
        // expose each component
        "./Remote": "./src/pages/remote",
      },
      shared: {
        ...deps,
        react: { singleton: true, eager: true, requiredVersion: deps.react },
        "react-dom": {
          singleton: true,
          eager: true,
          requiredVersion: deps["react-dom"],
        },
      },
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
