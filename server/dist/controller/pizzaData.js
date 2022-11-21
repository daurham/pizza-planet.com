"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePizzaData = exports.deletePizzaData = exports.postPizzaData = exports.getPizzaData = void 0;
const model_1 = require("../model");
const getPizzaData = (req, res) => {
    (0, model_1.getPizza)(res);
};
exports.getPizzaData = getPizzaData;
const postPizzaData = (req, res) => {
    const { name, calories, popularity, price, instructions, notes, img } = req.body;
    (0, model_1.postPizza)(name, calories, popularity, price, instructions, notes, img, res);
};
exports.postPizzaData = postPizzaData;
const deletePizzaData = (req, res) => {
    const { name } = req.body;
    (0, model_1.deletePizza)(name, res);
};
exports.deletePizzaData = deletePizzaData;
const updatePizzaData = (req, res) => {
    const { name, calories, popularity, price, instructions, notes, img } = req.body;
    (0, model_1.updatePizza)(name, calories, popularity, price, instructions, notes, img, res);
};
exports.updatePizzaData = updatePizzaData;
