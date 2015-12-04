const path = require('path');
const command = process.argv[2];

const doer = require(path.resolve('.', command));

doer.apply(this, process.argv.slice(3));
