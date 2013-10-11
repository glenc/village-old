var expect    = require('chai').expect;
var restify   = require('restify');
var settings  = require('./settings');

describe('Commands', function() {

  var client = restify.createJsonClient({
    url: settings.url,
    version: '*'
  });

  describe('submitting a valid command', function() {
    var result = {};
    before(function(done) {
      client.post('/commands', { command: 'testCommand' }, function(err, req, res, obj) {
        result.err = err;
        result.req = req;
        result.res = res;
        result.obj = obj;
        done();
      });
    });

    it('should return the command id', function() {
      expect(result.obj.id).to.exist;
    });

    it('should return status code 202', function() {
      expect(result.res.statusCode).to.equal(202);
    });

  });

  describe('submitting an invalid command', function() {
    var result = {};
    before(function(done) {
      client.post('/commands', { randomParam: '1234' }, function(err, req, res, obj) {
        result.err = err;
        result.req = req;
        result.res = res;
        result.obj = obj;
        done();
      });
    });

    it('should return status code 400', function() {
      expect(result.res.statusCode).to.equal(400);
    });

    it('should return error stating that command was invalid', function() {
      expect(result.err).to.exist;
      console.log(result.err);
    });

  });



});
