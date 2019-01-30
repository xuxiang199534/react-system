const config = require('./webpack.config.base');
const optimizeCss = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, '../src');
const ENTRY_PATH = path.resolve(APP_PATH, 'index.js');

/*
 * mode = 'production'，会将 process.env.NODE_ENV 的值设为 production。启用 FlagDependencyUsagePlugin, FlagIncludedChunksPlugin,
 * ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 UglifyJsPlugin.
 * */
config.mode = 'production';
config.entry = {
  app: [ ENTRY_PATH ]
}
config.module.rules = [
  {
    test: /(\.jsx|\.js)$/,
    use: {
      loader: "babel-loader"
    },
    exclude: /node_modules/
  }, {
    test: /\.css$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: '../'
        }
      },
      'css-loader',
      'postcss-loader',
      'less-loader',
    ]
  }, {
    test: /\.less$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: '../'
        }
      },
      'css-loader',
      'postcss-loader',
      {
        loader: 'less-loader', options: {
          modifyVars: { "@font-size-base": "12px" },
          javascriptEnabled: true
        }
      }
    ]
  }, {
    test: /\.(png|jpg|gif)$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 8192,
          outputPath: "images/",
          name: '[name]-[hash:8].[ext]'
        }
      },
      {
        loader: 'image-webpack-loader' // 压缩图片
      }
    ]
  }
]

config.plugins.push(new MiniCssExtractPlugin({ // 提取css文件
  filename: 'css/[name]-[hash:8].css'
}))
config.plugins.push(new optimizeCss()); // 压缩css文件

module.exports = config;