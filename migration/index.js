const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const scaffold = require('../lib/scaffold');

module.exports = (opts) => {
  // p: source path, n: filename
  // d: destination path, t: target filename, e: target extension
  const files = [
    { p: 'bin', n: 'migration' },
    { p: 'bin', n: 'migrate' },
    { p: 'bin', n: 'migration_template', e: 'mustache' },
    { p: 'bin', n: 'migration_template_test', e: 'mustache' },
    { p: 'src/utils', n: 'migrate' },
    { n: 'setup' },
    { p: 'migrations', n: 'index' }
  ];

  scaffold({ basePath: __dirname, files, mustacheOpts: opts });

  const modulesDir = path.join(process.cwd(), 'node_modules');
  if (!fs.existsSync(modulesDir)) mkdirp.sync(modulesDir);
};
