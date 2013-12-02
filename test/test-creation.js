/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;


describe('docpad generator', function () {
    beforeEach(function (done) {
        helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
            if (err) {
                return done(err);
            }

            this.app = helpers.createGenerator('docpad:app', [
                '../../app'
            ]);
            done();
        }.bind(this));
    });

    it('creates expected files', function (done) {
        // Expected list of files.
        var expected = [
            'README.md',
            '.editorconfig',
            '.gitignore',
            'Gruntfile.coffee',
            'bower.json',
            'docpad.cson',
            'src/documents/index.html',
            'LICENSE.md',
            'src/documents/marked.html.md',
            'src/documents/eco.html.eco',
            'src/layouts/default.html.eco'
        ];

        // Mock the answer prompts.
        helpers.mockPrompt(this.app, {
            'appname': 'DocPad test',
            'docpadFile': 'docpad.cson',
            'license': 'Apache-2.0',
            renderers: [
              'marked',
              'eco',
              'jade'
            ],
            helpers: [
              'grunt',
              'bower',
              'livereload'
            ]
        });
        this.app.options['skip-install'] = true;
        this.app.run({}, function () {
            helpers.assertFiles(expected);
            done();
        });
    });
});
