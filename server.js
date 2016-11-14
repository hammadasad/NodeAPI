//call express and define app with it
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/tumello_test');

var Podcast    = require('./app/models/podcast');


//Set server to use bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var mainRouter = express.Router();

//Routes
mainRouter.use(function(req, res, next) {
    //Insert Validation blah blah
    console.log("Middleware");
    console.log("Response params were: ");
    console.dir(res.body);
    next();
});

mainRouter.get('/', function(req, res) {
    res.json({ message: "DUMMY DATA FROM HOME PAGE"});
});


mainRouter.route('/podcasts')
    .post(function(req, res) {
        var podcast = new Podcast();
        podcast.name = req.body.name;
        podcast.host = req.body.host;
        podcast.network = req.body.network;

        //Save the podcast
        podcast.save(function(err) {
            if(err) {
                res.send(err);
            }
            res.json({ message: 'Podcast created!' });
        });
    })

    .get(function(req, res) {
        Podcast.find(function(err, podcasts) {
            if(err) {
                res.send(err);
            }
            res.json(podcasts);
        });
    });

//....more Routes

//All routes prefixed with /api
app.use('/api', mainRouter);

//Start the server
app.listen(port);
console.log("Server has started on: " + port);
