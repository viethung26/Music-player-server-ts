"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const data_json_1 = tslib_1.__importDefault(require("../../assets/data.json"));
const router = require('express').Router();
router.get('/', (req, res) => {
    res.render("index");
});
router.use('/categories', require('./api/categories'));
router.get('/products', (req, res) => {
    console.info('9779 req', req);
    res.json(data_json_1.default.products);
});
router.use('/upload', require('./api/upload'));
module.exports = router;
//# sourceMappingURL=index.js.map