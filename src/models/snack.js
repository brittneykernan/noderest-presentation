var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var SnackSchema = new Schema({
  title: String,
  brand: String,
  count: String
});

mongoose.model('Snack', SnackSchema);
