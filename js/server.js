/** @flow */

require('node-jsx').install({harmony: true, extension: '.jsx'});

var express = require('express');
var React = require('react');
var app = express();
var HelloWorld = require('./HelloWorld');
var gpio = require('./gpio');

var projectRoot = __dirname + '/..';

//
// Serve sass
//
var sass = require('node-sass');

app.get('/main.css', function (req, res) {
  sass.render({
    file: 'main.scss',
    success: function(css) {
      res.setHeader('Content-Type', 'text/css')
      res.send(css)
    },
    error: function(error) {
      console.error(error)
      res.status(500).send("Internal Service Error")
    }
  });
});


//
// Serve a bundle of javascripts
//

browserify = require('browserify-middleware')

browserify.settings({
  extensions: ['.jsx'],
  transform: [
    ['reactify', {es6: true}]
  ]
})

app.use(express.static(projectRoot + '/bower_components'));

app.get('/application.js', browserify('./js/application.jsx'))

app.get('/', function (req, res) {
  var component = React.renderToString(React.createElement(HelloWorld, {}));
  res.render('../component.html.ejs', {component: component})
});

function postFloor(gpioPin, req, res) {
  gpio('3').then(function() {
    res.json({status: 'ok'});
  }, function(err) {
    console.error(err);
    res.json({error: 'failed to call elevator'});
  });
}

app.post('/floors/street', postFloor.bind(undefined, '2'));
app.post('/floors/basement', postFloor.bind(undefined, '3'));

server = app.listen(5000, function() {
  console.log('Listening on port %d', server.address().port)
});
