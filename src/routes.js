module.exports = function(app){

	var snacks = require('./controllers/snacks2');

	app.get('/snacks', snacks.findAll); 
	app.get('/snacks/:id', snacks.findById); 
  app.put('/snacks/:id', snacks.update);
  app.post('/snacks', snacks.add);
  app.delete('/snacks/:id', snacks.delete);
	app.get('/import', snacks.import);  

	app.get('/hello', function(req, res) {
	    res.send('Hello World\n');
	});

};
