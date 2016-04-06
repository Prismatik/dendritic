const _ = require('lodash');
const yargs = require('yargs');
const pluralize = require('pluralize');

const VALID_NAME = /^([A-Z]|[a-z]|[0-9]|_)+$/;
const ERR_NAME = "Name input must only contain letters, numbers and underscores";

var opts = yargs.argv;
opts.command = opts._[0];

if (opts._[1] != null) opts.name = opts._[1];
if (!VALID_NAME.test(opts.name)) {
  console.log("Error: ", ERR_NAME);
  process.exit(1);
}
opts.pluralName = opts.name ? pluralize(opts.name) : null;

// reformat relationships into a format usable within mustache (an obj array)
if (opts.r != null) {
  opts.hasRelationships = true;
  var relationships = toArray(opts.r, "name");
  opts.relationships = pluralizeArray(relationships);
  delete opts.r;
}

opts = _.omit(opts, ["_", "$0"]);

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

// add the pluralName using the "name" field to an array of objects
function pluralizeArray(array) {
  return array.map(function(obj) {
    obj.pluralName = pluralize(obj.name);
    return obj;
  });
}
