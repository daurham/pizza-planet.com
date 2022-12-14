"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// https://expressjs.com/en/guide/routing.html
// Auth0 -> https://auth0.com/docs/quickstart/backend/nodejs/interactive
const express_1 = require("express");
const controller_1 = require("../controller");
// dotenv.config();
const router = (0, express_1.Router)();
router.use((req, res, next) => {
    // console.log('req.body:', req.body); // Testing
    console.log(`${req.url} => ${req.method} Request: ${new Date().toLocaleTimeString()}`);
    next();
});
// Login
router.post('/user/auth', controller_1.authenticateUserLogin);
router.get('/user', controller_1.logIntoUser);
router.post('/user', controller_1.postUserData);
// Pizza
router.get('/pizza', controller_1.getPizzaData);
router.post('/pizza', controller_1.postPizzaData);
router.delete('/pizza', controller_1.deletePizzaData);
router.patch('/pizza', controller_1.updatePizzaData);
// Topping
router.get('/topping', controller_1.getToppingData);
router.post('/topping', controller_1.postToppingData);
router.delete('/topping', controller_1.deleteToppingData);
router.patch('/topping', controller_1.updateToppingData);
exports.default = router;
