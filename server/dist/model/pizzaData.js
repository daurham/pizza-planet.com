"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePizza = exports.deletePizza = exports.postPizza = exports.getPizza = void 0;
const database_1 = __importDefault(require("../database"));
const getPizza = (res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield database_1.default.pizza.findMany();
        console.log('getting pizza-- SUCCESS');
        res.send(data);
    }
    catch (error) {
        console.log('getting pizza-- ERROR');
        console.error(error);
        res.sendStatus(500);
    }
});
exports.getPizza = getPizza;
const postPizza = (name, calories, popularity, price, instructions, notes, img, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const success = yield database_1.default.pizza.create({
            data: {
                name,
                popularity,
                price,
                calories,
                instructions,
                notes,
                img,
            },
        });
        res.send(success);
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});
exports.postPizza = postPizza;
const deletePizza = (name, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const success = yield database_1.default.pizza.delete({
            where: {
                name,
            },
        });
        res.send(success);
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});
exports.deletePizza = deletePizza;
const updatePizza = (name, calories, popularity, price, instructions, notes, img, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const success = yield database_1.default.pizza.update({
            where: {
                name,
            },
            data: {
                calories,
                popularity,
                price,
                instructions,
                notes,
                img,
            },
        });
        res.send(success);
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});
exports.updatePizza = updatePizza;
