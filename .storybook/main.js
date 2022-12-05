module.exports = {
  "stories": [
    "../src/stories/**/*.stories.mdx",
    "../src/stories/**/*.stories.@(js|jsx|ts|tsx|vue)"
  ],
  "addons": [
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-controls"
  ],
  "framework": "@storybook/html",
  // NOTE: @storybook/html not working
  // "core": {
  //   "builder": "webpack5"
  // }
}
