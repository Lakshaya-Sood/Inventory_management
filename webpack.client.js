'use strict'
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const packageJson = require('./package.json')

const plugins = [
  // define global vars
  new webpack.DefinePlugin(
    {
      'process.env.NODE_ENV': JSON.stringify('production'),
      '__CLIENT__': true,
      '__APPVERSION__': JSON.stringify(packageJson.version),
      '__BASENAME__': JSON.stringify('/')
    }
 ),
  new ExtractTextPlugin({
    filename: 'style.css',
    allChunks: true
  }),
  new webpack.optimize.AggressiveMergingPlugin(),
  new CopyWebpackPlugin([
      { from: './src/client/assets/images/favicon.ico', to: 'favicon.ico' },
      { from: './src/client/index.html', to: 'index.html' },
      { from: './src/client/assets/images/brand-logo.png', to: 'brand-logo.png' },
      { from: './src/client/login.html', to: 'login.html' }
  ])
]

  // build optimization plugins
  // plugins.push(new webpack.optimize.UglifyJsPlugin({
  //   //sourceMap: true,
  //   compressor: { screw_ie8: true, keep_fnames: true, warnings: false, drop_console: false },
  //   mangle: { screw_ie8: true, keep_fnames: true }
  // }))

module.exports = {
  // devtool: 'source-map',
  entry: './src/client/app',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['transform-runtime'],
            presets: ['es2015', 'stage-0', 'react']
          }
        }
      },

      // load styles
      {
        test: /\.(sass|less|css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'autoprefixer-loader', 'less-loader']
        })
      },

      // Load images
      { test: /\.jpg/, loader: 'url-loader?limit=10000&mimetype=image/jpg' },
      { test: /\.gif/, loader: 'url-loader?limit=10000&mimetype=image/gif' },
      { test: /\.png/, loader: 'url-loader?limit=10000&mimetype=image/png' },
      { test: /\.svg/, loader: 'url-loader?limit=10000&mimetype=image/svg' },

      // Load fonts
      { test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' },
      { test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' }
    ]
  },
  plugins: plugins,
  resolve: {
    extensions: ['.js', '.jsx', '.less', '.css']
  }
}
