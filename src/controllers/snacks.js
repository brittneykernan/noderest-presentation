exports.findAll = function(req, res){

  res.send({
    "id": 1,
    "brand": "nabisco",
    "products": [
      {
        "id": 1,
        "name": "oreo"
      }
    ]
  });
};

exports.findById = function(req, res){

};
exports.import = function(req, res){

};