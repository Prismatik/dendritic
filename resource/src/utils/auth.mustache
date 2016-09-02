const jwt = require('jsonwebtoken');
const password = require('simple-password');
const { HASH_ROUNDS, JWT_SECRET } = require('../../config');

exports.createToken = function (data, expires) {
  return jwt.sign(data, JWT_SECRET, expires);
};

exports.verifyToken = function (token, opts = {}) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, opts, (err, decoded) => {
      if (err) return reject(err);
      return resolve(decoded);
    });
  });
};

exports.hashPassword = function *(params) {
  return Object.assign({}, params, params.password ? {
    password: yield password.create(params.password, HASH_ROUNDS)
  } : {});
};

exports.verifyPassword = function *(one, another) {
  return yield password.verify(one, another);
};
