var _  = require('underscore');
var db = require('../../../db');

var NewContactHandler = module.exports = (function() {
  var handle = function(payload, callback) {
    db.Family.findById(payload.family_id, function(err, doc) {
      if (err) return callback(err);
      if (!doc) return callback(new Error('Family was not found'));

      var existing_ids = doc.contacts.map(function(c) { return c.id; });

      delete payload.contact_id;
      delete payload.family_id;

      doc.contacts.push(payload);
      doc.updatedAt = new Date();

      doc.save(function(err, doc) {
        if (err) return callback(err);

        // get id of newly added contact
        var all_ids = doc.contacts.map(function(c) { return c.id; });
        var new_id = _.difference(all_ids, existing_ids)[0];

        return callback(null, { contact_id: new_id, message: 'Contact added successfully' });
      });
    });
  };

  return {
    name: 'new-contact',
    handle: handle
  };
})();
