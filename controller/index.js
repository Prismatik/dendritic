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
    {s: 'controller', p: 'controllers'},
    {s: 'test', p: 'tests'},
    {s: 'route', p: 'routes'},
    {s: 'table', p: 'tables'},
    {s: 'fixture', p: 'fixtures'},
    {s: 'schema', p: 'schemas', e: 'json'},
  ].map(thing => _.extend({e: 'js'}, thing));

  things.forEach(thing => {
    const template = fs.readFileSync(__dirname + '/'+thing.s+'.mustache').toString();
    const dir = path.join(process.cwd(), thing.p);
    const target = path.join(dir, name+'.'+thing.e);
    console.log('writing', thing.s, 'to', target);
    if (fs.existsSync(target)) return console.error(target, 'already exists. Not overwriting it');

    mkdirp.sync(dir);
    const rendered = mustache.render(template, opts);
    fs.writeFileSync(target, rendered);
  });
};
