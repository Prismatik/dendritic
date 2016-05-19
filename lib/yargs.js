const _ = require('lodash');
const yargs = require('yargs');
const pluralize = require('pluralize');

const VALID_NAME = /^([A-Z]|[a-z]|[0-9]|_)+$/;
const ERR_NAME = 'Name input must only contain letters, numbers and underscores';

let opts = yargs.argv;
opts.command = opts._[0];
opts.arg1 = opts._[1];
opts.path = process.cwd();

// reformat redbeard user xyz into redbeard model xyz
if (opts.command === 'user') {
  opts.command = 'model';
  opts.isUser = true;
  if (!opts._[1]) opts._[1] = 'user';
}

opts = setNames(opts, opts._[1]);

if (!VALID_NAME.test(opts.name)) {
  console.log('Error: ', ERR_NAME);
  process.exit(1);
}

// reformat relationships into a format usable within mustache (an obj array)
if (opts.s || opts.m) {
  opts.hasRelationships = true;
  const relationships = _.compact([opts.s, opts.m]).join(',');
  opts.relationships = setNamesArray(relationships.split(','));

  if (opts.s) {
    opts.hasSingularRelationships = true;
    opts.singularRelationships = setNamesArray(opts.s.split(','));
    delete opts.s;
  }
  if (opts.m) {
    opts.hasMultiRelationships = true;
    opts.multiRelationships = setNamesArray(opts.m.split(','));
    delete opts.m;
  }
}

opts = _.omit(opts, ['_', '$0']);

console.log('opts are', opts);
module.exports = opts;

function setNamesArray(array) {
  return array.map((name, index) => {
    const obj = setNames({}, name);
    obj.isLast = (index === array.length - 1);
    return obj;
  });
}

function setNames(obj, name) {
  obj.fileName = name.toLowerCase();
  obj.projectName = pluralize(obj.fileName);
  obj.dbName = obj.projectName;
  obj.tableName = obj.projectName;
  obj.name = _.camelCase(obj.fileName);
  obj.pluralName = pluralize(obj.name);
  return obj;
}
