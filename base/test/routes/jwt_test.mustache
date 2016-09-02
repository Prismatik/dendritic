const jwt = require('jsonwebtoken');
const { app } = require('../helper');
const { JWT_SECRET } = require('../../config');

const token = jwt.sign({ hello: 'world' }, JWT_SECRET);
const url = `/jwt/verify`;

describe('JWT authentication handling', () => {
  it('must accept a valid bearer token in a header', function *() {
    const response = yield app.get(url, {}, {
      Authorization: `Bearer ${token}`
    });

    response.status.must.eql(200);
  });

  it('must throw 401 for an invalid JWT bearer', function *() {
    const response = yield app.get(url, {}, {
      Authorization: 'Bearer hackhackhack'
    });

    response.status.must.eql(401);
  });

  it('must accept a valid JWT in a query string param', function *() {
    const response = yield app.get(url, { token });
    response.status.must.eql(200);
  });

  it('must reject invalid JWT in the query string params', function *() {
    const response = yield app.get(url, { token: 'hack' });
    response.status.must.eql(401);
  });
});
