var expect  = require('chai').expect;
var db      = require('../../lib/db');
var handler = require('../../lib/model/family/handlers/new-family.handler.js');

describe('NewFamilyHandler', function() {
  describe('with valid payload', function() {
    var outcome = {};
    var payload = { name: 'Cooper_Stevens', status: 'Active', statusDate: new Date(2011, 1, 1) };

    before(function(done) {
      handler.handle(payload, function(err, result) {
        outcome.result = result;
        outcome.err = err;
        done();
      });
    });

    it('returns the id of the newly created family', function() {
      expect(outcome.result.id).to.exist;
    });

    it('returns a message', function() {
      expect(outcome.result.message).to.exist;
    });

    it('does not return an error', function() {
      expect(outcome.err).not.to.exist;
    });

    it('saves the family in the database', function(done) {
      db.Family.findById(outcome.result.id, function(err, doc) {
        expect(err).not.to.exist;
        expect(doc).to.exist;
        expect(doc.name).to.equal(payload.name);
        expect(doc.status).to.equal(payload.status);
        done();
      });
    });

    it('logs an entry to the family events', function(done) {
      db.Family.findById(outcome.result.id, function(err, doc) {
        expect(doc.events).to.exist;
        expect(doc.events).to.have(1);
        expect(doc.events[0].date).to.equal(payload.statusDate);
      });
    });
  });

  describe('with missing name', function() {
    var outcome = {};
    var payload = { status: 'New' };

    before(function(done) {
      handler.handle(payload, function(err, result) {
        outcome.result = result;
        outcome.err = err;
        done();
      });
    });

    it('does not return a result', function() {
      expect(outcome.result).not.to.exist;
    });

    it('returns an error', function() {
      expect(outcome.err).to.exist;
    });
  });

  describe('with missing status', function() {
    var outcome = {};
    var payload = { name: 'Cooper_Stevens' };

    before(function(done) {
      handler.handle(payload, function(err, result) {
        outcome.result = result;
        outcome.err = err;
        done();
      });
    });

    it('does not return a result', function() {
      expect(outcome.result).not.to.exist;
    });

    it('returns an error', function() {
      expect(outcome.err).to.exist;
    });
  });
});
