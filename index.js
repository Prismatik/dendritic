#!/usr/bin/env node
const path = require('path');
const opts = require('./lib/yargs');

const doer = require(path.resolve(__dirname, opts.command))(opts);
