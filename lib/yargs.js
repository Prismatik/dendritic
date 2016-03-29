var _ = require('lodash');

const yargs = require('yargs')
  .alias('r', 'relationships');

var opts = yargs.argv;
opts.command = opts._[0];
opts.name = opts._[1];
opts.pluralName = opts._[2];

console.log('opts are', opts);

module.exports = opts;
