const imageminMozjpeg = require('imagemin-mozjpeg')
const imageminPngquant = require('imagemin-pngquant')
const imageminGifsicle = require('imagemin-gifsicle')
const imageminSvgo = require('imagemin-svgo')

module.exports = {
  plugins: [
    imageminPngquant({
      quality: [0.5, 1.0]
    }),
    imageminMozjpeg({
      quality: 85,
      progressive: true
    }),
    imageminGifsicle(),
    imageminSvgo({
      plugins: [
        { removeViewBox: false }
      ]
    })
  ]
}

