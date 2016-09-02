const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const scaffold = require('../lib/scaffold');

module.exports = (opts) => {
  // p: source path, n: filename
  // d: destination path, t: target filename, e: target extension
  const files = [
    { p: 'bin', n: 'server', e: '' },
    { p: 'bin', n: 'seed', e: '' },
    { p: 'config', n: 'index' },
    { p: 'config', n: 'thinky' },
    { p: 'config', n: 'schema' },
    { p: 'config', n: 'env' },
    { p: 'config/schemas', n: 'index' },
    { p: 'config/schemas', n: 'definitions', e: 'json' },
    { n: 'Dockerfile', e: '' },
    { n: 'docker-compose', e: 'yml' },
    { n: 'dotenv', t: 'example.env', e: '' },
    { p: 'src/utils', n: 'module' },
    { p: 'src/utils', n: 'logger' },
    { p: 'src', n: 'app' },
    { n: 'package', e: 'json' },
    { p: 'src/routes', n: 'jwt' },
    { p: 'src/routes', n: 'schema' },
    { p: 'src/routes', n: 'index' },
    { p: 'src/middleware', n: 'index' },
    { p: 'src/middleware', n: 'http_errors' },
    { p: 'src/middleware', n: 'auth' },
    { p: 'src/middleware', n: 'access_log' },
    { p: 'test', n: 'helper' },
    { p: 'test', n: 'mocha.opts', t: 'mocha', e: 'opts' },
    { p: 'test/routes', n: 'jwt_test' },
    { p: 'test/routes', n: 'schema_test' },
    { n: '.gitignore', e: '' },
    { n: '.eslintrc', e: '' }
  ];

  scaffold({ basePath: __dirname, files, mustacheOpts: opts });
  fs.chmodSync(`${process.cwd()}/bin/server`, '0744');
  fs.chmodSync(`${process.cwd()}/bin/seed`, '0744');

  const modulesDir = path.join(process.cwd(), 'node_modules');
  if (!fs.existsSync(modulesDir)) mkdirp.sync(modulesDir);
};
