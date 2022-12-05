#!/usr/bin/env node
"use strict";

const iconv = require('iconv-lite');
const yargs = require('yargs');

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const argv = yargs(process.argv.slice(2))
  .option('cwd', {
    alias: 'cwd',
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
    default: 'utf-8',// sjis
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
    default: '{**/_*,node_modules/**/*}',
    demandOption: false
  })
  .help()
  .argv;

glob.sync(argv.src, {
  ignore: argv.ignore,
  cwd: argv.cwd
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
