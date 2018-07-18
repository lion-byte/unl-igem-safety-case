const merge = require('webpack-merge')

const common = require('./webpack.common')

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    compress: true,
    contentBase: './dist',
    historyApiFallback: true
  },
  mode: 'development'
})
