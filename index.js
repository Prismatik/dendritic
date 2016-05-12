#!/usr/bin/env node
const path = require('path');
const opts = require('./lib/yargs');

require(path.resolve(__dirname, opts.command))(opts);
