const path = require('path')
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const PORT = 8080
const bodyParser = require('body-parser')
const routes = require('./routes')

const conn = mongoose.connect('mongodb://localhost:27017/music-player', {useNewUrlParser: true, useUnifiedTopology: true})

app.use(express.static('public'))
app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'pug')

// app.use(bodyParser.urlencoded({extended: false}))
// app.use(bodyParser.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use('/', routes)

app.listen(PORT, () => {
    console.info(`app is listening in port ${PORT}...`)
})
