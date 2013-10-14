var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;

var phoneNumberSchema = new Schema({
  type:   String,
  number: String
}, { _id: false });

var contactSchema = new Schema({
  firstName:    { type: String, required: true },
  lastName:     { type: String, required: true },
  type:         { type: String, required: true, enum: ['Parent', 'Guardian'], default: 'Parent'},
  email:        { type: String },
  phoneNumbers: [ phoneNumberSchema ],
  address: {
    street1:  String,
    street2:  String,
    city:     String,
    state:    String,
    zip:      String
  }
});

var eventSchema = new Schema({
  date:         { type: Date, required: true },
  type:         { type: String, required: true },
  description:  { type: String, required: true }
});

var logSchema = new Schema({
  date:       { type: Date, required: true },
  message:    { type: String, required: true }
});

var familySchema = new Schema({
  name:       { type: String, required: true, unique: true},
  status:     { type: String, required: true, enum: [ 'New', 'Waitlist', 'Active', 'Alumni', 'Exited' ] },
  contacts:   [ contactSchema ],
  events:     [ eventSchema ],
  logs:       [ logSchema ],
  updatedAt:  { type: Date,   required: true },
  createdAt:  { type: Date,   required: true }
});

var model = mongoose.model('Family', familySchema);
module.exports = model;
