import data from '../../assets/data.json'
const router = require('express').Router()
router.get('/', (req, res) => {
    res.render("index")
})
router.use('/categories', require('./api/categories'))
router.get('/products', (req, res) => {
    console.info('9779 req', req)
    res.json(data.products)
})

router.use('/upload', require('./api/upload'))

module.exports = router