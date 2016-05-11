const fs = require('fs');
const _ = require('lodash');

// add dependencies to an already generated package.json file
exports.addDependencies = function addDependencies(packagePath, newDependencies) {
  const pkg = JSON.parse(fs.readFileSync(packagePath));
  const updated = _.merge(pkg, { dependencies: newDependencies });
  fs.writeFileSync(packagePath, JSON.stringify(updated, null, 2));
};
