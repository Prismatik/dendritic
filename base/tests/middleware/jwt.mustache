const test = require('blue-tape');
const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');

const token = jwt.sign({hello: 'world'}, process.env.JWT_SECRET);

const url = 'http://localhost:'+process.env.PORT+'/jwt/verify';

const assertOk = (t) => {
  return (res) => {
    return t.ok(res.ok, 'statusCode is 2xx');
  }
};

const assert401 = (t) => {
  return (res) => {
    return t.equal(res.status, 401, 'statusCode is 401');
  }
};

test('a GET with a valid bearer token should return 200', (t) => {
  return fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer '+token
    }
  })
  .then(assertOk(t));
});

test('a GET with an invalid bearer token should return 401', (t) => {
  return fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer foo'
    }
  })
  .then(assert401(t));
});

test('a GET with a valid querystring token should return 200', (t) => {
  return fetch(url+'?jwt='+token, {
    method: 'GET'
  })
  .then(assertOk(t));
});

test('a GET with an invalid querystring token should return 401', (t) => {
  return fetch(url+'?jwt=foo', {
    method: 'GET'
  })
  .then(assert401(t));
});
