//call express and define app with it
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');


//Set server to use bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var mainRouter = express.Router();

//Routes
mainRouter.get('/', function(req, res) {
    res.json({ message: "DUMMY DATA FROM HOME PAGE"});
});

//....more Routes

//All routes prefixed with /api
app.use('/api', mainRouter);

//Start the server
app.listen(port);
console.log("Server has started on: " + port);
