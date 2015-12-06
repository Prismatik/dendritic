const spawn = require('child_process').spawnSync;
const bandname = require("bandname");
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');

const randomstring = () => bandname().replace(' ', '_').replace(/-/g, '_');

const dir = './tests/'+randomstring();
mkdirp.sync(dir);

const opts = {cwd: dir, stdio: 'inherit'};

const appName = 'claytons_test_'+randomstring();
const controllerName = randomstring();

spawn('node', ['../../index.js', 'base', appName, appName+'s'], opts);
spawn('node', ['../../index.js', 'controller', controllerName, controllerName+'s'], opts);
spawn('npm', ['test'], opts);

rimraf.sync(dir);
