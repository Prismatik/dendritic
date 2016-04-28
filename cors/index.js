const scaffold = require('../lib/scaffold');


module.exports = (opts) => {
  // p: source path, n: filename
  // d: destination path, t: target filename, e: target extension
  const files = [
    {p: 'middleware', n: 'cors'},
    {p: 'test/middleware', n: 'cors_test'}
  ];

  scaffold({ basePath: __dirname, files: files, mustacheOpts: opts });
};
