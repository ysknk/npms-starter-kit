import config, { currentEnv } from './.npms.configrc.js'
import webpack from 'webpack'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/* eslint-disable @typescript-eslint/no-var-requires */
const task = config.scripts
const entry = task.methods.getEntry()

// const { VueLoaderPlugin } = require("vue-loader");
/* eslint-enable @typescript-eslint/no-var-requires */

export default {
//  mode: currentEnv,
  mode: currentEnv === 'development'
    ? 'none'
    : currentEnv,
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
    path: path.resolve(__dirname, config.scripts.dest),
  },
  plugins: [
    // fix "process is not defined" error:
    // (do "npm install process" before running the build)
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
      // __VUE_OPTIONS_API__: 'true',
      // __VUE_PROD_DEVTOOLS__: 'false'
    }),
    // new VueLoaderPlugin(),
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
        test: /\.(c|m)?jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: ['babel-loader']
      },
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: ['ts-loader', 'babel-loader']
      },
      {
        test: /\.styl$/i,
        exclude: /(node_modules|bower_components)/,
        use: ['style-loader', 'css-loader', 'stylus-loader'],
      },
      {
        test: /\.(png|svg|jpe?g||gif|webp)$/i,
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
