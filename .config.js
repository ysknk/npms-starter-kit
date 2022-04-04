const path = require('path')
const glob = require('glob')

const env = process.env.NODE_ENV
const isProduction = env === 'production'
const currentEnv = env || 'development'

/* WIP */
const dir = {
  src: `./src/`,
  dest: `./dist/`,
}

const cwd = {
  templates: `${dir.src}templates`,
  styles: `${dir.src}styles`,
  scripts: `${dir.src}scripts`,
  images: `${dir.src}images`,
  statics: `${dir.src}statics`
}

const paths = {
  templates: {
    src: `${cwd.templates}/**/*`,
    dest: `${dir.dest}`,
  },
  styles: {
    src: `${cwd.styles}/**/*`,
    dest: `${dir.dest}`,
    others: {
      fSrc: `${cwd.styles}/functions`
    }
  },
  scripts: {
    src: `${cwd.scripts}/**/*`,
    dest: `${dir.dest}`,
  },
  images: {
    src: `${cwd.images}/**/*`,
    dest: `${dir.dest}`,
  },
  statics: {
    src: `${cwd.statics}/**/*`,
    dest: `${dir.dest}`,
  }
}

const methods = {
  getFileData: (_name, _cwd) => {
    const name = _name.replace(/\.[^/.]+$/, '')
    const fullpath = path.resolve(_cwd, name)
    return { name, fullpath }
  },
  transformObject2Array: (object) => {
    return Object.keys(object).map(function (key) {return object[key]})
  }
}

const tasks = {
  templates: {
    ...paths.templates,
    ext: 'html'
  },
  styles: {
    ...paths.styles,
    ext: 'css',
    methods: {
      getFunctions: () => {
        let modules = []
        const entries = glob.sync('**/*.*', {
          cwd: paths.styles.others.fSrc
        }).map((key) => {
          const data = methods.getFileData(key, paths.styles.others.fSrc)
          modules.push(require(data.fullpath))
          return methods.transformObject2Array(data)
        })
        let funcs = {}
        modules.forEach((func) => {
          Object.keys(func).forEach((name) => {
            funcs[name] = func[name]
          })
        })
        return funcs
      }
    }
  },
  scripts: {
    ...paths.scripts,
    ext: 'js',
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
  images: {
    ...paths.images,
  },
  statics: {
    ...paths.statics,
  }
}

module.exports = {
  isProduction,
  currentEnv,

  methods,

  dir,
  tasks
}
