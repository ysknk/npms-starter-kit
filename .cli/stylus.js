#!/usr/bin/env node
"use strict";

const stylus = require('stylus');
const nib = require('nib');
const autoprefixer = require('autoprefixer');
const yargs = require('yargs');

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const argv = yargs(process.argv.slice(2))
  .option('base', {
    alias: 'b',
    description: 'Base Directory',
    demandOption: true
  })
  .option('src', {
    alias: 's',
    description: 'Source Directory',
    demandOption: true
  })
  .option('dest', {
    alias: 'd',
    description: 'Dest Directory',
    // default: ''
    demandOption: true
  })
  .option('encode', {
    alias: 'enc',
    description: 'File String Encode',
    default: 'utf8'
  })
  .option('ext', {
    alias: 'e',
    description: 'Target Extention',
    default: '.css'
    demandOption: true
  })
  .option('ignore', {
    alias: 'ig',
    description: 'Ignore Directory',
    default: '**/_*',
    demandOption: false
  })
  .help()
  .argv;

glob.sync(argv.src, {
  ignore: argv.ignore,
  cwd: argv.base
}).map((key) => {
  const filename = key.replace(/\.[^/.]+$/, '');
  const filepath = path.resolve(argv.base, `${key}`);

  fs.readFile(filepath, argv.enc, (err, data) => {
    if (err) { return }

    stylus(data)
      .use(nib())
      .import('nib')
      .render(function(err, css){
        if (err) throw err;
        const dest = path.resolve(`${argv.dest}${filename}${argv.e}`);
        fs.mkdirSync(path.dirname(dest), { recursive: true });
        fs.writeFile(dest, css, (err, data) => {
          if (err) { throw err; }
          console.log('stylus: ' + filepath);
        });
      });
  });
});
