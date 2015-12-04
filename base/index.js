const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const mustache = require('mustache');


module.exports = (name, pluralName) => {
  const opts = {
    pluralName: pluralName,
    name: name
  };

  console.log('opts are', opts);

  const things = [
    {n: 'db', p: 'lib'},
    {n: 'index', p: ''},
    {n: 'start', p: ''},
    {n: 'test', p: ''},
    {n: 'setup', p: ''},
    {n: 'env', p: ''},
  ]

  things.forEach(thing => {
    const template = fs.readFileSync(__dirname + '/'+thing.n+'.mustache').toString();
    const dir = path.join(process.cwd(), thing.p);
    const target = path.join(dir, thing.n+'.js');
    console.log('writing', thing.n, 'to', target);
    if (fs.existsSync(target)) return console.error(target, 'already exists. Not overwriting it');

    mkdirp.sync(dir);
    const rendered = mustache.render(template, opts);
    fs.writeFileSync(target, rendered);
  });

  try {
    const dir = path.join(process.cwd(), 'node_modules');
    mkdirp.sync(dir);
    fs.symlinkSync('..', path.join(dir, 'root'));
  } catch (e) {
    console.error('error creating root symlink', e);
  };
};
