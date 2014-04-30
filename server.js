var express = require('express'),
  mongoose = require('mongoose'),
  fs = require('fs');

var mongoUri = 'mongodb://localhost/noderestpresentation'; 
mongoose.connect(mongoUri);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + mongoUri);
});

var app = express();

app.configure(function(){
  app.use(express.bodyParser());
});

app.use(express.favicon(__dirname + '/public/favicon.ico'));
app.use(express.static(__dirname + '/public'));

require('./src/models/musician')
require('./src/routes')(app);

app.listen(3000);
console.log('Listening on port 3000...');

