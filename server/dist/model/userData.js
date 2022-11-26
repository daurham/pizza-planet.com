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
exports.postUser = exports.authenticateUser = exports.findUser = void 0;
const database_1 = __importDefault(require("../database"));
const findUser = (email, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield database_1.default.user.findFirstOrThrow({
            where: {
                email,
            },
        });
        res.send(data);
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});
exports.findUser = findUser;
const authenticateUser = (email, password, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield database_1.default.user.findFirstOrThrow({
            where: {
                email,
                password,
            },
        });
        res.send(data);
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});
exports.authenticateUser = authenticateUser;
const postUser = (email, password, username, role, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const success = yield database_1.default.user.create({
            data: {
                email,
                password,
                username,
                role,
            },
        });
        res.send(success);
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});
exports.postUser = postUser;
