"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const KittenSchema = new mongoose_1.default.Schema({
    name: String,
    age: Number
}, { timestamps: true });
const Kitten = mongoose_1.default.model('Kitten', KittenSchema);
exports.create = (name, age, callback) => {
    Kitten.create({ name, age }).then(doc => {
        callback(doc);
    }).catch(console.error);
};
//# sourceMappingURL=Kitten.js.map