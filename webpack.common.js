const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = {
  entry: {
    common: ['babel-polyfill'],
    app: path.join(__dirname, './src/index.js')
  },

  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: '[name].js',
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /.js$/,
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /.less$/,
        use: [
          'style-loader',
          MiniCSSExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')(), require('cssnano')()],
              sourceMap: true
            }
          },
          {
            loader: 'less-loader',
            options: { sourceMap: true }
          }
        ]
      }
    ]
  },

  plugins: [
    new MiniCSSExtractPlugin({
      filename: '[name].css'
    }),
    new CopyWebpackPlugin([
      {
        from: '**/*',
        context: 'static/'
      }
    ]),
    new HtmlWebpackPlugin({
      title: 'Hello',
      template: 'static/index.html'
    })
  ]
}
