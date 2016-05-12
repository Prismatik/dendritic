const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const mustache = require('mustache');

// opts should include
// .files - an array of files objects to create, obj can have the following properties...
//   p: source path, n: filename
//   d: destination path, t: target filename, e: target extension
// .basePath - the root folder in which these files reside
// .mustacheOpts - any options to pass to mustache when rendering i.e. pluralName
module.exports = function scaffold(opts) {
  const files = opts.files.map(addDefaults);
  files.forEach(createFile(opts.basePath, opts.mustacheOpts));
};

// takes a .mustache file and renders this to a target folder with a given
// filename and file extension
function createFile(basePath, mustacheOpts) {
  return (file) => {
    const templatePath = path.join(basePath, file.p, `${file.n}.mustache`);
    const template = fs.readFileSync(templatePath).toString();

    const dir = path.join(process.cwd(), file.d);
    const target = path.join(dir, file.t + (!file.e ? '' : `.${file.e}`));
    const shortTarget = target.replace(process.cwd(), '.');
    console.log('writing', file.n, 'to', shortTarget);
    if (fs.existsSync(target)) return console.error(target, 'already exists. Not overwriting it');

    mkdirp.sync(dir);
    const rendered = mustache.render(template, mustacheOpts);
    return fs.writeFileSync(target, rendered);
  };
}

function addDefaults(file) {
  return _.extend({ p: '', d: file.p || '', t: file.n, e: 'js' }, file);
}
