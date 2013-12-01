'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var DocPadGenerator = module.exports = function DocPadGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(DocPadGenerator, yeoman.generators.Base);

DocPadGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [
    {
      type: 'list',
      name: 'docpadFile',
      message: 'DocPad configuration file',
      choices: [
        'docpad.js',
        'docpad.json',
        'docpad.coffee',
        'docpad.cson'
      ],
      default: 'docpad.coffee'
    },
    {
      type: 'list',
      name: 'license',
      message: 'License',
      choices: [
        'Apache-2.0',
        'BSD-2-Clause',
        'BSD-3-Clause',
        'GPL-2.0',
        'GPL-3.0',
        'LGPL-2.1',
        'LGPL-3.0',
        'MIT'
      ],
      default: 'MIT'
    },
    {
      type: 'confirm',
      name: 'bower',
      message: 'Use Bower package manager?',
      default: false
    },
    {
      type: 'confirm',
      name: 'grunt',
      message: 'Use Grunt task runner?',
      default: false
    }
  ];

  this.prompt(prompts, function (props) {
    this.docpadFile = props.docpadFile;
    this.bower = props.bower;
    this.grunt = props.grunt;
    this.license = props.license;

    cb();
  }.bind(this));
};

DocPadGenerator.prototype.app = function app() {
  this.mkdir('src');
  this.mkdir('src/documents');
  this.mkdir('src/files');
  this.mkdir('src/layouts');

  this.copy('_package.json', 'package.json');
  this.copy('README.md', 'README.md');
};

DocPadGenerator.prototype.projectfiles = function projectfiles() {
  // DocPad configuration file.
  this.copy(this.docpadFile, this.docpadFile);

  // .editorconfig
  this.copy('editorconfig', '.editorconfig');

  // Grunt.
  if (this.grunt) {
    this.copy('Gruntfile.coffee', 'Gruntfile.coffee');
  }

  // Bower.
  if (this.bower) {
    this.copy('_bower.json', 'bower.json');
  }

  // License.
  this.copy('LICENSE-' + this.license + '.md', 'LICENSE.md');
};

DocPadGenerator.prototype.srcFiles = function srcFiles() {
  // All the DocPad source files.
  var files = [
    "src/documents/index.html",
    "src/files/main.css",
    "src/files/main.js",
    "src/layouts/default.html.eco"
  ];
  for (var i in files) {
    this.copy(files[i], files[i]);
  }
};
