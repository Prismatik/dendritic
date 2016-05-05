const fs = require('fs');
const _ = require("lodash");

// add dependencies to an already generated package.json file
exports.addDependencies = function(packagePath, newDependencies) {
  const package = JSON.parse(fs.readFileSync(packagePath));
  const updated = _.merge(package, {dependencies: newDependencies});
  fs.writeFileSync(packagePath, JSON.stringify(updated, null, 2));
};
