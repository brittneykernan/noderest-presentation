---
layout: post
title:  "Tutorial: How to create a REST API with Node.js"
date:   2014-05-12 12:30:00
author: Brittney Kernan
email: b.kernan@bigspaceship.com
twitter: brittneykernan
categories: articles
comments: true
---


For a pitch, we prototyped one of our concepts with a Natural Language search feature. I quickly implemented a REST style GET call on search submit with Node.js via major article skimming. I still didn't have a clear mental map of how Node.js worked with a REST API, so I broke it down into a presentation for the BSS Tech team. You can follow along, or skim. 

## PHP vs Node.js REST Components

If you've come from PHP, your brain may already hold a diagram of what a REST API looks like in that language. Let's make one for Node.js

#### PHP
* Apache - HTTP server  
* .php controllers - Controls what your app does with data
* Content-Type JSON Headers - Sends your data back readable
* .htaccess - Map URLs to actions for pretty URLs
* MySQLi - Interfaces with Data
* MySQL - stores data 

#### Node.js
* Node.js - HTTP Server
* JavaScript modules - Controls what your app does with data
* Express - Framework to easily build for web with Node.js
* Routes - Map URLs to actions for pretty URLs
* Mongoose.js - interfaces with data
* Mongo - stores data

## Start a Node Server

Install Node first. Make a directory to play in, ex: noderest, and put server.js in the root. 

### server.js

``` 
var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello New York\n');
}).listen(3001, '127.0.0.1');
console.log('Server running at http://127.0.0.1:3001/');
</code></pre>
```

#### What's going on here

HTTP is our module we'll use to read the HTTP action - GET, POST, PUT or DELETE - and the Request Headers. It will also create a server for us, listening for HTTP Requests at the available port of your choice (here 3001). Pass this `createServer` method a callback function that takes two arguments - `req` and `res`. `req` for Request and `res` for Response. Add a console dir or two to inspect what these two variables hold. When Node receives a Request with your console dir inside, it will console out in Terminal all the properties of that Request. Response is an object you can use to reply back to the Request. Forget to return something with Response and your Request will simply time out. Here any URL path we type at 
http://127.0.0.1:3001/ will print back _Hello New York_ with a _OK_ header as plain text content. 

#### Try it 

In Terminal:
 
```
$ cd noderest/
$ node server.js
```

You should see `Server running at http://127.0.0.1:3001/` printed back at you. So easy (as long as you didn't have anything else running in that port). Open that URL. You should see `Hello New York`.

## Add Express

Why add this? Same reason you use jQuery, makes things faster and easier. 

To add Express as a dependency to your project, we'll need to first install NPM. NPM will read our package.json file saved to the root of our project directory, and know to download and install Express for us.

#### package.json
 
```
{
    "name": "Node REST Demo",
    "description": "Demo REST API with Node",
    "version": "0.0.1",
    "private": true,
    "dependencies": {
        "express": "3.x"
    }
}
```

#### Install Express in Terminal 
```
$ npm install
```

Watch Terminal fetch the files. Your directory now holds a new folder called _node_modules_, with the _express_ folder inside. Let's use Express. 

#### Use Express

Like the HTTP module you required in your first version of _server.js_, you'll require Express. Open _server.js_, clear it out, and add: 

```
var express = require('express');
var app = express();
app.get('/', function(req, res) {
    res.send('Hello Seattle\n');
});
app.listen(3001);
console.log('Listening on port 3001...');
```

#### What's changed

Nothing! Not really. Our server is actually doing the same thing, though. Listening to HTTP all requests sent to locally to port 3001 and returning some text _Hello Seattle_. Only difference is we have Express' framework to with - a slightly cleaner and faster way to handle requests and set up our server. The `app` variable holds an instance of the Express application object, which has many useful methods. 

#### Run Express

Changes to Node.js server files require a full server restart in order to be run.

Use `CTRL-C` to stop your running Node server. Restart with: 

```
node server.js
```

You'll see Terminal respond with _Listening on port 3001_. And _Hello Seattle_ at your localhost in the browser. 


## REST

We're ready to build our REST API. We'll need:
* A URL route schema to map requests to app actions
* A Controller to handle each action
* Data to respond with 
* Place to store the data
* Interface to access and change data

## Routes

Routes are the predefined URL paths your API responds to. Think of each Route as listening to three parts
* a specific HTTP Action 
* a specific URL path or RegEx
* a handler method

```
app.get('/', function(req, res) {
    res.send('Return JSON or HTML View');
});
```

This example of routing handles all GET Requests. The URL path is the root of the site, the homepage. The handling method is defined anonymously, and responds with plain text in this case. 

#### Request


    app.get('/musician/:name', function(req, res) {

       // Get /musician/Matt
       console.log(req.params.name)
       // => Matt
    
       res.send('{"id": 1,"name":"Matt", 
         "band":"BBQ Brawlers"}');
    });

Paths can handle RegEx, and parameters are a simple pattern we can use. `:name` is anything that comes after `/musician/` in the url. This parameter will be available in our Request object `req` under the params property. It will be keyed the same name as our param in the route path. 

FYI `req.body` can also be used to refer to the HTTP Request Body. You'll need to tell Express to look out for Requests Body's in your `server.js` file via configuration. We'll do this later. 

    app.configure(function(){
        app.use(express.bodyParser());
    });


#### Response

`res.send()` is awesome. You can pass this method JSON, Strings and HTML, and it will interoperate and send back the appropriate Content-Type and other Headers for you. If you want control, that's cool too. If you want to send custom HTTP Status' pass that number in before the response content. Add other headers, use `res.set()` to add in your headers before calling `res.send()`.  

    res.send({ some: 'json' });
    res.send("html for Maximum Pain's web page");
    res.send(404, 'No musicians here');
    res.send(500, { error: 'you blew it' });
    res.send(200);

##### There's much more to Express than detailed here. For more read the well designed and written docs. 

#### Routes.js

Add a new file at the root called routes.js. Drop in this routing module: 

    module.exports = function(app){
        var musicians = require('./controllers/musicians');
        app.get('/musicians', musicians.findAll);
        app.get('/musicians/:id', musicians.findById);
        app.post('/musicians', musicians.add);
        app.put('/musicians/:id', musicians.update);
        app.delete('/musicians/:id', musicians.delete);
    }

Here we are working with a Musician data model. We've created a Musicians Controller and placed all our request event handling methods inside the controller. The main REST HTTP Actions are handled. We've modeled our URL routes off of REST API conventions, and named our handling methods clearly. 

### Controllers

To keep code organized, create a folder called _controllers_ inside your project directory. Create a new file inside of that called _musicians.js_. We'll add each request handling method for Musicians data to this file one by one. 

##### Find All 

    exports.findAll = function(req, res){
      res.send([{
        "id": 1,
        "name": "Max",
        "band": "Maximum Pain",
        "instrument": "guitar"
      }]);
    };

Our Controller exports the `findAll` method so the router can refer to it. Like the anonymous functions we declared in our server.js, it accepts `req` and `res` arguments and returns JSON with `res.send()`. Our JSON is hard coded, which will do for now. Let's test this route in our app. 

#### Import Routes and JS Modules

Update server.js to require our routes file. The `.js` file extension can be omitted.  

    var express = require('express');

    var app = express();             

    require('routes')(app);

    app.listen(3001);
    console.log("Jammin\' on port 3001...");

`CTRL+C` to stop the Node server and `node server.js` to restart

You should now see JSON at `localhost:3001/musicians`

## Mongo

Data would be more fun to play with. I made fake bands for all the techers on the team for my musicians data. Put thought into it. 

### Start Mongo

Mongo Database felt right for my light data and it is super fast to set up (if you already have Mongo installed, install it if not, yuck). Run `mongos` in another Terminal tab if it's not running already. 

### Install Mongoose.js

Mongo is easy enough to communicate with, but if you like a little bit more structure to your data and data interface, try a Mongo Driver. I used Mongoose.js because I liked the Schema style of defining document structure.  

Ask NPM to install this dependency for you, and update your package.json file with this dependency for you with the `--save-dev` option. 

`npm install mongoose --save-dev`

### Use Mongoose.js

Update `server.js`:

    var express = require('express'),
    mongoose = require('mongoose'),
    fs = require('fs');

    var mongoUri = 'mongodb://localhost/noderest'; 
    mongoose.connect(mongoUri);
    var db = mongoose.connection;
    db.on('error', function () {
      throw new Error('unable to connect to database at ' + mongoUri);
    });

    var app = express();

    app.configure(function(){
      app.use(express.bodyParser());
    });

    require('./models/musician');
    require('routes')(app);

    app.listen(3001);
    console.log('Listening on port 3001...');

We're requiring the mongoose module which will communicate with Mongo for us. The mongoUri is a location to the Mongo DB that Mongoose will create if there is not one there already. Added an error handler there to easily debug issues connecting to Mongo collections. Here we also configured Express to parse requests' bodies (we'll use that for POST requests). Lastly, we require the Musician model which we'll make next.  

### Define Data Models

Create a new folder called _models_ and add a new file _musician.js_ for our Musician Model. 


    var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

    var MusicianSchema = new Schema({
      name: String,
      band: String,
      instrument: String
    });

    mongoose.model('Musician', MusicianSchema);

Require mongoose into this file, and create a new Schema object. This Mongoose Object helps mongoose make sure it's getting and setting the right and well-formed data from and to Mongo. Our schema defines three String properties which defines a Musician object. The last line creates the Musician model object, with built in Mongo interfacing methods, you can use in other files. 

### Start Mongoose

Restart the server with `CTRL+C` and `node server.js`. Visit the API endpoint for all musicians `localhost:3001/musicians`. You'll get JSON data back, in the form of an empty array. 

## Data

Since I didn't feel like messing with Mongo anymore command-line, I decided to import musician data with our REST API. Add a new route endpoint to `routes.js`.

`app.get('/import', musicians.import);`

Now to define the import method in our Musicians Controller:

    exports.import = function(req, res){
      Musician.create(
        { "name": "Ben", "band": "DJ Code Red", "instrument": "Reason" },
        { "name": "Mike D.","band": "Kingston Kats", "instrument": "drums" },
        { "name": "Eric", "band": "Eric", "instrument": "piano" },
        { "name": "Paul", "band": "The Eyeliner", "instrument": "guitar" }   
      , function (err) {                
        if (err) return console.log(err); 
        return res.send(202);
      });
    };

This import method creates four documents out of the hard-coded JSON. The Musician model is referenced here to call it's create method, which takes one or more documents in JSON form, and a callback when create is finished running. If an error occurs, Terminal will spit that out, and the request will timeout in the browser. On success, 202 Accepted HTTP status code is returned to the browser. 

##### Find All

Update `findAll()` to query Mongo with the `find()` data model method. 

    exports.findAll = function(req, res){
      Musician.find({},function(err, results) {
        return res.send(results);
      });
    }; 

`{}` means we are not filtering data by any of it's properties, so please return all of it. Once Mongoose looks up the data it returns an error message and a result set. Use `res.send()` to return the raw results. 

### Returning Data

Restart your node server and visit your `musicians/` endpoint to view all musicians data. You'll see an array of JSON objects, each in the defined Schema, with an additional generated unique private `_id` and internal `__v` version key. Don't edit those.  

##### Find By Id

Recall our route for getting a musician by it's id `app.get('/musicians/:id', musicians.findById)`. Here is the handler method:

    exports.findById = function(req, res){
      var id = req.params.id;
      Musician.findOne({'_id':id},function(err, result) {
        return res.send(result);
      });
    };

This route's path uses a parameter RegEx for _id_ `'/musicians/:id'` which we can refer to in `req`. Pass this id to Mongoose to look up and return just one document. Restart your server and visit the find all endpoint. Copy one of the super long ids and past it in at the end of the url. Refresh your browser and you'll get a single JSON object for that one musician's document. Nice.

##### Update

PUT HTTP actions usually are accompanied by an Update method. The route for Update also uses an `:id` parameter. 

    exports.update = function(req, res) {
      var id = req.params.id;
      var updates = req.body;  

      Musician.update({'_id':id}, req.body, 
        function (err, numberAffected) {
          if (err) return console.log(err);
            console.log('Updated %d musicians', numberAffected);
      });
    }   

Notice the updates variable storing the req.body. `req.body` is useful when you want to pass in larger chunks of data such as a single JSON object. Here we will pass in what data of the Musician model to change as a JSON object in key value pairs, as many or few different properties as we like. 

The model's update method takes three parameters. 
* JSON object on how to look up the doc to update
* JSON object of just the properties to update
* callback function that returns the number of documents updated 

##### Test with cURL

PUT actions are not easy to test in the browser, so I used cURL in Terminal. 

    $ curl -i -X PUT -H 'Content-Type: application/json' -d '{"band": "BBQ Brawlers"}' http://localhost:3001/musicians/535fe13ac688500000c2b28b

This sends a JSON Content-Type PUT request to our update endpoint. That JSON object is the request body, and the long hash at the end of the URL is the id of the musician we want to update. Terminal will output a JSON object of the response to the cURL and _Updated 1 musicians_.

Visit this same URL in the browser to see the changes.

##### Add

We used `create()` earlier to add multiple documents to our Musicians Mongo collection. Our POST handler uses the same method to add one new Musician to the collection. Once added the response is the full new Musician's JSON object. 

    exports.add = function(req, res) {
      Musician.create(req.body, function (err, musician) {
        if (err) return console.log(err); 
        return res.send(musician);
      });
    }   

Use cURL to POST to the add endpoint with the full Musician JSON as the request body.

    $ curl -i -X POST -H 'Content-Type: application/json' -d '{"name": "Joe", "band": "Abita Boys", "instrument":"voice"}' http://localhost:3001/musicians 

Visit `localhost:3001/musicians` to see the new Musician at the end of the array

##### Delete

    exports.delete = function(req, res){
      var id = req.params.id;
      Musician.remove({'_id':id},function(result) {
        return res.send(result);
      });
    };

Delete reuses what we've learned above. Check it out with:

    $ curl -i -X DELETE http://localhost:3001/musicians/535feac1cc539500000a209f

## Conclusion

Setting up a REST API with Node.js and Mongo is super fast compared to back in the day with PHP and MySQL. The Express, Node and Mongoose.js documentation is all super easy to reference. There's much more powerful things you can do with routing, responses and requests and Mongo, so don't stop here. 