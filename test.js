const _ = require('lodash');
const exec = require('child_process').execSync;
const pluralize = require('pluralize');
const bandname = require('bandname');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const path = require('path');
const os = require('os');

const randomString = () => bandname().split(/[^\w]+/).slice(0, 2).join('_');
const pluralizableString = () => {
  let name;

  do {
    name = randomString();
  } while (name === pluralize(name) || name.length > 15);

  return name.toLowerCase();
};

let dir;
if (process.env.SLOW_TEST) {
  dir = path.join(os.tmpdir(), 'redbeard_tests', randomString());
} else {
  dir = path.join(__dirname, 'redbeard_tests', randomString());
}

mkdirp.sync(dir);

const opts = { cwd: dir, stdio: 'inherit' };
const index = path.join(__dirname, 'index.js');

const appName = `redbeard_tests_${randomString()}`;
const modelName1 = pluralizableString();
const modelName2 = pluralizableString();
const userName = `${pluralizableString()}_user`;

exec(['node', index, 'base', appName].join(' '), opts);
exec(['node', index, 'resource', modelName1].join(' '), opts);
exec(['node', index, 'resource', modelName2, '-s', modelName1].join(' '), opts);
exec(['node', index, 'user', userName, '-m', modelName2].join(' '), opts);
exec(['node', index, 'migration'].join(' '), opts); // eslint only
if (process.env.SLOW_TEST) exec(['npm', 'install'].join(' '), opts);
exec(['cp', 'example.env', '.env'].join(' '), opts);
exec(['npm', 'test'].join(' '), opts);
exec(['npm', 'run', 'testredbeard'].join(' '), _.omit(opts, 'cwd'));
exec(['./node_modules/.bin/eslint', './redbeard_tests/'].join(' '), _.omit(opts, 'cwd'));
exec(['npm', 'run', 'lint'].join(' '), _.omit(opts, 'cwd'));

rimraf.sync(dir);
