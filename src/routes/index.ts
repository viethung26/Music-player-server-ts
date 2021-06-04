import data from '../../assets/data.json'
const da = require('assets/data.json')
const Music = require('../../models/Music')
const router = require('express').Router()
router.get('/', (req, res) => {
    console.info('9779 new connection')
    Music.getAll(value => {
        res.render("index", {data: value})
    })
})
router.use('/api', require('./api'))
// router.get('/api/test', (req, res) => {
//     Music.getAll(value => {
//         res.json(value)
//     })
// })
// router.use('/categories', require('./api/categories'))
// router.get('/products', (req, res) => {
//     console.info('9779 req', req)
//     res.json(data.products)
// })

// router.use('/upload', require('./api/upload'))
// router.use('/music', require('./api/music'))
module.exports = router