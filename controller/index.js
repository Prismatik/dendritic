const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const mustache = require('mustache');
const _ = require('lodash');

module.exports = (name, pluralName) => {
  const opts = {
    pluralName: pluralName,
    name: name
  };

  console.log('opts are', opts);

  const things = [
    // n: name, p: path, e: extension, t: target filename
    {n: 'lib/controller'},
    {n: 'lib/rethinkdb'},
    {n: 'lib/schema'},
    {n: 'controller', p: 'controllers', t: name},
    {n: 'test', p: 'tests/controllers', t: name},
    {n: 'route', p: 'routes', t: name},
    {n: 'table', p: 'tables', t: name},
    {n: 'fixture', p: 'fixtures', t: name},
    {n: 'schema', p: 'schemas', e: 'json', t: name},
  ].map(thing => _.extend({p: '', e: 'js', t: thing.n}, thing));

  things.forEach(thing => {
    const template = fs.readFileSync(__dirname + '/'+thing.n+'.mustache').toString();
    const dir = path.join(process.cwd(), thing.p);
    const target = path.join(dir, thing.t+'.'+thing.e);
    console.log('writing', thing.n, 'to', target);
    if (fs.existsSync(target)) return console.error(target, 'already exists. Not overwriting it');

    mkdirp.sync(dir);
    const rendered = mustache.render(template, opts);
    fs.writeFileSync(target, rendered);
  });
};
