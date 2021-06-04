const route = require('express').Router()
route.use('/music', require('./music'))
route.use('/upload', require('./upload'))

module.exports = route