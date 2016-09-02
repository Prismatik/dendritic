const url = require('url');
const thinky = require('thinky');
const { NODE_ENV, RETHINKDB_URL } = require('./env');

const rethinkdb = url.parse(RETHINKDB_URL);
const params = {
  host: rethinkdb.hostname,
  port: rethinkdb.port,
  db: rethinkdb.pathname.substr(1)
};

if (NODE_ENV === 'test') {
  params.db += '_test';
}

module.exports = thinky(params);
