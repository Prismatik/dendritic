const fs = require('fs');

require('required_env')(fs.readdirSync('./env').reduce((r, file) => {
  return r.concat(require('./env/'+file));
}, []))

const restify = require('restify');

const app = restify.createServer();
const io = require('socket.io').listen(app.server);

app.use(restify.bodyParser());
app.use(restify.queryParser());

fs.readdirSync('./middleware').map(name => {
  require('./middleware/'+name)(app);
});

fs.readdirSync('./routes').map(name => {
  const route = require('./routes/'+name);
  route.http(app);
  route.ws(io);
});

process.on('unhandledRejection', function(reason, p) {
  console.error("Unhandled Rejection at: Promise ", p, " reason: ", reason);
});

module.exports = app;
