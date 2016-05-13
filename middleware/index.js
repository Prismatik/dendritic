const scaffold = require('../lib/scaffold');

module.exports = (opts) => {
  const files = [
    { p: 'middleware', n: 'template', t: opts.name }
  ];

  scaffold({ basePath: __dirname, files, mustacheOpts: opts });
};
