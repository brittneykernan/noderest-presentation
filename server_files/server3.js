var express = require('express'),
  fs = require('fs');
 
var app = express();
 
require('./routes')(app);

app.listen(3000);
console.log('Listening on port 3000...');