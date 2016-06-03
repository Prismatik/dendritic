#!/usr/bin/env node
const path = require('path');
const opts = require('./lib/yargs');
const log = require('loglevel');

log.setLevel(process.env.REDBEARD_LOG_LEVEL || 'info');

require(path.resolve(__dirname, opts.command))(opts);
