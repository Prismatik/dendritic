const url = require('url');
const jwt = require('jsonwebtoken');
const restify = require('restify');

const verifier = token => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return false;
  }
};

module.exports = app => {
  app.pre((req, res, next) => {
    const parsed = url.parse(req.url, true);

    // Expand this condition to match all routes you wish to protect, or to only exclude those you do not
    if (parsed.pathname !== '/jwt/verify') return next();

    if (req.header('Authorization')) {
      const token = req.header('Authorization').split('Bearer ')[1];
      if (verifier(token)) return next();
    };

    if (parsed.query.jwt) {
      if (verifier(parsed.query.jwt)) return next();
    };

    return next(new restify.errors.UnauthorizedError("Invalid JWT"));
  })

  app.get('/jwt/verify', (req, res, next) => {
    res.send(200);
    return next();
  });
}
