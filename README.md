angular-big
===========

This library creates an angular module for [big.js](https://github.com/MikeMcl/big.js/).

## Installation:

Download using bower:
```
bower install angular-big
```

Include js files in html:
```
<script src="bower_components/big.js/big.min.js"></script>
<script src="bower_components/angular-big/dist/angular-big.js"></script>
```

Mark `Big` as a dependency in your application:
```
var myApp = angular.module('MyApp', ['Big']);
```

## Using

As of 1.0.0 angular-big has the following providers:
* constants
  * zero: returns a new Big("0")
  * one: returns a new Big("1")
  * two: returns a new Big("2")
  * ten: returns a new Big("10")
* services
  * big: has make(value), add(a, b), multiply(a, b), sum([...]), product([...]) functionality
* filters
  * fixed: converts to string format. also has an optional parameter to specify number of decimals.
