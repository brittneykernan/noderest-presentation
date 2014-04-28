var mongoose = require('mongoose'),
Snack = mongoose.model('Snack');

exports.findAll = function(req, res){
  Snack.find({},function(err, results) {
    return res.send(results);
  });
};

exports.findById = function(req, res){
  var id = req.params.id;
  Snack.findOne({'_id':id},function(err, result) {
    return res.send(result);
  });
};

exports.update = function(req, res) {
  var id = req.params.id;
  var updates = req.body;

  Snack.update({'_id':id}, updates, function (err, numberAffected, raw) {
    if (err) return console.log(err);
    console.log('The number of updated documents was %d', numberAffected);
    return res.send(raw);
  });
}

exports.add = function(req, res) {
  Snack.create(req.body, function (err, snack) {
    if (err) return console.log(err); 
    return res.send(snack);
  });
}

exports.delete = function(req, res){
  var id = req.params.id;
  Snack.remove({'_id':id},function(result) {
    return res.send(result);
  });
};

exports.import = function(req, res){
  Snack.create(
    { "title": "Oreo","brand": "Nabisco", "count": "3" },
    { "title": "Nutter Butter", "brand": "Nabisco", "count": "5" },
    { "title": "baby carrots", "brand": "Bodega Plus", "count": "1" },
    { "title": "Koala Yummies", "brand": "Lotte Co.", "count": "0" }   
  , function (err) {
    console.log('snacks imported');
  });
};