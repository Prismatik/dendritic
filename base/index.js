const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const scaffold = require('../lib/scaffold');

module.exports = (opts) => {
  // p: source path, n: filename
  // d: destination path, t: target filename, e: target extension
  const files = [
    {p: 'bin', n: 'migration'},
    {p: 'bin', n: 'migrate'},
    {p: 'bin', n: 'migration_template', e: 'mustache'},
    {p: 'bin', n: 'migration_template_test', e: 'mustache'},
    {p: 'env', n: 'base'},
    {p: 'env', n: 'db'},
    {n: 'dotenv', t: 'example.env', e: ''},
    {p: 'lib', n: 'db'},
    {p: 'lib', n: 'migrate'},
    {n: 'index'},
    {n: 'package', e: 'json'},
    {n: 'schema'},
    {n: 'setup'},
    {n: 'start'},
    {p: 'middleware', n: 'jwt'},
    {p: 'middleware', n: 'cors'},
    {p: 'routes', n: 'schema'},
    {p: 'tables', n: 'migrations'},
    {p: 'test', n: 'helper'},
    {p: 'test', n: 'mocha.opts', t: 'mocha', e: 'opts'},
    {p: 'test/middleware', n: 'jwt_test'},
    {p: 'test/routes', n: 'schema_test'},
    {n: '.gitignore', e: ''}
  ];

  scaffold({ basePath: __dirname, files: files, mustacheOpts: opts });

  const dirs = [
    'env',
    'routes',
    'migrations',
    'schemas'
  ].forEach(dir => mkdirp.sync(dir));

  const modulesDir = path.join(process.cwd(), 'node_modules');
  if (!fs.existsSync(modulesDir)) mkdirp.sync(modulesDir);
  const target = path.join(modulesDir, 'root');
  if (!fs.existsSync(target)) fs.symlinkSync('..', target);
};
