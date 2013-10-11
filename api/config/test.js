var config = {};

// db
config.db = {
  conn: 'mongodb://localhost/village-test'
};

// web
config.web = {
  port: process.env.WEB_PORT || 8080
};

module.exports = config;
