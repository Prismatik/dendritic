const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const mustache = require('mustache');
const _ = require('lodash');

module.exports = (opts) => {
  const things = [
    // n: name, p: path, e: extension, t: target filename
    {n: 'lib/controller'},
    {n: 'lib/rethinkdb'},
    {n: 'lib/schema'},
    {n: 'controller', p: 'controllers', t: opts.name},
    {n: 'test', p: 'tests/controllers', t: opts.name},
    {n: 'route', p: 'routes', t: opts.name},
    {n: 'table', p: 'tables', t: opts.name},
    {n: 'fixture', p: 'fixtures', t: opts.name},
    {n: 'schema', p: 'schemas', e: 'json', t: opts.name},
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
