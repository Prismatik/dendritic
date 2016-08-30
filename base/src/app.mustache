require('express-yields');
const co = require('co');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = require('express')();
const io = require('socket.io')();
const routes = require('./routes');
const { accessLog, httpErrors } = require('./middleware');

app.use(accessLog);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(routes);

app.use(httpErrors);

module.exports = app;

// socket.io setup
app.io = io;
routes.sockets.forEach(({ path, handler }) => {
  io.of(path).on('connection', socket => {
    co(function *() {
      const feed = yield handler(socket, socket.handshake);
      socket.on('disconnect', () => feed.close());
    });
  });
});
