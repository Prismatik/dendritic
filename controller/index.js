const _ = require('lodash');
const scaffold = require('../lib/scaffold');

module.exports = (opts) => {
  const files = [
    // p: source path, n: filename
    // d: destination path, t: target filename, e: target extension
    {p: 'lib', n: 'controller'},
    {p: 'lib', n: 'rethinkdb'},
    {p: 'lib', n: 'schema'},
    {p: 'tests/lib', n: 'controller'},
    {p: 'tests/lib', n: 'rethinkdb'},
    {n: 'controller', d: 'controllers', t: opts.name},
    {n: 'test', d: 'tests/controllers', t: opts.name},
    {n: 'route', d: 'routes', t: opts.name},
    {n: 'table', d: 'tables', t: opts.name},
    {n: 'fixture', d: 'fixtures', t: opts.name},
    {n: 'schema', d: 'schemas', t: opts.name, e: 'json'},
  ].map(thing => _.extend({p: '', d: thing.p || '', t: thing.n, e: 'js'}, thing));

  files.forEach(scaffold(opts, __dirname));
};
