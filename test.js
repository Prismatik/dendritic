const spawn = require('child_process').spawnSync;
const bandname = require("bandname");
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const path = require('path');
const os = require('os');

const randomstring = () => bandname().replace(' ', '_').replace(/-/g, '_');

var dir;
if (process.env.SLOW_TEST) {
  dir = path.join(os.tmpdir(), 'claytons_tests', randomstring());
} else {
  dir = path.join(__dirname, 'tests', randomstring());
}

mkdirp.sync(dir);

const opts = {cwd: dir, stdio: 'inherit'};
const index = path.join(__dirname, 'index.js');

const appName = 'claytons_test_'+randomstring();
const controllerName = randomstring();


spawn('node', [index, 'base', appName, appName+'s'], opts);
spawn('node', [index, 'controller', controllerName, controllerName+'s'], opts);
if (process.env.SLOW_TEST) spawn('npm', ['install'], opts);
spawn('npm', ['test'], opts);

rimraf.sync(dir);
