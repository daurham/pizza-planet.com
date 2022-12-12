// https://expressjs.com/en/guide/routing.html
// Auth0 -> https://auth0.com/docs/quickstart/backend/nodejs/interactive
import { Router } from 'express';
import {
  authenticateUserLogin,
  postUserData,
  deletePizzaData,
  getPizzaData,
  postPizzaData,
  updatePizzaData,
  getToppingData,
  postToppingData,
  deleteToppingData,
  updateToppingData,
  logIntoUser,
} from '../controller';

// dotenv.config();
const router = Router();

router.use((req, res, next) => {
  // console.log('req.body:', req.body); // Testing
  console.log(`${req.url} => ${req.method} Request: ${new Date().toLocaleTimeString()}`);
  next();
});

// Login
router.post('/user/auth', authenticateUserLogin);
router.get('/user', logIntoUser);
router.post('/user', postUserData);

// Pizza
router.get('/pizza', getPizzaData);
router.post('/pizza', postPizzaData);
router.delete('/pizza', deletePizzaData);
router.patch('/pizza', updatePizzaData);

// Topping
router.get('/topping', getToppingData);
router.post('/topping', postToppingData);
router.delete('/topping', deleteToppingData);
router.patch('/topping', updateToppingData);

export default router;
