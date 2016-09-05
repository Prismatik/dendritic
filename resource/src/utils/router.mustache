const { Router } = require('express');
const { nullToUndefined } = require('./helpers');

const defaultSerializer = record => Object.assign({}, record);

exports.createRouter = (controller, serialize = defaultSerializer) => {
  const router = new Router()
    .get('', function *(req, res) {
      const list = yield controller.all(req.query);
      res.json(list.map(serialize));
    })
    .get('/:id', function *(req, res) {
      const record = yield controller.find(req.params.id);
      res.json(serialize(record));
    })
    .post('', function *(req, res) {
      const record = yield controller.create(req.body);
      res.status(201).json(serialize(record));
    })
    .put('/:id', function *(req, res) {
      const record = yield controller.replace(req.params.id, req.body);
      res.json(serialize(record));
    })
    .patch('/:id', function *(req, res) {
      const replaced = nullToUndefined(req.body);
      const record = yield controller.update(req.params.id, replaced);
      res.json(serialize(record));
    })
    .delete('/:id', function *(req, res) {
      const record = yield controller.delete(req.params.id);
      res.json(serialize(record));
    });

  router.socket = function *(socket, req) {
    const { feed, count } = yield controller.watch(req.query);
    socket.emit('metadata', { count });

    feed.listen((err, event, record) => {
      if (err) throw err;
      socket.emit(event, serialize(record));
    });

    return feed;
  };

  return router;
};
