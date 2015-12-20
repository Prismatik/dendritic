const test = require('blue-tape');
const fetch = require('node-fetch');

const schema = require('root/schema');

const url = 'http://localhost:'+process.env.PORT+'/schema';

const assertOk = (t) => {
  return (res) => {
    return t.ok(res.ok, 'statusCode is 2xx');
  }
};

const getJSON = (suffix) => {
  return fetch(url+suffix)
  .then(res => res.json());
};

test('GET /schema should return 200', (t) => {
  return fetch(url)
  .then(assertOk(t));
});

test('GET /schema should the full schema', (t) => {
  return getJSON('')
  .then(json => {
    t.deepEqual(json, schema);
  })
});
