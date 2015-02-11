# Node.js + REST Presentation 
> A [Bespoke.js](http://markdalgleish.com/projects/bespoke.js) presentation, built with [generator-bespoke](https://github.com/markdalgleish/generator-bespoke)

#### [Demo](http://brittneykernan.github.io/noderest-presentation/)

## View slides locally

First, ensure you have the following installed:

1. [Node.js](http://nodejs.org)
2. [Bower](http://bower.io): `$ npm install -g bower`
3. [Grunt](http://gruntjs.com): `$ npm install -g grunt-cli`
4. [Mongo](http://www.mongodb.org/)

Then, install dependencies and run the preview server:

```bash
$ npm install && bower install
$ grunt 
```

### Pages
* / - presentation
* /hello - prints 'hello world'
* /musicians - root of REST API
 
## Reference
* [Express API Reference](http://expressjs.com/4x/api.html)
* [Mongoose.js API docs](http://mongoosejs.com/docs/api.html)
* [Creating a REST API using Node.js, Express, and MongoDB](http://coenraets.org/blog/2012/10/creating-a-rest-api-using-node-js-express-and-mongodb/)
* [Bespoke.js](https://github.com/markdalgleish/bespoke.js)

## TODO
4. fix livereload
5. fix so it doesnt restart node when non server files change
