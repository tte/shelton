/* eslint strict: 0 */

var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var ClosureCompilerPlugin = require('webpack-closure-compiler')
var baseConfig = require('./webpack.config')

var config = Object.create(baseConfig)

config.plugins.push(
  new webpack.DefinePlugin({
    '__DEV__': false,
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      screw_ie8: true,
      warnings: false
    }
  }),
  new ClosureCompilerPlugin({
    compiler: {
      language_in: 'ECMASCRIPT6',
      language_out: 'ECMASCRIPT5',
      compilation_level: 'ADVANCED'
    },
    concurrency: 3,
  })
)

module.exports = config
