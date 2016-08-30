/* eslint no-underscore-dangle: 'off' */
const logger = require('../utils/logger');

module.exports = (req, res, next) => {
  res.on('finish', () => {
    logger.info({
      remoteAddress: req.ip,
      method: req.method,
      url: req.originalUrl,
      protocol: req.protocol,
      hostname: req.hostname,
      httpVersion: `${req.httpVersionMajor}.${req.httpVersionMinor}`,
      userAgent: req.headers['user-agent'],
      status: res._header ? res.statusCode : undefined
    }, 'access_log');
  });
  next();
};
