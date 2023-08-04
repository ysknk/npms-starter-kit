import path from 'path'
import glob from 'glob'

// import { createRequire } from 'module'
// const require = createRequire(import.meta.url)

export const env = process.env.NODE_ENV
export const isProduction = env === 'production'
export const currentEnv = env || 'development'

export const dir = {
  src: `./src/`,
  dest: `./dist/`,
}

export const cwd = {
//   templates: `${dir.src}templates`,
  styles: `${dir.src}styles`,
  scripts: `${dir.src}scripts`,
  images: `${dir.src}images`,
//   statics: `${dir.src}statics`
}

export const methods = {
  getFileData: (_name, _cwd) => {
    const name = _name.replace(/\.[^/.]+$/, '')
    const fullpath = path.resolve(_cwd, name)
    return { name, fullpath }
  },
  transformObject2Array: (object) => {
    return Object.keys(object).map(function (key) {return object[key]})
  }
}

export const assetDir = `${dir.dest}assets/`

export default {
  stylus: {
    cwd: `${cwd.styles}/`,
    dest: `${assetDir}css/`,
    src: "**/[!_]*.styl"
  },
  scripts: {
    src: `${cwd.scripts}/**/*`,
    dest: `${assetDir}js/`,
    methods: {
      getEntry: () => {
        const entries = glob.sync('**/*.*', {
          ignore: '**/_*',
          cwd: cwd.scripts
        }).map((key) => {
          const data = methods.getFileData(key, cwd.scripts)
          return methods.transformObject2Array(data)
        })
        return Object.fromEntries(entries)
      }
    }
  },
  imagemin: {
    cwd: `${cwd.images}/`,
    src: "**/[!_]*.{jpg,png,gif,svg}",
    dest: `${assetDir}img/`,

//     plugins: [
//       require('imagemin-pngquant')({
//         quality: [0.4, 0.8]
//       }),
//       require('imagemin-mozjpeg')({
//         quality: 85,
//         progressive: true
//       }),
//       require('imagemin-gifsicle')(),
//       require('imagemin-svgo')({
//         plugins: [
//           { name: 'removeViewBox', active: false }
//         ]
//       }),
//     ]
  },
  iconvlite: {
    dest: `${dir.dest}`,
    rel: `${dir.dest}`,
    // to: "sjis"
  },
  del: {
    dest: `${dir.dest}`
  }
}
