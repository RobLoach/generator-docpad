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
  // Pass the constructor arguments over to the base class.
  yeoman.generators.Base.apply(this, arguments);

  // When finished installing, install the dependencies with npm.
  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  // Load the package.json information.
  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '..', 'package.json')));

  // Set the source root to the template directory.
  this.sourceRoot(path.join(__dirname, '..', 'templates'));
};

util.inherits(DocPadGenerator, yeoman.generators.Base);

/**
 * Ask the user for their scaffolding information.
 */
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
      name: 'renderers',
      message: 'Renderers',
      choices: [
        {
          name: 'CoffeeScript: Supports CoffeeScript to JavaScript',
          value: 'coffeescript',
          checked: false
        },
        {
          name: 'Eco: Supports Eco to anything',
          value: 'eco',
          checked: true
        },
        {
          name: 'Jade: Supports Jade to anything',
          value: 'eco',
          checked: false
        },
        {
          name: 'LESS: Supports LESS to CSS',
          value: 'less',
          checked: false
        },
        {
          name: 'Stylus: Supports Stylus to CSS',
          value: 'stylus',
          checked: false
        },
        {
          name: 'Marked: Supports Markdown to HTML',
          value: 'marked',
          checked: false
        }
      ]
    },
    {
      type: 'checkbox',
      name: 'helpers',
      message: 'Helpers',
      choices: [
        {
          name: 'Bower: Package Manager',
          value: 'bower',
          checked: false
        },
        {
          name: 'Cachr: Cache remote URLs locally',
          value: 'cachr',
          checked: false
        },
        {
          name: 'Grunt: Task Runner',
          value: 'grunt',
          checked: false
        },
        {
          name: 'Live Reload: Automatically reloads the page when regenerating',
          value: 'livereload',
          checked: true
        },
        {
          name: 'Moment: Date formatting and access to Moment.js library',
          value: 'moment',
          checked: false
        },
        {
          name: 'Webpack: Bundle CommonJs/AMD/Labeled modules with webpack',
          value: 'webpack',
          checked: false
        }
      ]
    },
    {
      type: 'checkbox',
      name: 'deployers',
      message: 'Deployers',
      choices: [
        {
          name: 'GitHub Pages: Deploy to GitHub Pages',
          value: 'ghpages',
          checked: false
        },
        {
          name: 'Sunny: Deploy to AWS or Google Storage',
          value: 'ghpages',
          checked: false
        }
      ]
    }
  ];

  // Ask the user the questions.
  this.prompt(prompts, function (answers) {
    // Construct the user options.
    function hasRenderer(feat) { return answers.renderers.indexOf(feat) !== -1; }
    function hasHelper(feat) { return answers.helpers.indexOf(feat) !== -1; }
    function hasDeployer(feat) { return answers.deployers.indexOf(feat) !== -1; }

    // Put together the Generator options.
    this.options = {
      appname: answers.appname,
      docpadFile: answers.docpadFile,
      license: answers.license,
      coffeescript: hasRenderer('coffeescript'),
      eco: hasRenderer('eco'),
      marked: hasRenderer('marked'),
      less: hasRenderer('less'),
      jade: hasRenderer('jade'),
      stylus: hasRenderer('stylus'),
      bower: hasHelper('bower'),
      cachr: hasHelper('cachr'),
      grunt: hasHelper('grunt'),
      livereload: hasHelper('livereload'),
      moment: hasHelper('moment'),
      ghpages: hasDeployer('ghpages'),
      sunny: hasDeployer('sunny'),
      webpack: hasHelper('webpack')
    };

    // Override any of the needed internal variables.
    this.appname = this.options.appname;

    // Ensure the base requirements are met.
    if (!this.options.eco && !this.options.jade) {
      this.options.eco = true;
    }

    cb();
  }.bind(this));
};

/**
 * Initial application structure.
 */
DocPadGenerator.prototype.app = function app() {
  // Directory structure.
  this.mkdir('src');
  this.mkdir('src/documents');
  this.mkdir('src/files');
  this.mkdir('src/layouts');

  // package.json
  this.template('_package.json', 'package.json');

  // DocPad configuration file.
  this.template(this.options.docpadFile, this.options.docpadFile);
};

/**
 * Any project-related files.
 */
DocPadGenerator.prototype.projectfiles = function projectfiles() {
  // .editorconfig
  this.copy('editorconfig', '.editorconfig');

  // .gitignore
  this.copy('gitignore', '.gitignore');
};

/**
 * Documentation files.
 */
DocPadGenerator.prototype.documentation = function documentation() {
  // Readme
  this.template('README.md', 'README.md');

  // License.
  this.template('LICENSE-' + this.options.license + '.md', 'LICENSE.md');
};

/**
 * Grunt.
 */
DocPadGenerator.prototype.grunt = function grunt() {
  if (this.options.grunt) {
    this.template('Gruntfile.coffee', 'Gruntfile.coffee');
  }
};

/**
 * Bower.
 */
DocPadGenerator.prototype.bower = function bower() {
  if (this.options.bower) {
    this.template('_bower.json', 'bower.json');
    this.template('bowerrc', '.bowerrc');
  }
};

/**
 * Coffee-Script.
 */
DocPadGenerator.prototype.coffeescript = function coffeescript() {
  if (this.options.coffeescript) {
    this.copy('docpad/documents/coffeescript.js.coffee', 'src/documents/coffeescript.js.coffee');
  }
};

/**
 * Marked.
 */
DocPadGenerator.prototype.marked = function marked() {
  if (this.options.marked) {
    this.template('docpad/documents/marked.html.md', 'src/documents/marked.html.md');
  }
};

/**
 * Eco.
 */
DocPadGenerator.prototype.eco = function eco() {
  if (this.options.eco) {
    this.copy('docpad/layouts/default.html.eco', 'src/layouts/default.html.eco');
    this.copy('docpad/documents/eco.html.eco', 'src/documents/eco.html.eco');
  }
};

/**
 * LESS.
 */
DocPadGenerator.prototype.less = function less() {
  if (this.options.less) {
    this.copy('docpad/documents/less.css.less', 'src/documents/less.css.less');
  }
};

/**
 * Stylus.
 */
DocPadGenerator.prototype.stylus = function stylus() {
  if (this.options.stylus) {
    this.copy('docpad/documents/stylus.css.stylus', 'src/documents/stylus.css.stylus');
  }
};

/**
 * Jade.
 */
DocPadGenerator.prototype.jade = function jade() {
  if (this.options.jade) {
    this.copy('docpad/layouts/default.html.jade', 'src/layouts/default.html.jade');
    this.copy('docpad/documents/jade.html.jade', 'src/documents/jade.html.jade');
  }
};

/**
 * Webpack.
 */
DocPadGenerator.prototype.webpack = function webpack() {
  if (this.options.webpack) {
    this.copy('docpad/entry.js', 'src/entry.js');
  }
};

/**
 * Any DocPad resource files.
 */
DocPadGenerator.prototype.docpadFiles = function docpadFiles() {
  // All the DocPad source files.
  var files = [
    "documents/index.html"
  ];
  for (var i in files) {
    this.template('docpad/' + files[i], 'src/' + files[i]);
  }

  var files = [
    "files/main.css",
    "files/main.js"
  ];
  for (var i in files) {
    this.copy('docpad/' + files[i], 'src/' + files[i]);
  }
};
