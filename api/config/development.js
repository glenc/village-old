var config = {};

// db
config.db = {
  conn: 'mongodb://localhost/village-dev'
};

// web
config.web = {
  port: process.env.WEB_PORT || 8080
};

// handlers
config.handlers = ['lib/**/*.handler.js'];
config.queries = ['lib/**/*.query.js'];
config.projections = ['lib/**/*.projection.js'];

module.exports = config;
