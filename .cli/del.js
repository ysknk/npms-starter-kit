#!/usr/bin/env node
"use strict";

const del = require('del');
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
  .option('ext', {
    alias: 'e',
    description: 'Target Extention',
    // default: ''
    demandOption: false
  })
  .option('ignore', {
    alias: 'ig',
    description: 'Ignore Directory',
    default: '**/_*',
    demandOption: false
  })
  .option('force', {
    alias: 'f',
    description: 'Allow deleting the current working directory and outside',
    default: true,
    type: 'boolean'
  })
  .option('dryRun', {
    alias: 'dry',
    description: 'List what would be deleted instead of deleting',
    type: 'boolean'
  })
  .help()
  .argv;

glob.sync(argv.src, {
  ignore: argv.ignore,
  cwd: argv.base
}).map((key) => {
  const ext = argv.ext || key.match(/\.[^/.]+$/)[0];
  const filename = key.replace(/\.[^/.]+$/, '');
  const filepath = path.resolve(argv.dest, `${filename}${ext}`);

  fs.readFile(filepath, (err, data) => {
    // if (err) { throw err }
    if (err) { return }

    (async () => {
      const files = await del(filepath, {
        force: argv.force,
        dryRun: argv.dryRun
      });

      const message = 'deleted: ';
      console.log(message + files.join('\n' + message));
    })()
  })
})
