// node.js里面自带的操作路径的模块
const path = require("path");

// 引入vue-loader插件
const VueLoaderPlugin = require("vue-loader/lib/plugin");
// 用于提取css到文件中

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HappyPack = require("happypack");
// 构造出共享进程池，在进程池中包含 5 个子进程
const happyThreadPool = HappyPack.ThreadPool({ size: 5 });
module.exports = {
  // webpack打包的入口文件
  // babel- loader只会将 ES6 / 7 / 8语法转换为ES5语法，但是对新api并不会转换。
  entry: {
    //main: path.resolve(__dirname, "../src/main.js")
    main: ["babel-polyfill", path.resolve(__dirname, "../src/main.js")]
  },
  performance: {
    hints: false
  },
  // webpack打包的输出相关的额配置
  output: {
    // 打包过后的文件的输出的路径
    path: path.resolve(__dirname, "../dist"),
    // 打包后生成的js文件，带hash值来保证文件的唯一性
    filename: "static/js/[name].[hash:4].js",
    // 生成的chunk文件名
    chunkFilename: "static/js/[name].[hash:4].js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,

        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        test: /\.js$/,
        //exclude: /(node_modules|bower_components)/,
        exclude: file =>
          /(node_modules|bower_components)/.test(file) &&
          !/\.vue\.js/.test(file),
        //loader: "babel-loader"
        use: ["happypack/loader?id=babel"]
      },

      {
        test: /\.(jpe?g|png|gif)$/i,

        use: [
          {
            loader: "url-loader",
            options: {
              limit: 5120, // 当文件大于5kb时走file-loader相关的配置
              esModule: false, // 这个参数要设置成false,不然生成图片的路径时[object Module]
              fallback: "file-loader", // 当文件大于5kb时走file-loader相关的配置
              name: "static/images/[name].[hash:4].[ext]" // 生成的路径和文件名
            }
          }
        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 5120,
              esModule: false,
              fallback: "file-loader",
              name: "static/media/[name].[hash:4].[ext]"
            }
          }
        ]
      },

      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 5120,
              esModule: false,
              fallback: "file-loader",
              name: "static/fonts/[name].[hash:4].[ext]"
            }
          }
        ]
      },
      // 1.vue-loader 用于解析.vue文件
      //2.vue-template-compiler 用于编译模板
      //3.cache-loader 用于缓存loader编译的结果

      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "cache-loader"
          },
          {
            loader: "thread-loader"
          },
          {
            loader: "vue-loader",
            options: {
              compilerOptions: {
                preserveWhitespace: false
              }
            }
          }
        ]
      },
      {
        test: /\.css$/,
        //use: ["style-loader", "css-loader"]
        use: [
          "vue-style-loader",
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../../"
            }
          },
          "css-loader",
          "postcss-loader"
        ]
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          "vue-style-loader",
          { loader: MiniCssExtractPlugin.loader },
          "css-loader",
          "sass-loader",
          "postcss-loader"
        ]
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: "empty",
    fs: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty"
  },
  plugins: [
    new HappyPack({
      // 用唯一的标识符id来代表当前的HappyPack 处理一类特定的文件
      id: "babel",
      // 如何处理.js文件，用法和Loader配置是一样的
      // loaders: ["babel-loader"],
      loaders: [
        {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      ],
      // 使用共享进程池中的子进程去处理任务。
      threadPool: happyThreadPool
    }),

    // 实例化vue-loader  插件
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      // chunkFilename: "[id].css"
      // chunkFilename: "[id].css"
      filename: "static/css/[name].[hash:4].css",
      chunkFilename: "static/css/[name].[hash:4].css"
    })
  ],
  resolve: {
    alias: {
      // 写了这句，我们可以这样写代码 import Vue from 'vue'
      // vue$: "vue/dist/vue.runtime.esm.js",
      vue$: "vue/dist/vue.esm.js",
      // 写了这句，我们可以这样写代码 import api from '@/api/api.js'，省去到处找路径定位到src的麻烦
      "@": path.resolve(__dirname, "../src")
    },
    // 添加一个 resolve.extensions 属性，方便我们引入依赖或者文件的时候可以省略后缀
    // 我们在引入文件时可以这样写 import api from '@/api/api'。
    extensions: ["*", ".js", ".vue"]
  }
};
