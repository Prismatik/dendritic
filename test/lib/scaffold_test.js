const fs = require("fs");
const rimraf = require("rimraf");
const scaffold = require("../../lib/scaffold");

const sourcePath = process.cwd() + "/test/files/lib";
const outputPath = "/redbeard_tests/redbeard";

describe("lib/scaffold", function() {
  describe(".scaffold", function() {
    afterEach(function() {
      rimraf.sync(process.cwd() + outputPath);
    });

    it("must create destination folder", function() {
      scaffold({
        basePath: sourcePath,
        files: [{n: "scaffold", d: outputPath}],
        mustacheOpts: {}
      });
      
      const folder= fs.lstatSync(process.cwd() + outputPath);
      folder.isDirectory().must.be.true();
    });

    it("must create target file", function() {
      scaffold({
        basePath: sourcePath,
        files: [{n: "scaffold", d: outputPath}],
        mustacheOpts: {}
      });
      
      const folder = fs.lstatSync(process.cwd() + outputPath + "/scaffold.js");
      folder.isDirectory().must.be.false();
    });

    it("must render .mustache template", function() {
      const mustacheOpts = {
        header: "Colors",
        items: [
            {name: "red", first: true, url: "#Red"},
            {name: "green", link: true, url: "#Green"},
            {name: "blue", link: true, url: "#Blue"}
        ],
        empty: false
      };

      scaffold({
        basePath: sourcePath,
        files: [{n: "scaffold", d: outputPath}],
        mustacheOpts: mustacheOpts
      });

      var expected = '<h1>Colors</h1>\n';
      expected += '\n';
      expected += '    <li><strong>red</strong></li>\n';
      expected += '    <li><a href="#Green">green</a></li>\n';
      expected += '    <li><a href="#Blue">blue</a></li>\n';
      expected += '\n';
      
      const file = fs.readFileSync(process.cwd() + outputPath + "/scaffold.js", "utf-8");
      file.must.equal(expected);
    });
  });
});

