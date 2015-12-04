const fs = require('fs');
const path = require('path');

const r = require('root/lib/db');

const tables = fs.readdirSync('./tables').map(table => {
  return require(path.resolve('./tables', path.parse(table).name));
});

module.exports = () => {
  return r.dbCreate(process.env.RETHINK_NAME).run()
  .catch((err) => {
    var arr = err.message.split('\n');
    if (arr[0] === 'Database `'+process.env.RETHINK_NAME+'` already exists in:') return;
    throw err;
  })
  .then(() => {
    return Promise.all(tables.map(table => table()))
  })
};
