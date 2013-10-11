var expect    = require('chai').expect;
var async     = require('async');
var restify   = require('restify');
var settings  = require('./settings');
var helper    = require('./test-helper');

describe('Commands', function() {

  var client = restify.createJsonClient({
    url: settings.url,
    version: '*'
  });

  describe('submitting a valid command', function() {
    var result = {};
    before(function(done) {
      async.waterfall([
        function(cb)        { client.post('/commands', { command: 'testCommand' }, new helper.responseParser(cb)); },
        function(data, cb)  { result = data; cb(); }
      ], done);
    });

    it('should return the command id', function() {
      expect(result.data.id).to.exist;
    });

    it('should return status code 202', function() {
      expect(result.res.statusCode).to.equal(202);
    });

  });

  describe('submitting an invalid command', function() {
    var result = {};
    before(function(done) {
      async.waterfall([
        function(cb)        { client.post('/commands', { randomParam: '1234' }, new helper.responseParser(cb)); },
        function(data, cb)  { result = data; cb(); }
      ], done);
    });

    it('should return status code 400', function() {
      expect(result.res.statusCode).to.equal(400);
    });

    it('should return error stating that command was invalid', function() {
      expect(result.err).to.exist;
      expect(result.err.message).to.contain('Invalid command');
    });

  });

  describe('getting a submitted command', function() {
    var result = {};
    before(function(done) {
      async.waterfall([
        function(cb)                { client.post('/commands', { command: 'testCommand' }, cb); },
        function(req, res, obj, cb) { client.get('/commands/' + obj.id, new helper.responseParser(cb)); },
        function(data, cb)          { result = data; cb(); }
      ], done);
    });

    it('should return status code 200', function() {
      expect(result.res.statusCode).to.equal(200);
    });

    it('should return the command', function() {
      expect(result.data).to.exist;
    });

  });

  describe('getting an unknown command', function() {
    var result = {};
    before(function(done) {
      async.waterfall([
        function(cb)        { client.get('/commands/999', new helper.responseParser(cb)); },
        function(data, cb)  { result = data; cb(); }
      ], done);
    });

    it ('should return status code 404', function() {
      expect(result.res.statusCode).to.equal(404);
    });

    it ('should not return data', function() {
      expect(result.data).not.to.exist;
    });

  })

});
