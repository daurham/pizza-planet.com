"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const CLIENT = path_1.default.join(__dirname, '../../client/dist');
const PORT = process.env.PORT || 3000;
const URL = `http://localhost:${PORT}`;
app.use(express_1.default.static(CLIENT));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use('/', routes_1.default);
app.listen(PORT, () => console.log(`Running at ${URL}`));
