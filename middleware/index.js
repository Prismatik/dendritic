const scaffold = require('../lib/scaffold');

module.exports = (opts) => {
  const files = [
    { p: 'middleware', n: 'template', t: opts.camelCase }
  ];

  scaffold({ basePath: __dirname, files, mustacheOpts: opts });
};
