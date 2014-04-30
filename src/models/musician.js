var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var MusicianSchema = new Schema({
  name: String,
  band: String,
  instrument: String
});

mongoose.model('Musician', MusicianSchema);
