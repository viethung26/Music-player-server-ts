import data from '../../assets/data.json'
const router = require('express').Router()

router.get('/', (req, res) => {
    res.render("index")
})
router.get('/categories', (req, res) => {
    res.json(data.categories)
})
router.get('/products', (req, res) => {
    console.info('9779 req', req)
    res.json(data.products)
})

router.post('/upload', (req, res) => {
    console.info('9779 upload', req)
    res.end('')
})

module.exports = router