require('root/env.js');
const restify = require('restify');
const fs = require('fs');
const path = require('path');

const app = restify.createServer();
const io = require('socket.io').listen(app.server);

app.use(restify.bodyParser());
app.use(restify.queryParser());

const db = require('root/lib/db.js');

fs.readdirSync('./routes').map(name => {
  const route = require(path.resolve('./routes', path.parse(name).name));
  route.http(app);
  route.ws(io);
});

process.on('unhandledRejection', function(reason, p) {
  console.error("Unhandled Rejection at: Promise ", p, " reason: ", reason);
});

module.exports = app;
