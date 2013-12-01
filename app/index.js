'use strict';

/**
 * Dependencies
 */
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

/**
 * DocPad Generator
 */
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
      name: 'appname',
      message: 'Project name',
      default: (this.appname) ? this.appname : 'DocPad Example'
    },
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
          name: 'Bower: Package Manager',
          value: 'bower',
          checked: false
        },
        {
          name: 'Grunt: Task Runner',
          value: 'grunt',
          checked: false
        },
        {
          name: 'Marked: Supports Markdown to HTML',
          value: 'marked',
          checked: false
        }
      ]
    }
  ];

  this.prompt(prompts, function (answers) {
    // Construct the user options.
    function hasFeature(feat) { return answers.features.indexOf(feat) !== -1; }
    this.options = {
      appname: answers.appname,
      docpadFile: answers.docpadFile,
      license: answers.license,
      bower: hasFeature('bower'),
      marked: hasFeature('marked'),
      grunt: hasFeature('grunt')
    };

    // Override any of the internal variables.
    this.appname = this.options.appname;

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
    this.template('bowerrc', '.bowerrc');
  }
};

DocPadGenerator.prototype.marked = function marked() {
  if (this.options.marked) {
    this.template('docpad/documents/marked.html.md', 'src/documents/marked.html.md');
  }
};

DocPadGenerator.prototype.docpadFiles = function docpadFiles() {
  // All the DocPad source files.
  var files = [
    "documents/index.html"
  ];
  for (var i in files) {
    this.template('docpad/' + files[i], 'src/' + files[i]);
  }

  var files = [
    "layouts/default.html.eco",
    "files/main.css",
    "files/main.js"
  ];
  for (var i in files) {
    this.copy('docpad/' + files[i], 'src/' + files[i]);
  }
};
