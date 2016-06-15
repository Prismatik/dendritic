#!/usr/bin/env node
const path = require('path');
const opts = require('./lib/yargs');
const captainsLog = require('./lib/captains_log');
const log = require('loglevel');

log.setLevel(process.env.REDBEARD_LOG_LEVEL || 'info');

captainsLog(process.argv);
require(path.resolve(__dirname, opts.command))(opts);
