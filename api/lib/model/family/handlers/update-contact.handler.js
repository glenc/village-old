var _  = require('underscore');
var db = require('../../../db');

var UpdateContactHandler = module.exports = (function() {
  var handle = function(payload, callback) {
    db.Family.findById(payload.family_id, function(err, doc) {
      if (err) return callback(err);
      if (!doc) return callback(new Error('Family was not found'));

      var idx = -1;
      for (var i=0; i<= doc.contacts.length; i++) {
        if (doc.contacts[i].id == payload.id) {
          idx = i;
          break;
        }
      }

      if (idx < 0) return callback(new Error('Contact was not found'));

      var c = doc.contacts[i];
      Object.keys(payload).forEach(function(prop) {
        if (prop != 'id' && prop != 'family_id') {
          c[prop] = payload[prop];
        }
      });

      doc.updatedAt = new Date();

      doc.save(function(err, doc) {
        if (err) return callback(err);
        return callback(null, { message: 'Contact updated successfully' });
      });
    });
  };

  return {
    name: 'update-contact',
    handle: handle
  };
})();
