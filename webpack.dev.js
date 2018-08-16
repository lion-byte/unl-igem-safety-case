const merge = require('webpack-merge')
const { DefinePlugin } = require('webpack')

const common = require('./webpack.common')

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    compress: true,
    contentBase: './dist',
    historyApiFallback: true
  },
  mode: 'development',
  plugins: [
    new DefinePlugin({
      'process.env': {
        server: JSON.stringify('http://localhost:3000/graphql')
      }
    })
  ]
})
