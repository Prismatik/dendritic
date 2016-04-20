const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const mustache = require('mustache');
const _ = require('lodash');

module.exports = (opts) => {
  const things = [
    // p: source path, n: filename
    // d: destination path, t: target filename, e: target extension
    {p: 'lib', n: 'controller'},
    {p: 'lib', n: 'rethinkdb'},
    {p: 'lib', n: 'schema'},
    {p: 'tests/lib', n: 'rethinkdb'},
    {n: 'controller', d: 'controllers', t: opts.name},
    {n: 'test', d: 'tests/controllers', t: opts.name},
    {n: 'route', d: 'routes', t: opts.name},
    {n: 'table', d: 'tables', t: opts.name},
    {n: 'fixture', d: 'fixtures', t: opts.name},
    {n: 'schema', d: 'schemas', t: opts.name, e: 'json'},
  ].map(thing => _.extend({p: '', d: thing.p, t: thing.n, e: 'js'}, thing));

  things.forEach(thing => {
    const templatePath = path.join(__dirname, thing.p, thing.n+'.mustache');
    const template = fs.readFileSync(templatePath).toString();

    const dir = path.join(process.cwd(), thing.d);
    const target = path.join(dir, thing.t+'.'+thing.e);

    if (fs.existsSync(target)) return console.error(target, 'already exists. Not overwriting it');

    mkdirp.sync(dir);
    const rendered = mustache.render(template, opts);
    fs.writeFileSync(target, rendered);
  });
};
