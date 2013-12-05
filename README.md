# [Yeoman](http://yeoman.io) generator for [DocPad](http://docpad.org)

[![Build Status](https://secure.travis-ci.org/RobLoach/generator-docpad.png?branch=master)](https://travis-ci.org/RobLoach/generator-docpad)
[![NPM version](https://badge.fury.io/js/generator-docpad.png)](http://badge.fury.io/js/generator-docpad "View this project on NPM")
[![Gittip donate button](http://img.shields.io/gittip/RobLoach.png)](https://www.gittip.com/RobLoach/ "Donate weekly to the maintainer of this project")
[![Flattr donate button](http://img.shields.io/flattr/donate.png?color=yellow)](http://flattr.com/thing/2257574/RobLoach "Donate monthly to this project using Flattr")

Scaffold [DocPad](http://docpad.org) projects quickly using [Yeoman](http://yeoman.io).


## Features

* Build a customized DocPad application structure
* Choose [Renderers](http://docpad.org/docs/plugins#renderers)
  * [CoffeeScript](http://docpad.org/plugin/coffeescript)
  * [Eco](http://docpad.org/plugin/eco)
  * [Jade](http://docpad.org/plugin/jade)
  * [Marked](http://docpad.org/plugin/marked)
* Choose [Helpers](http://docpad.org/docs/plugins#helpers)
  * [Bower](http://github.com/robloach/docpad-plugin-bower)
  * [Cachr](http://docpad.org/plugin/cachr)
  * [Grunt](http://github.com/robloach/docpad-plugin-grunt)
  * [Moment](http://docpad.org/plugin/moment)
  * [Live Reload](http://docpad.org/plugin/livereload)
* Choose [Deployers](http://docpad.org/docs/plugins#deployers)
  * [GitHub Pages](http://docpad.org/plugin/ghpages)
  * [Sunny](https://github.com/bobobo1618/docpad-plugin-sunny)


## Getting Started

1. Install [Yeoman](http://yeoman.io) and the DocPad generator globally:
``` bash
$ npm install yo generator-docpad -g
```

2. Create a new project directory and switch to it:
``` bash
$ mkdir myproject
$ cd myproject
```

3. Call upon the DocPad Yeoman generator to build your project:
``` bash
$ yo docpad
```

4. Use the newly built DocPad application:
``` bash
$ npm start
```


## License

Licensed under the incredibly [permissive](http://en.wikipedia.org/wiki/Permissive_free_software_licence) [MIT License](http://creativecommons.org/licenses/MIT/)
<br/>Copyright &copy; 2013 [Rob Loach](http://robloach.net)
