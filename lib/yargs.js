const _ = require('lodash');
const toPascalCase = require('to-pascal-case');
const pluralize = require('pluralize');
const yargs = require('yargs');
const log = require('loglevel');

const VALID_NAME = /^([A-Z]|[a-z]|[0-9]|_)+$/;
const ERR_NAME = 'Name input must only contain letters, numbers and underscores';

let opts = yargs.argv;
opts.command = opts._[0];
opts.arg1 = opts._[1];
opts.path = process.cwd();

// reformat redbeard user xyz into redbeard resource xyz
if (opts.command === 'user') {
  opts.command = 'resource';
  opts.isUser = true;
  if (!opts.arg1) opts.arg1 = 'user';
}

// scaffolding migrations does not require first argument
if (opts.command !== 'migration') {
  opts = setNames(opts, opts.arg1);

  if (!VALID_NAME.test(opts.camelCase)) {
    log.error('Error: ', ERR_NAME);
    process.exit(1);
  }
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

log.info('opts are', opts);
module.exports = opts;

function setNamesArray(array) {
  return array.map((name, index) => {
    const obj = setNames({}, name);
    obj.isLast = (index === array.length - 1);
    return obj;
  });
}

function setNames(obj, originalName) {
  const name = originalName.toLowerCase();
  obj.snakeCase = _.snakeCase(name);
  obj.snakeCasePlural = pluralize(obj.snakeCase);
  obj.camelCase = _.camelCase(name);
  obj.camelCasePlural = pluralize(obj.camelCase);
  obj.kebabCase = _.kebabCase(name);
  obj.kebabCasePlural = pluralize(obj.kebabCase);
  obj.pascalCase = toPascalCase(name);
  obj.pascalCasePlural = pluralize(obj.pascalCase);
  return obj;
}
