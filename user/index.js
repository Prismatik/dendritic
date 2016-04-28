const scaffold = require('../lib/scaffold');

module.exports = (opts) => {
  // p: source path, n: filename
  // d: destination path, t: target filename, e: target extension
  const files = [
    {p: 'schemas', n: 'user', e: 'json'}
  ];

  scaffold({ basePath: __dirname, files: files, mustacheOpts: opts });
};