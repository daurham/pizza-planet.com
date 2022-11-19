const path = require("path");
const env = require("dotenv").config().parsed;

const MODE = env.ENV_MODE | "development";

module.exports = {
  entry: path.join(__dirname, "client/src"),
  output: {
    path: path.join(__dirname, "client/dist"),
    filename: "bundle.js",
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};
