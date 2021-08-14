const config = require('./.config.js')
const task = config.tasks.styles
const functions = task.methods.getFunctions()

const plugins = {
  'postcss-easy-import': {},
  'postcss-simple-vars': {},
  'postcss-mixins': {},
  'postcss-functions': {
    functions
  },
  'postcss-nested': {},
  'postcss-preset-env': {
    autoprefixer: {
      flexbox: 'no-2009'
    },
    stage: 0,
    features: {
      // NOTE: Not suitable for BEM
      // 'nesting-rules': true
    }
  },
  'postcss-flexbugs-fixes': {},
}

module.exports = (ctx) => {
  return {
    plugins: config.isProduction ? {
      ...plugins,
      'postcss-csso': {}
    } : {
      ...plugins
    },
  }
}
