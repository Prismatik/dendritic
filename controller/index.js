const fs = require('fs');
const _ = require("lodash");
const scaffold = require('../lib/scaffold');

const userPackageJson = {
  "dependencies": {
    "password": "git+https://github.com/Prismatik/password.git"
  }
};

module.exports = (opts) => {
  // p: source path, n: filename
  // d: destination path, t: target filename, e: target extension
  const files = [
    {p: 'lib', n: 'controller'},
    {p: 'lib', n: 'rethinkdb'},
    {p: 'lib', n: 'schema'},
    {n: 'controller', d: 'controllers', t: opts.name},
    {n: 'test', d: 'test/controllers', t: opts.name+'_test'},
    {n: 'route', d: 'routes', t: opts.name},
    {n: 'table', d: 'tables', t: opts.name},
    {n: 'fixture', d: 'fixtures', t: opts.name},
    {n: 'schema', d: 'schemas', t: opts.name, e: 'json'},
  ];

  if (opts.isUser) {
    // if user is scaffolded, add user specific dependencies
    const package = JSON.parse(fs.readFileSync('package.JSON'));
    const updated = _.merge(package, userPackageJson);
    fs.writeFileSync('package.json', JSON.stringify(updated));

    // if user is scaffolded, jwt lib required
    files.push({p: 'lib', n: 'jwt'});
  };

  scaffold({ basePath: __dirname, files: files, mustacheOpts: opts });
};
