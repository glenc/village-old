var db = require('../../../db');

var RenameFamilyHandler = module.exports = (function() {
  var handle = function(payload, callback) {

    db.Family.findById(payload.family_id, function(err, doc) {
      if (err) return callback(err);

      var evt = {
        type: 'Data',
        date: new Date(),
        description: 'Name changed from ' + doc.name + ' to ' + payload.name
      };

      doc.name = payload.name;
      doc.events.push(evt);
      doc.updatedAt = new Date();

      doc.save(function(err, doc) {
        if (err) return callback(err);
        return callback(null, { message: 'Familly renamed successfully' });
      });
    });
  };

  return {
    name: 'rename-family',
    handle: handle
  };
})();
