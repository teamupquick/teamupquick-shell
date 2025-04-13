const { ModuleFederationPlugin } = require("webpack").container;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/index",
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "auto",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@shared": path.resolve(__dirname, "./src/shared"),
      "@teamupquick/shared": path.resolve(__dirname, "../teamupquick-shared/src"),
      "@teamupquick/shared/dist": path.resolve(__dirname, "../teamupquick-shared/src"),
      // 支持共享模塊內部引用
      "@shared": path.resolve(__dirname, "../teamupquick-shared/src"),
      "@dto": path.resolve(__dirname, "../teamupquick-shared/src/dto"),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react", "@babel/preset-typescript"],
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "shell",
      filename: "remoteEntry.js",
      remotes: {
        // 這裡會在未來添加其他微前端模組的遠程入口點
        // auth: "auth@http://localhost:3001/remoteEntry.js",
        // project: "project@http://localhost:3002/remoteEntry.js",
        // ...以此類推
      },
      exposes: {
        // Shell 模組可能會暴露一些公共組件或功能
        // "./Router": "./src/router/routes",
      },
      shared: {
        react: { singleton: true, requiredVersion: "^18.2.0" },
        "react-dom": { singleton: true, requiredVersion: "^18.2.0" },
        "react-router-dom": { singleton: true, requiredVersion: "^6.14.0" },
        "@mui/material": { singleton: true, requiredVersion: "^5.14.0" },
        "@emotion/react": { singleton: true, requiredVersion: "^11.11.0" },
        "@emotion/styled": { singleton: true, requiredVersion: "^11.11.0" },
        // 暫時注釋掉 @teamupquick/shared 直到發布為 npm 包
        // "@teamupquick/shared": { singleton: true, requiredVersion: "^1.0.0" },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
}; 