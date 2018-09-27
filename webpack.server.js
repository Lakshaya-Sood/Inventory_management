'use strict'
var fs = require('fs')
const path = require('path')
const webpack = require('webpack')
// const CopyWebpackPlugin = require('copy-webpack-plugin')
// const CleanWebpackPlugin = require('clean-webpack-plugin')
const packageJson = require('./package.json')

const plugins = [
  new webpack.DefinePlugin(
    {
      'process.env.NODE_ENV': JSON.stringify('production'),
      '__CLIENT__': false,
      '__APPVERSION__': JSON.stringify(packageJson.version),
      '__BASENAME__': JSON.stringify('/')
    },
   new webpack.IgnorePlugin(/\.(css|less)$/)
 )
]

// if (process.env.DRP_CF_STAGE !== 'local') {
//   plugins.push(new webpack.optimize.UglifyJsPlugin({
//     compressor: { screw_ie8: true, keep_fnames: true, warnings: false },
//     mangle: { screw_ie8: true, keep_fnames: true }
//   }))
// }

module.exports = {

  entry: path.resolve(__dirname, 'server.js'),

  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'server.bundle.js'
  },
  target: 'node',

  // keep node_module paths out of the bundle
  externals: fs.readdirSync(path.resolve(__dirname, 'node_modules')).concat([
    'react-dom/server', 'react/addons'
  ]).reduce(function (ext, mod) {
    ext[mod] = 'commonjs ' + mod
    return ext
  }, {}),

  node: {
    __filename: true,
    __dirname: true
  },

  module: {
    rules: [
      { test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, './src/client')
        ],
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          plugins: ['transform-runtime'],
          presets: ['es2015', 'stage-0', 'react']
        }
      },
      { test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          plugins: ['transform-runtime'],
          presets: ['es2015', 'stage-0', 'react']
        }
      },

          // //load styles
          // {
          //   test: /\.(sass|less)$/,
          //   loader: ExtractTextPlugin.extract('style-loader',  "css-loader!autoprefixer-loader!less-loader")
          // },
      {
        test: /\.pem$/,
        loader: 'raw-loader'
      },
          // Load images
          { test: /\.jpg/, loader: 'url-loader?limit=10000&mimetype=image/jpg' },
          { test: /\.gif/, loader: 'url-loader?limit=10000&mimetype=image/gif' },
          { test: /\.png/, loader: 'url-loader?limit=10000&mimetype=image/png' },
          { test: /\.svg/, loader: 'url-loader?limit=10000&mimetype=image/svg' },

          // Load fonts
          { test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
          { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' },
          { test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' }
    ]
  },
  plugins: plugins,
  resolve: {
    extensions: ['.js', '.jsx', '.less', '.css']
  }

}
