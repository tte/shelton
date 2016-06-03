/* eslint strict: 0 */

var webpack = require('webpack')
var baseConfig = require('./webpack.config')


var config = Object.create(baseConfig)

config.debug = true

config.devtool = 'eval'

config.entry = [
  'babel-polyfill',
  'webpack-dev-server/client?http://localhost:3000',
  'webpack/hot/only-dev-server',
  './app/index',
  './theme/app.scss'
]

config.plugins.push(
  new webpack.HotModuleReplacementPlugin()
)

module.exports = config
