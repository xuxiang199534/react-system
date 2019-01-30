const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
const cheerio = require('cheerio');

const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, '../src');
const ENTRY_PATH = path.resolve(APP_PATH, 'index.js');
const BUILD_PATH = path.resolve(ROOT_PATH, '../dist');
const NODE_ENV = process.env.NODE_ENV;

if (NODE_ENV !== 'development') {
  let HTML = fs.readFileSync(path.resolve(__dirname, '../src/index.html'), 'utf8');
  let $ = cheerio.load(HTML);
  $('script').remove();
  fs.writeFileSync(path.resolve(__dirname, '../src/index.html'), $.html());
}

module.exports = {
  entry: {
    app: [
      'react-hot-loader/patch', // react热更新(局部刷新页面)
      // 这里reload=true的意思是，如果碰到不能hot reload的情况，就整页刷新。
      'webpack-hot-middleware/client?reload=true', ENTRY_PATH
    ]
  },
  output: {
    path: BUILD_PATH,
    publicPath: NODE_ENV === 'development' ? '/assets/' : '',
    filename: NODE_ENV === 'development' ? 'js/[name].js' : 'js/[name]-[hash:8].js',
    chunkFilename: NODE_ENV === 'development' ? 'js/[name].js' : 'js/[name]-[hash:8].js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.less', '.scss', '.css'], // 后缀名自动补全
    alias: {
      '@': `${APP_PATH}/`
    },
    modules: [
      'node_modules',
      'src'
    ]
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        use: {
          loader: "babel-loader"
        },
        exclude: /node_modules/
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader"
      }, {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' }
        ]
      }, {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'less-loader', options: {
              modifyVars: { "@font-size-base": "12px" },
              javascriptEnabled: true
            }
          },
          { loader: 'postcss-loader' }
        ]
      }, {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'images/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(APP_PATH, '../src/index.html')
    })
  ]
};