const scaffold = require('../lib/scaffold');


module.exports = (opts) => {
  // p: source path, n: filename
  // d: destination path, t: target filename, e: target extension
  const files = [
    {p: 'middleware', n: 'cors'},
    {p: 'tests/middleware', n: 'cors'}
  ];

  scaffold({ basePath: __dirname, files: files, mustacheOpts: opts });
};
