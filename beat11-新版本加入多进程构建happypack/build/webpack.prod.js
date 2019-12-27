// build/webpack.prod.js
// 引入清除打包后文件的插件（最新版的需要解构，不然会报不是构造函数的错，而且名字必须写CleanWebpackPlugin）
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// 引入配置合并插件
const path = require("path");
const merge = require("webpack-merge");
// 引入通用配置
const webpackCommonConfig = require("./webpack.config.js");
// @intervolga/optimize-cssnano-plugin 用于压缩css代码
const OptimizeCssnanoPlugin = require("@intervolga/optimize-cssnano-plugin");
// mini-css-extract-plugin 用于提取css到文件中
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 分析打包后模块分析插件
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const webpackBundleAnalyzer = require("webpack-bundle-analyzer")
//   .BundleAnalyzerPlugin;

module.exports = merge(webpackCommonConfig, {
  // 指定模式，这儿有none production development三个参数可选
  // 具体作用请查阅官方文档
  mode: "production",
  output: {
    publicPath: "./"
  },
  //  splitChunks 构建分包

  optimization: {
    minimize: true,
    splitChunks: {
      chunks: "all", // 共有三个值可选：initial(初始模块)、async(按需加载模块)和all(全部模块)
      minSize: 100, // 模块超过30k自动被抽离成公共模块
      minChunks: 1, // 模块被引用>=1次，便分割
      maxAsyncRequests: 5, // 异步加载chunk的并发请求数量<=5
      maxInitialRequests: 3, // 一个入口并发加载的chunk数量<=3
      name: true, // 默认由模块名+hash命名，名称相同时多个模块将合并为1个，可以设置为function
      automaticNameDelimiter: "~", // 命名分隔符
      cacheGroups: {
        // 缓存组，会继承和覆盖splitChunks的配置
        vendors: {
          name: "chunk-vendors",
          test: /[\\\/]node_modules[\\\/]/,
          priority: -10,
          chunks: "initial"
        },
        default: {
          // 模块缓存规则，设置为false，默认缓存组将禁用
          minChunks: 2, // 模块被引用>=2次，拆分至vendors公共模块
          priority: -20, // 优先级
          reuseExistingChunk: true // 默认使用已有的模块
        },

        elementUI: {
          name: "chunk-elementUI", // 单独将 elementUI 拆包
          priority: 15, // 权重需大于其它缓存组
          test: /[\/]node_modules[\/]element-ui[\/]/
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, "../dist/index.html"),

      template: "index.html",
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      }
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "../static"),
        to: "static",
        ignore: [".*"]
      }
    ]),
    new CleanWebpackPlugin(),
    new OptimizeCssnanoPlugin({
      sourceMap: true,
      cssnanoOptions: {
        preset: [
          "default",
          {
            mergeLonghand: false,
            cssDeclarationSorter: false
          }
        ]
      }
    }),
 
   
  ]
});
