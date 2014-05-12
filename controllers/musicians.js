var mongoose = require('mongoose'),
Musician = mongoose.model('Musician');

exports.findAll = function(req, res){
  Musician.find({},function(err, results) {
    return res.send(results);
  });
};

exports.findById = function(req, res){
  var id = req.params.id;
  Musician.findOne({'_id':id},function(err, result) {
    return res.send(result);
  });
};

exports.update = function(req, res) {
  var id = req.params.id;
  var updates = req.body;

  Musician.update({'_id':id}, updates, function (err, numberAffected, raw) {
    if (err) return console.log(err);
    console.log('Updated %d musicians', numberAffected);
    return res.send(raw);
  });
}

exports.add = function(req, res) {
  Musician.create(req.body, function (err, musician) {
    if (err) return console.log(err); 
    return res.send(musician);
  });
}

exports.delete = function(req, res){
  var id = req.params.id;
  Musician.remove({'_id':id},function(result) {
    return res.send(result);
  });
};

exports.import = function(req, res){
  Musician.create( 
    { "name": "Ben", "band": "DJ Code Red", "instrument": "Reason" },
    { "name": "Mike D.","band": "Kingston Kats", "instrument": "drums" },
    { "name": "Eric", "band": "Eric", "instrument": "piano" },
    { "name": "Paul", "band": "The Eyeliners", "instrument": "guitar" }             
  , function (err) {
    if (err) return console.log(err); 
    return res.send(202);
  });
};