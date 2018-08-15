const CleanWebpackPlugin = require('clean-webpack-plugin')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const merge = require('webpack-merge')
const path = require('path')

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
    new PrerenderSPAPlugin({
      staticDir: path.join(__dirname, './dist'),
      indexPath: path.join(__dirname, './dist/index.html'),
      routes: [
        '/',
        '/account',
        '/create',
        '/create/root',
        '/create/sub-node',
        '/create/template',
        '/edit',
        '/example',
        '/login',
        '/logout',
        '/register',
        '/view'
      ],
      minify: {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        decodeEntities: true,
        keepClosingSlash: true,
        sortAttributes: true
      }
    })
  ]
})
