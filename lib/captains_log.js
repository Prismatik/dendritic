const fs = require('fs');

exports = module.exports = (argv) => {
  const arg = argv.slice(2);
  arg.unshift('dendritic');
  const str = `${arg.join(' ')}\n`;
  fs.appendFileSync('./captains_log', str);
};
