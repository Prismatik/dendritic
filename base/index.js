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
    // n: name, p: path, e: extension
    {n: 'db', p: 'lib'},
    {n: 'index'},
    {n: 'start'},
    {n: 'test'},
    {n: 'setup'},
    {n: 'base', p: 'env'},
    {n: 'package', e: 'json'},
    {n: 'jwt', p: 'tests/middleware'},
    {n: 'jwt', p: 'middleware'},
    {n: 'schema'},
    {n: 'schema', p: 'tests/routes'},
    {n: 'schema', p: 'routes'},
  ].map(thing => _.extend({p: '', e: 'js'}, thing));

  things.forEach(thing => {
    const templatePath = path.join(__dirname, thing.p, thing.n+'.mustache');
    const template = fs.readFileSync(templatePath).toString();
    const dir = path.join(process.cwd(), thing.p);
    const target = path.join(dir, thing.n+'.'+thing.e);
    console.log('writing', thing.n, 'to', target);
    if (fs.existsSync(target)) return console.error(target, 'already exists. Not overwriting it');

    mkdirp.sync(dir);
    const rendered = mustache.render(template, opts);
    fs.writeFileSync(target, rendered);
  });

  const dirs = [
    'env',
    'routes'
  ].forEach(dir => mkdirp.sync(dir));

  const modulesDir = path.join(process.cwd(), 'node_modules');
  if (!fs.existsSync(modulesDir)) mkdirp.sync(modulesDir);
  const target = path.join(modulesDir, 'root');
  if (!fs.existsSync(target)) fs.symlinkSync('..', target);

};
