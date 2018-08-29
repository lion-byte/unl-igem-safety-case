const CleanWebpackPlugin = require('clean-webpack-plugin')
const merge = require('webpack-merge')
const { DefinePlugin } = require('webpack')

const common = require('./webpack.common')

module.exports = merge(common, {
  devtool: 'source-map',
  mode: 'production',
  performance: {
    maxAssetSize: 300000,
    maxEntrypointSize: 300000
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new DefinePlugin({
      'process.env': {
        server: JSON.stringify('https://igem-test.herokuapp.com/graphql')
      }
    })
  ]
})
