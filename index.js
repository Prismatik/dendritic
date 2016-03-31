#!/usr/bin/env node
const path = require('path');
const command = process.argv[2];
const pluralize = require("pluralize");

const name = process.argv[3];
const pluralName = name ? pluralize(name) : null

const doer = require(path.resolve(__dirname, command));
doer(name, pluralName);
