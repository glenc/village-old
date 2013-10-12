var config = {};

// db
config.db = {
  conn: 'mongodb://localhost/village-test'
};

// web
config.web = {
  port: process.env.WEB_PORT || 8080
};

// handlers
config.handlers = ['lib/**/*.handler.js', 'test/**/*.handler.js'];
config.queries = ['lib/**/*.query.js', 'test/**/*.query.js'];
config.projections = ['lib/**/*.projection.js', 'test/**/*.projection.js'];

module.exports = config;
