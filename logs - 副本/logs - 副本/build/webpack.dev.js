const os = require("os");
const path = require("path");
// 引入webpack
const webpack = require("webpack");
// 引入webpack通用配置
const webpackCommonConfig = require("./webpack.config.js");
// 引入配置合并插件
const merge = require("webpack-merge");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
// 获取本地ip
function getNetworkIp() {
  let needHost = ""; // 打开的host
  try {
    // 获得网络接口列表
    let network = os.networkInterfaces();
    for (let dev in network) {
      let iface = network[dev];
      for (let i = 0; i < iface.length; i++) {
        let alias = iface[i];
        if (
          alias.family === "IPv4" &&
          alias.address !== "127.0.0.1" &&
          !alias.internal
        ) {
          needHost = alias.address;
        }
      }
    }
  } catch (e) {
    needHost = "localhost";
  }
  return needHost;
}
const devWebpackConfig = merge(webpackCommonConfig, {
  // 指定模式，这儿有none production development三个参数可选
  // 具体作用请查阅官方文档
  mode: "development",
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "index.html",
      inject: true
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "../static"),
        to: "static",
        ignore: [".*"]
      }
    ]),
    // 辅助HotModuleReplacementPlugin插件
    new webpack.NamedModulesPlugin(),
    // 启用热更新必须的
    new webpack.HotModuleReplacementPlugin()
  ], // 资源的引用路径（这个跟你打包上线的配置有关系）
  output: {
    publicPath: "/"
  },

  devServer: {
    clientLogLevel: "warning",
    host: getNetworkIp(),
    // 默认情况不设置这个只能通过localhost:9000来访问，现在可以通过本机局域网ip来访问，
    // 比如192.168.12.21:9000，手机在这个局网内也可以访问
    overlay: {
      warnings: true,
      errors: true
    },
    hot: true,
    port: 8200,
    compress: true,
    contentBase: false,
    quiet: true //  去掉多余的日志
  }
});
module.exports = new Promise((resolve, reject) => {
  devWebpackConfig.plugins.push(
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [
          `应用访问地址: http://${devWebpackConfig.devServer.host}:${devWebpackConfig.devServer.port}`
        ]
      }
    })
  );
  resolve(devWebpackConfig);
});
