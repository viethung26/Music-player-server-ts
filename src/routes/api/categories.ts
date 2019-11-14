const route = require('express').Router()
import data from '../../../assets/data.json'

route.get('/', (req, res) => {
    res.json(data.categories)
})

module.exports = route