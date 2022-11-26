"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postUserData = exports.logIntoUser = exports.authenticateUserLogin = void 0;
const model_1 = require("../model");
/* A request is made to authenticate the user */
const authenticateUserLogin = (req, res) => {
    const { email, password } = req.body;
    (0, model_1.authenticateUser)(email, password, res);
};
exports.authenticateUserLogin = authenticateUserLogin;
/* After authenticating, a "GET" Request is made to get the users info */
const logIntoUser = (req, res) => {
    // USE a query, although its not protected
    const email = typeof req.query.email === 'string' ? req.query.email : '';
    (0, model_1.findUser)(email, res);
};
exports.logIntoUser = logIntoUser;
const postUserData = (req, res) => {
    const { username, email, password, role } = req.body;
    (0, model_1.postUser)(email, password, username, role, res);
};
exports.postUserData = postUserData;
