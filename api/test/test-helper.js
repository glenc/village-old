module.exports.responseParser = function(callback) {
  return function(err, req, res, data) {
    var obj = {
      err: err,
      req: req,
      res: res,
      data: data
    };
    callback(null, obj);
  };
}
