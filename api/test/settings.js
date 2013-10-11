var config = require('../config/test.js');

var settings = {};
settings.url = 'http://localhost:' + config.web.port;

module.exports = settings;
