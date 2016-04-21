const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const scaffold = require('../lib/scaffold');

module.exports = (opts) => {
  const things = [
    // p: source path, n: filename
    // d: destination path, t: target filename, e: target extension
    {p: 'bin', n: 'migration'},
    {p: 'bin', n: 'migrate'},
    {p: 'bin', n: 'migration_template', e: 'mustache'},
    {p: 'bin', n: 'migration_test_template', e: 'mustache'},
    {p: 'env', n: 'base'},
    {p: 'env', n: 'db'},
    {p: 'lib', n: 'db'},
    {p: 'lib', n: 'migrate'},
    {n: 'index'},
    {n: 'package', e: 'json'},
    {n: 'schema'},
    {n: 'setup'},
    {n: 'start'},
    {n: 'test'},
    {p: 'middleware', n: 'jwt'},
    {p: 'middleware', n: 'cors'},
    {p: 'routes', n: 'schema'},
    {p: 'tables', n: 'migrations'},
    {p: 'tests/middleware', n: 'jwt'},
    {p: 'tests/routes', n: 'schema'},
  ].map(thing => _.extend({p: '', d: thing.p || '', t: thing.n, e: 'js'}, thing));

  const scaffoldFile = scaffold.bind(null, opts, __dirname);
  things.forEach(scaffoldFile);

  const dirs = [
    'env',
    'routes',
    'migrations'
  ].forEach(dir => mkdirp.sync(dir));

  const modulesDir = path.join(process.cwd(), 'node_modules');
  if (!fs.existsSync(modulesDir)) mkdirp.sync(modulesDir);
  const target = path.join(modulesDir, 'root');
  if (!fs.existsSync(target)) fs.symlinkSync('..', target);

};
