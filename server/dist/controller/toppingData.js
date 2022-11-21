"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateToppingData = exports.deleteToppingData = exports.postToppingData = exports.getToppingData = void 0;
const model_1 = require("../model");
const getToppingData = (req, res) => {
    (0, model_1.getTopping)(res);
};
exports.getToppingData = getToppingData;
const postToppingData = (req, res) => {
    const { name, price, pricingMeasurement, img } = req.body;
    (0, model_1.postTopping)(name, price, pricingMeasurement, img, res);
};
exports.postToppingData = postToppingData;
const deleteToppingData = (req, res) => {
    const { name } = req.body;
    (0, model_1.deleteTopping)(name, res);
};
exports.deleteToppingData = deleteToppingData;
const updateToppingData = (req, res) => {
    const { name, price, pricingMeasurement, img } = req.body;
    (0, model_1.updateTopping)(name, price, pricingMeasurement, img, res);
};
exports.updateToppingData = updateToppingData;
