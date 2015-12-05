require('root/env.js');
const restify = require('restify');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = restify.createServer();
app.use(restify.bodyParser());
app.use(restify.queryParser());

const db = require('root/lib/db.js');

const controllers = fs.readdirSync('./routes').map(name => {
  return require(path.resolve('./routes', path.parse(name).name))(app);
});

process.on('unhandledRejection', function(reason, p) {
  console.error("Unhandled Rejection at: Promise ", p, " reason: ", reason);
});

module.exports = app;
