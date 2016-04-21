const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const mustache = require('mustache');

// takes a .mustache file and renders this to a target folder with a given
// filename and file extension
module.exports = (mustacheOpts, basePath) => file => {
  // 'file' properties
  // p: source path, n: filename
  // d: destination path, t: target filename, e: target extension
  const templatePath = path.join(basePath, file.p, file.n+'.mustache');
  const template = fs.readFileSync(templatePath).toString();

  const dir = path.join(process.cwd(), file.d);
  const target = path.join(dir, file.t+'.'+file.e);

  if (fs.existsSync(target)) return console.error(target, 'already exists. Not overwriting it');

  mkdirp.sync(dir);
  const rendered = mustache.render(template, mustacheOpts);
  fs.writeFileSync(target, rendered);
};
