const fs = require('fs');
const _ = require("lodash");

exports.addDependencies = function(newDependencies) {
  // if user is scaffolded, add user specific dependencies
  const packagePath = process.cwd() + '/package.json';
  const package = JSON.parse(fs.readFileSync(packagePath));
  const updated = _.merge(package, {dependencies: newDependencies});
  fs.writeFileSync(packagePath, JSON.stringify(updated));
};
