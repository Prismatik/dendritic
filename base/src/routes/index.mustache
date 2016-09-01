const _ = require('lodash');
const { Router } = require('express');
const util = require('../utils/module');

const routes = util.slurp('src/routes');

const router = module.exports = new Router();

router.sockets = [];

Object.keys(routes).forEach(name => {
  const path = `/${_.kebabCase(name)}`;
  const route = routes[name];

  router.use(path, route);

  if (route.socket) {
    router.sockets.push({ path, handler: route.socket });
  }
});
