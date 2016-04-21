const _ = require('lodash');
const scaffold = require('../lib/scaffold');

module.exports = () => {
  const files = [
    {p: 'middleware', n: 'cors'},
    {p: 'tests/middleware', n: 'cors'}
  ].map(file => _.extend({p: '', d: file.p || '', t: file.n, e: 'js'}, file));

  files.forEach(scaffold({}, __dirname));
};
