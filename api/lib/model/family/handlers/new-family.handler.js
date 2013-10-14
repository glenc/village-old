var db = require('../../../db');

var NewFamilyHandler = module.exports = (function() {
  var eventForStatus = function(status, statusDate) {
    var evt = {
      type: 'Status',
      date: statusDate
    };

    switch(status) {
      case 'Active':
        evt.description = 'Joined PACE';
        break;
      case 'Waitlist':
        evt.description = 'Entered waitlist';
        break;
      case 'Exited':
        evt.description = 'Exited PACE';
        break;
      default:
        evt.description = 'Created in system';
        evt.date = new Date();
        break;
    }

    return evt;
  };

  var logsForCreate = function(comment) {
    if (!comment) return [];
    return [{
      message: comment,
      date: new Date()
    }];
  };

  var handle = function(payload, callback) {
    var data = {
      name: payload.name,
      status: payload.status,
      contacts: payload.contacts || [],
      events: [ eventForStatus(payload.status, payload.statusDate) ],
      logs: logsForCreate(payload.comment),
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
