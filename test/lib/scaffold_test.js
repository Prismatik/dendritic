const fs = require('fs');
const rimraf = require('rimraf');
const scaffold = require('../../lib/scaffold');

const root = process.cwd();
const sourcePath = `${root}/test/files/lib`;
const outputFolder = '/redbeard_tests/redbeard';
const outputPath = `${root}/redbeard_tests/redbeard`;

describe('lib/scaffold', () => {
  afterEach(() => {
    rimraf.sync(outputPath);
  });

  it('must create destination folder', () => {
    scaffold({
      basePath: sourcePath,
      files: [{ n: 'scaffold', d: outputFolder }],
      mustacheOpts: {}
    });

    const folder = fs.lstatSync(outputPath);
    folder.isDirectory().must.be.true();
  });

  it('must create target file', () => {
    scaffold({
      basePath: sourcePath,
      files: [{ n: 'scaffold', d: outputFolder }],
      mustacheOpts: {}
    });

    const folder = fs.lstatSync(`${outputPath}/scaffold.js`);
    folder.isDirectory().must.be.false();
  });

  it('must allow specifying the target file name', () => {
    scaffold({
      basePath: sourcePath,
      files: [{ n: 'scaffold', d: outputFolder, t: 'yellowbeard' }],
      mustacheOpts: {}
    });

    const folder = fs.lstatSync(`${outputPath}/yellowbeard.js`);
    folder.isDirectory().must.be.false();
  });

  it('must allow specifying the file extension', () => {
    scaffold({
      basePath: sourcePath,
      files: [{ n: 'scaffold', d: outputFolder, e: 'html' }],
      mustacheOpts: {}
    });

    const folder = fs.lstatSync(`${outputPath}/scaffold.html`);
    folder.isDirectory().must.be.false();
  });

  it('must create file with no extension', () => {
    scaffold({
      basePath: sourcePath,
      files: [{ n: 'scaffold', d: outputFolder, e: '' }],
      mustacheOpts: {}
    });

    const file = fs.lstatSync(`${outputPath}/scaffold`);
    file.isFile().must.be.true();
  });

  it('must allow specifying the files path', () => {
    scaffold({
      basePath: process.cwd(),
      files: [{ p: 'test/files/lib', n: 'scaffold', d: outputFolder }],
      mustacheOpts: {}
    });

    const folder = fs.lstatSync(`${outputPath}/scaffold.js`);
    folder.isDirectory().must.be.false();
  });

  it('must render .mustache template', () => {
    const mustacheOpts = {
      header: 'Colors',
      items: [
          { name: 'red', first: true, url: '#Red' },
          { name: 'green', link: true, url: '#Green' },
          { name: 'blue', link: true, url: '#Blue' }
      ],
      empty: false
    };

    scaffold({
      basePath: sourcePath,
      files: [{ n: 'scaffold', d: outputFolder }],
      mustacheOpts
    });

    let expected = '<h1>Colors</h1>\n';
    expected += '\n';
    expected += '    <li><strong>red</strong></li>\n';
    expected += '    <li><a href="#Green">green</a></li>\n';
    expected += '    <li><a href="#Blue">blue</a></li>\n';
    expected += '\n';

    const file = fs.readFileSync(`${outputPath}/scaffold.js`, 'utf-8');
    file.must.equal(expected);
  });
});
