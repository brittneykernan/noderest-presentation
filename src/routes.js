module.exports = function(app){

	var snacks = require('./controllers/snacks');

	app.get('/snacks', snacks.findAll); 
	app.get('/snacks/:id', snacks.findById); 
	app.get('/import', snacks.import);  

};
