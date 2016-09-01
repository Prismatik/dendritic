/* eslint global-require: 'off' */
const fs = require('fs');
const path = require('path');
const _ = require('lodash');

module.exports = {
  slurp: (filepath, ext) => {
    const fullpath = path.resolve(__dirname, '../../', filepath);
    const files = fs.readdirSync(fullpath);
    const filtered = files
      .filter(file => file !== 'index.js')
      .filter(file => (
        ext ? path.parse(file).ext === `.${ext}` : true
      ));
    return filtered.reduce((r, filename) => {
      const name = _.camelCase(path.parse(filename).name);
      r[name] = require(`${fullpath}/${filename}`);
      return r;
    }, {});
  }
};
