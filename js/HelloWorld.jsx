/** @flow */
/** @jsk */

var React = require('react');

var HelloWorld = React.createClass({
  render: function() { 
    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className="col-md-4">
            <a className="btn btn-default" href="#" role="button">
              Ground
            </a>
            <a className="btn btn-default" href="#" role="button">
              Basement
            </a>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = HelloWorld;
