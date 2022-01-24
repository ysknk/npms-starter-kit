#!/usr/bin/env node
"use strict";

const iconv = require('iconv-lite');
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
  .option('from', {
    description: 'Encode From',
    default: 'utf-8',
    demandOption: false
  })
  .option('to', {
    description: 'Encode To',
    default: 'sjis',
    demandOption: false
  })
  .option('ext', {
    alias: 'e',
    description: 'Target Extention',
    // default: ''
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
  const filepath = path.resolve(argv.dest, `${filename}${argv.ext}`);

  fs.readFile(filepath, (err, data) => {
    // if (err) { throw err }
    if (err) { return }
    const contents = iconv.decode(data, argv.from);
    const encodeContents = iconv.encode(contents, argv.to);
    const result = new Buffer.from(encodeContents);
    fs.writeFile(filepath, result, (err, data) => {
      // if (err) { throw err }
      console.log('encode: ' + filepath);
    });
  })
});
