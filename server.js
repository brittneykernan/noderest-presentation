var express = require('express'),
  fs = require('fs');
 
var app = express();

app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
app.use(express.static(__dirname + '/public'));
 
require('./src/routes')(app);

app.listen(3000);
console.log('Listening on port 3000...');