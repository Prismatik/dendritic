const _ = require('lodash');
const yargs = require('yargs');

var opts = yargs.argv;
opts.command = opts._[0];
if (opts._[1] != null) opts.name = opts._[1];
if (opts._[2] != null) opts.pluralName = opts._[2];
if (opts.r != null) {
  opts.hasRelationships = true;
  opts.relationships = toArray(opts.r, "relation");
}

console.log('opts are', opts);

module.exports = opts;

// reformat a string array so that this can be used in mustache templates
// isLast value can be used for determining if a comma is required
function toArray(string, name) {
  var array = string.split(',');

  return array.map((value, index) => {
    var formatted = {};
    formatted[name] = value;
    formatted.isLast = index + 1 === array.length;
    return formatted;
  });
}
