const path = require('path')
const express = require('express')
const app = express()
const PORT = 8080
const bodyParser = require('body-parser')
const routes = require('./routes')

app.use(express.static('public'))
app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({extended: false}))

app.use('/', routes)

app.listen(PORT, () => {
    console.info(`app is listening in port ${PORT}...`)
})
