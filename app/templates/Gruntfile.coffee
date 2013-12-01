# Grunt Configuration
# http://gruntjs.com/getting-started#an-example-gruntfile

module.exports = (grunt) ->

  # Initiate the Grunt configuration.
  grunt.initConfig

    # Allow use of the package.json data.
    pkg: grunt.file.readJSON("package.json")

    # Use Uglify to minify files.
    #uglify:
    #  production:
    #    files:
    #      "out/main.js": "out/main.js"

  # Build the available Grunt tasks.
  #grunt.loadNpmTasks "grunt-contrib-uglify"

  # Register our Grunt tasks.
  grunt.registerTask "default", [
    #"uglify"
  ]
