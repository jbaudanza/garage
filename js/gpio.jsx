var fs = require('fs');
var RSVP = require('rsvp');

function writeGpio(path, value, callback) {
  return new RSVP.Promise((resolve, reject) => {
    fs.writeFile('/sys/class/gpio/' + path, value, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

function initialize() {
  var pins = ['2', '3'];

  var list = pins.map((pin) => {
    return writeGpio('export', pin).then( () => {
      // 'high' is the same as 'out', except with an initial value of 1
      return writeGpio(`gpio${pin}/direction`, 'high');
    });
  });

  return RSVP.all(list);
}

var waitForInit = initialize();

function sleep() {
  return new RSVP.Promise((resolve) => setTimeout(resolve, 2000));
}

module.exports = function(pin) {
  var file = `gpio${pin}/value`;

  return waitForInit
      .then(() => writeGpio(file, '0'))
      .then(sleep)
      .then(() => writeGpio(file, '1'));
}
