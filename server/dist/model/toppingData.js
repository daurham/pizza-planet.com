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
exports.updateTopping = exports.deleteTopping = exports.postTopping = exports.getTopping = void 0;
const database_1 = __importDefault(require("../database"));
const getTopping = (res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield database_1.default.topping.findMany();
        res.send(data);
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});
exports.getTopping = getTopping;
const postTopping = (name, price, pricingMeasurement, img, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const success = yield database_1.default.topping.create({
            data: {
                name,
                price,
                pricingMeasurement,
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
exports.postTopping = postTopping;
const deleteTopping = (name, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const success = yield database_1.default.topping.delete({
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
exports.deleteTopping = deleteTopping;
const updateTopping = (name, price, pricingMeasurement, img, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const success = yield database_1.default.topping.update({
            where: {
                name,
            },
            data: {
                price,
                pricingMeasurement,
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
exports.updateTopping = updateTopping;
