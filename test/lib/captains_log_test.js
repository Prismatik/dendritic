const fs = require('fs');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');
const captainsLog = require('../../lib/captains_log');

const root = process.cwd();
const outputPath = `${root}/dendritic_tests/`;
const logPath = `${root}/dendritic_tests/captains_log`;

describe('lib/captainsLog', () => {
  let origwd = '';
  before(() => {
    mkdirp.sync(outputPath);
    origwd = process.cwd();
    process.chdir(outputPath);
  });
  afterEach(() => {
    rimraf.sync(logPath);
  });
  after(() => {
    process.chdir(origwd);
  });

  it('must create captains_log', () => {
    fs.existsSync(logPath).must.be.false();
    captainsLog(['node', 'dendritic', 'what', 'up']);
    fs.existsSync(logPath).must.be.true();
  });

  it('must add the correct line to the log', () => {
    fs.existsSync(logPath).must.be.false();
    captainsLog(['node', 'dendritic', 'what', 'up', '-w', 'somearg']);
    fs.readFileSync(logPath).toString().must.equal('dendritic what up -w somearg\n');
  });
});
