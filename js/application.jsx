/** @flow */
/** @jsk */

var React = require('react');
var HelloWorld = require('./HelloWorld');

if (typeof(window) !== 'undefined') {
  window.main = function(element) {
    React.render(React.createElement(HelloWorld, {}), element);
  }
}
