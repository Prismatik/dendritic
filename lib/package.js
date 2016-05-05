const fs = require('fs');
const _ = require("lodash");

// add dependencies to an already generated package.json file
exports.addDependencies = function(newDependencies) {
  const packagePath = process.cwd() + '/package.json';
  const package = JSON.parse(fs.readFileSync(packagePath));
  const updated = _.merge(package, {dependencies: newDependencies});
  fs.writeFileSync(packagePath, JSON.stringify(updated));
};
