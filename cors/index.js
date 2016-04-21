const _ = require('lodash');
const scaffold = require('../lib/scaffold');

module.exports = () => {
  const files = [
    {p: 'middleware', n: 'cors'},
    {p: 'tests/middleware', n: 'cors'}
  ].map(thing => _.extend({p: '', d: thing.p || '', t: thing.n, e: 'js'}, thing));

  files.forEach(scaffold({}, __dirname));
};
