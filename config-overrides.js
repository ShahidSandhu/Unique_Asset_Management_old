const { override, addBabelPlugin } = require("customize-cra");
const path = require("path");

module.exports = override(
  addBabelPlugin("@babel/plugin-proposal-private-property-in-object"),
  (config) => {
    // Add custom loader for Sass
    config.module.rules.push({
      test: /\.scss$/,
      use: ["style-loader", "css-loader", "sass-loader"],
    });
    return config;
  }
);
