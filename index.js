#!/usr/bin/env node
const path = require('path');
const command = process.argv[2];

const doer = require(path.resolve(__dirname, command));

doer.apply(this, process.argv.slice(3));
