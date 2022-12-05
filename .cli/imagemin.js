#!/usr/bin/env node
"use strict";

const imagemin = require('imagemin-keep-folder');
const yargs = require('yargs');
const path = require('path');

const argv = yargs(process.argv.slice(2))
  .option('cwd', {
    alias: 'c',
    description: 'Current Working Directory',
    default: '',
    demandOption: false
  })
  .option('src', {
    alias: 's',
    description: 'Source Directory',
    demandOption: true
  })
  .option('dest', {
    alias: 'd',
    description: 'Dest Directory',
    demandOption: true
  })
  .option('obj', {
    alias: 'o',
    description: 'JavaScript options file',
    default: '.imageminrc.js',
    demandOption: true
  })
  .help()
  .argv;

const options = require(path.resolve(argv.obj));

imagemin([argv.src], {
  plugins: options.plugins,
  replaceOutputDir: output => {
    const dest = output.replace(argv.cwd, argv.dest);
    console.log('imagemin: ' + dest);
    return dest;
  }
}).then(() => {
  console.log('images optimized');
});

