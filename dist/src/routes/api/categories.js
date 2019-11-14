"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const route = require('express').Router();
const data_json_1 = tslib_1.__importDefault(require("../../../assets/data.json"));
route.get('/', (req, res) => {
    res.json(data_json_1.default.categories);
});
module.exports = route;
//# sourceMappingURL=categories.js.map