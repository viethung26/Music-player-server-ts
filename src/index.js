var path = require('path');
var mongoose = require('mongoose');
var express = require('express');
var app = express();
var PORT = 8080;
var bodyParser = require('body-parser');
var routes = require('./routes');
mongoose.connect('mongodb://localhost:27017/music-player', { useNewUrlParser: true });
app.use(express.static('public'));
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes);
app.listen(PORT, function () {
    console.info("app is listening in port " + PORT + "...");
});
