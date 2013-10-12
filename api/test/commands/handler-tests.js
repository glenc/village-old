var expect    = require('chai').expect;
var async     = require('async');
var restify   = require('restify');
var settings  = require('../settings');
var helper    = require('../test-helper');
var commandService = require('../../lib/command-service');

describe('Command Handlers', function() {
  var client = restify.createJsonClient({
    url: settings.url,
    version: '*'
  });

  describe('submitting a command', function() {
    var result = {};
    var calls = 0;
    var handler = function(payload, callback) {
      calls++;
      callback(null, { message:'yay' });
    };

    before(function(done) {
      commandService.registerHandler('test', handler);

      var waitForCompletion = function(id, callback) {
        var completed = false;
        async.until(
          function() { return completed; },
          function(cb) {
            client.get('/commands/' + id, function(err, req, res, data) {
              if (data.completedAt) {
                completed = true;
                result = data;
              }
            });
            setTimeout(cb, 100);
          },
          callback);
      };

      async.waterfall([
        function(cb)        { helper.resetDb(cb); },
        function(cb)        { client.post('/commands', { command: 'test', foo: 1 }, new helper.responseParser(cb)); },
        function(data, cb)  { waitForCompletion(data.data.id, cb); }
      ], done);
    });

    it('calls the associated handler', function() {
      expect(calls).to.equal(1);
    });

    it('updates the command with the correct data', function() {
      expect(result.result).to.exist;
      expect(result.result.message).to.equal('yay');
    });
  });

  describe('submitting a command without a handler', function() {
    var result = {};
    var calls = 0;
    var handler = function(payload, callback) {
      calls++;
      callback(null, { message:'yay' });
    };

    before(function(done) {

      var waitForCompletion = function(id, callback) {
        var completed = false;
        async.until(
          function() { return completed; },
          function(cb) {
            client.get('/commands/' + id, function(err, req, res, data) {
              if (data.completedAt) {
                completed = true;
                result = data;
              }
            });
            setTimeout(cb, 100);
          },
          callback);
      };

      async.waterfall([
        function(cb)        { helper.resetDb(cb); },
        function(cb)        { client.post('/commands', { command: 'unknown', foo: 1 }, new helper.responseParser(cb)); },
        function(data, cb)  { waitForCompletion(data.data.id, cb); }
      ], done);
    });

    it('updates the command with an error', function() {
      expect(result.error).to.exist;
      expect(result.error.name).to.equal('UnknownCommandError');
    });

  });

});
