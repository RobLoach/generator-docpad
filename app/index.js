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

  // Prompt the user for some input.
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
    // Construct the user options.
    function hasFeature(feat) { return answers.features.indexOf(feat) !== -1; }
    this.options = {
      docpadFile: answers.docpadFile,
      license: answers.license,
      bower: hasFeature('bower'),
      grunt: hasFeature('grunt')
    };

    cb();
  }.bind(this));
};

DocPadGenerator.prototype.app = function app() {
  // Directory structure.
  this.mkdir('src');
  this.mkdir('src/documents');
  this.mkdir('src/files');
  this.mkdir('src/layouts');

  // package.json
  this.template('_package.json', 'package.json');

  // DocPad configuration file.
  this.copy(this.options.docpadFile, this.options.docpadFile);
};

DocPadGenerator.prototype.projectfiles = function projectfiles() {
  // .editorconfig
  this.copy('editorconfig', '.editorconfig');

  // .gitignore
  this.copy('gitignore', '.gitignore');
};

DocPadGenerator.prototype.documentation = function documentation() {
  // Readme
  this.template('README.md', 'README.md');

  // License.
  this.template('LICENSE-' + this.options.license + '.md', 'LICENSE.md');
};

DocPadGenerator.prototype.grunt = function grunt() {
  if (this.options.grunt) {
    this.template('Gruntfile.coffee', 'Gruntfile.coffee');
  }
};

DocPadGenerator.prototype.bower = function bower() {
  if (this.options.bower) {
    this.template('_bower.json', 'bower.json');
    this.template('.bowerrc', '.bowerrc');
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
