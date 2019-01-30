const config = require('./webpack.config.base');
const webpack = require('webpack');

config.devtool = 'cheap-module-source-map';
/*
 * mode = 'development'，会将 process.env.NODE_ENV 的值设为 development。启用 NamedChunksPlugin 和 NamedModulesPlugin。
 * */
config.mode = 'development';

config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
config.plugins.push(new webpack.HotModuleReplacementPlugin());
config.plugins.push(new webpack.NoEmitOnErrorsPlugin());
config.plugins.push(new webpack.HotModuleReplacementPlugin());  // react热更新

module.exports = config;