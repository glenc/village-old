var util    = require('util');
var restify = require('restify');

var BadRequestError = module.exports.BadRequestError = function(message) {
  restify.RestError.call(this, {
          statusCode: 400,
          restCode: 'BadRequest',
          message: message,
          constructorOpt: BadRequestError
  });
  this.name = 'BadRequestError';
}
util.inherits(BadRequestError, restify.RestError);
