/* eslint-disable @typescript-eslint/no-var-requires */
const config = require('./.config.js')
const task = config.tasks.scripts
const entry = task.methods.getEntry()

const webpack = require('webpack')
const path = require('path')
const { VueLoaderPlugin } = require("vue-loader");
/* eslint-enable @typescript-eslint/no-var-requires */

module.exports = {
//   mode: config.currentEnv === 'development'
//     ? 'none'
//     : config.currentEnv,
  mode: config.currentEnv,
  target: ['web', 'es5'],

  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename]
    }
  },

  watchOptions: {
    poll: 1000,
    ignored: [
      '**/node_modules',
      '**/bower_components'
    ]
  },

  entry,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, config.dir.dest),
  },
  plugins: [
    // fix "process is not defined" error:
    // (do "npm install process" before running the build)
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
      __VUE_OPTIONS_API__: 'true',
      __VUE_PROD_DEVTOOLS__: 'false'
    }),
    new VueLoaderPlugin(),
  ],
  resolve: {
    extensions: ['', '.vue', '.js', '.jsx', '.ts', '.tsx', '.json', '.coffee'],
    alias: {
       process: 'process/browser'
    }
  },
  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: ['babel-loader']
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/]
            }
          },
          'babel-loader'
        ]
      },
      {
        test: /\.p?css$/i,
        exclude: /(node_modules|bower_components)/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        exclude: /(node_modules|bower_components)/,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        exclude: /(node_modules|bower_components)/,
        type: 'asset/resource',
      },
    ],
  },
}
