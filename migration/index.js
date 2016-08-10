const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const scaffold = require('../lib/scaffold');

module.exports = (opts) => {
  // p: source path, n: filename
  // d: destination path, t: target filename, e: target extension
  const files = [
    { p: 'bin', n: 'migrate', e: '' },
    { p: 'bin', n: 'migration', e: '' },
    { p: 'src/models', n: '_migration' },
    { p: 'src/utils', n: 'migrate' },
    { p: 'src/utils', n: 'migration' },
    { p: 'migrations', n: 'index' }
  ];

  scaffold({ basePath: __dirname, files, mustacheOpts: opts });

  fs.chmodSync(`${process.cwd()}/bin/migrate`, '0744');
  fs.chmodSync(`${process.cwd()}/bin/migration`, '0744');

  const modulesDir = path.join(process.cwd(), 'node_modules');
  if (!fs.existsSync(modulesDir)) mkdirp.sync(modulesDir);
};
