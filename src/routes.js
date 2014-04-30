module.exports = function(app){

	var musicians = require('./controllers/musicians');

	app.get('/musicians', musicians.findAll); 
	app.get('/musicians/:id', musicians.findById); 
  app.put('/musicians/:id', musicians.update);
  app.post('/musicians', musicians.add);
  app.delete('/musicians/:id', musicians.delete);
	app.get('/import', musicians.import);  

	app.get('/hello', function(req, res) {
	    res.send('Hello New York\n');
	});

};
