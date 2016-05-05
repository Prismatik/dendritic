const _ = require('lodash');
const yargs = require('yargs');
const pluralize = require('pluralize');

const VALID_NAME = /^([A-Z]|[a-z]|[0-9]|_)+$/;
const ERR_NAME = 'Name input must only contain letters, numbers and underscores';

var opts = yargs.argv;
opts.command = opts._[0];
opts.name = opts._[1];

// reformat redbeard user xyz into redbeard controller xyz
if (opts.command === 'user') {
  opts.command = 'controller';
  opts.isUser = true;
  if (opts.name == null) opts.name = 'user';
}

if (!VALID_NAME.test(opts.name)) {
  console.log('Error: ', ERR_NAME);
  process.exit(1);
}
opts.pluralName = opts.name ? pluralize(opts.name) : null;

// reformat relationships into a format usable within mustache (an obj array)
if (opts.s || opts.m) {
  opts.hasRelationships = true;
  const relationships = _.compact([opts.s, opts.m]).join(',');
  opts.relationships = pluralizeArray(toArray(relationships, "name"));

  if (opts.s) {
    opts.hasSingularRelationships = true;
    opts.singularRelationships = pluralizeArray(toArray(opts.s, "name"));
    delete opts.s;
  }
  if (opts.m) {
    opts.hasMultiRelationships = true;
    opts.multiRelationships = pluralizeArray(toArray(opts.m, "name"));
    delete opts.m;
  }
}

opts = _.omit(opts, ['_', '$0']);

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

// add the pluralName using the 'name' field to an array of objects
function pluralizeArray(array) {
  return array.map(function(obj) {
    obj.pluralName = pluralize(obj.name);
    return obj;
  });
}
