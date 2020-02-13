// start.js

require('babel-register')({
  presets: ['env'],
});

module.exports = require('./index.js');
