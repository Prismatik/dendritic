const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const mustache = require('mustache');
const _ = require('lodash');

module.exports = () => {
  const things = [
    {n: 'cors', p: 'tests/middleware'},
    {n: 'cors', p: 'middleware'}
  ].map(thing => _.extend({p: '', e: 'js'}, thing));

  things.forEach(thing => {
    const templatePath = path.join(__dirname, thing.p, thing.n+'.mustache');
    const template = fs.readFileSync(templatePath).toString();
    const dir = path.join(process.cwd(), thing.p);
    const target = path.join(dir, thing.n+'.'+thing.e);
    console.log('writing', thing.n, 'to', target);
    if (fs.existsSync(target)) return console.error(target, 'already exists. Not overwriting it');

    mkdirp.sync(dir);
    const rendered = mustache.render(template);
    fs.writeFileSync(target, rendered);
  });

};
