const fs = require("fs");
const sinon = require('sinon');
const package = require('../../lib/package');

describe("lib/package", function() {
  describe(".addDependencies", function() {
    // copy package.json to /redbeard_tests
    beforeEach(function(done) {
      const root = process.cwd();
      const source = root + '/test/files/lib/package.json';
      const dest = root + '/redbeard_tests/package.json';
      const copyFile = fs.createReadStream(source).pipe(fs.createWriteStream(dest));
      copyFile.on('close', done);
    });

    // mock process.cwd() to redbeard_tests directory now file is copied there
    beforeEach(function() {this.sinon = sinon.sandbox.create();});
    beforeEach(function() {
      const cwd = process.cwd();
      this.sinon.stub(process, 'cwd', () => cwd + '/redbeard_tests');
    });
    afterEach(function() {this.sinon.restore();});

    it("must add dependencies to file provided", function() {
      const moduleName = 'sweet_module';
      const version = '1.0.0';

      package.addDependencies({[moduleName]: version});
      const file = fs.readFileSync(process.cwd() + '/package.json', 'utf-8');
      const json = JSON.parse(file);

      const result = json.dependencies[moduleName];
      result.must.equal(version);
    });
  });
});
