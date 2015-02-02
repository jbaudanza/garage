var fs = require('fs');
var Promise = require('promise');

var writeFile = Promise.denodeify(fs.writeFile);

var basePath = '/sys/class/gpio/';

function initialize() {
  var pins = ['2', '3'];

  var list = pins.map((pin) => {
    var gpioBase = basePath + 'gpio' + pin;

    function catchBusyError(err) {
      if (err.code == 'EBUSY') {
        // Generate a warning, but allow to continue
        console.warn(`WARNING: GPIO pin ${pin} is already exported.`);
      } else {
        throw err;
      }
    }

    return writeFile(basePath + 'export', pin)
        .catch(catchBusyError)
        .then(sleep)
        // 'high' is the same as 'out', except with an initial value of 1
        .then(() => writeFile(gpioBase + '/direction', 'high') );
  });

  return Promise.all(list);
}

var waitForInit = initialize();

function sleep() {
  return new Promise((resolve) => setTimeout(resolve, 500));
}

module.exports = function(pin) {
  var file = `${basePath}gpio${pin}/value`;

  return waitForInit
      .then(() => writeFile(file, '0'))
      .then(sleep)
      .then(() => writeFile(file, '1'));
}
