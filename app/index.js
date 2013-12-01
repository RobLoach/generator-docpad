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
        'docpad.coffee',
        'docpad.cson',
        'docpad.js',
        'docpad.json'
      ],
      default: 'docpad.coffee'
    },
    {
      type: 'list',
      name: 'license',
      message: 'License',
      choices: [
        'MIT',
        'Apache-2.0',
        'BSD-2-Clause',
        'BSD-3-Clause',
        'GPL-2.0',
        'GPL-3.0',
        'LGPL-2.1',
        'LGPL-3.0'
      ],
      default: 'MIT'
    },
    {
      type: 'checkbox',
      name: 'features',
      message: 'Features',
      choices: [
        {
          name: 'Bower',
          value: 'bower',
          checked: false
        },
        {
          name: 'Grunt',
          value: 'grunt',
          checked: false
        }
      ]
    }
  ];

  this.prompt(prompts, function (answers) {
    this.docpadFile = answers.docpadFile;
    this.license = answers.license;
    var features = answers.features;

    function hasFeature(feat) { return features.indexOf(feat) !== -1; }

    this.bower = hasFeature('bower');
    this.grunt = hasFeature('grunt');

    cb();
  }.bind(this));
};

DocPadGenerator.prototype.app = function app() {
  this.mkdir('src');
  this.mkdir('src/documents');
  this.mkdir('src/files');
  this.mkdir('src/layouts');

  this.template('_package.json', 'package.json');
  this.template('README.md', 'README.md');
};

DocPadGenerator.prototype.projectfiles = function projectfiles() {
  // DocPad configuration file.
  this.copy(this.docpadFile, this.docpadFile);

  // .editorconfig
  this.copy('editorconfig', '.editorconfig');

  // Grunt.

  // Bower.
  if (this.bower) {
    this.template('bower.json', 'bower.json');
  }

  // License.
  this.template('LICENSE-' + this.license + '.md', 'LICENSE.md');
};

DocPadGenerator.prototype.grunt = function grunt() {
  if (this.grunt) {
    this.template('Gruntfile.coffee', 'Gruntfile.coffee');
  }
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
