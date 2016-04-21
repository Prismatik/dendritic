const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const mustache = require('mustache');

// 'file' properties
// p: source path, n: filename
// d: destination path, t: target filename, e: target extension
module.exports = (opts, basePath, file) => {
  const templatePath = path.join(basePath, file.p, file.n+'.mustache');
  const template = fs.readFileSync(templatePath).toString();

  const dir = path.join(process.cwd(), file.d);
  const target = path.join(dir, file.t+'.'+file.e);

  if (fs.existsSync(target)) return console.error(target, 'already exists. Not overwriting it');

  mkdirp.sync(dir);
  const rendered = mustache.render(template, opts);
  fs.writeFileSync(target, rendered);
}
