# TaskRunner for npm-scripts

## Structure

``` bash
[root] project root
  |-[.cli]
  |-[src] src dir
  |  |-[scripts]   js(jsx, vue, ts, etc...) files
  |  |-[templates] pug files
  |  |-[styles]    postcss(pcss) or stylus(styl) files
  |  |-[statics]   static files
  |  |-[images]    image(jpg,png,gif,svg) files
  |-[dist] dist dir
  |-...config files
  |-README.md
```

> ignore `_*.*` files.

## How to use

``` sh
# Git Clone && CD
git clone https://github.com/ysknk/npms-starter-kit.git _app && cd _app

# Init Install
npm i

# Wake up Local Server(default=>localhost:3000)
npm run dev

# All Build
npm run build
```

### Storybook

`@storybook/react` or `@storybook/vue`

## Base Compiler/Transpiler

### templates(pug)
https://github.com/pugjs/pug-cli

### styles

#### postcss
https://github.com/postcss/postcss-cli

#### stylus + nib
https://github.com/stylus/stylus  
https://github.com/stylus/nib

### scripts(webpack)
https://github.com/webpack/webpack

### images(min)
https://github.com/imagemin/imagemin

