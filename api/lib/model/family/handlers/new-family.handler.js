var db = require('../../../db');

var NewFamilyHandler = module.exports = (function() {
  var handle = function(payload, callback) {
    var data = {
      name: payload.name,
      status: payload.status,
      contacts: payload.contacts || [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    db.Family.create(data, function(err, doc) {
      if (err) return callback(err);
      return callback(null, { family_id: doc.id, message: 'Family created successfully' });
    });
  };

  return {
    name: 'new-family',
    handle: handle
  };
})();
