// https://expressjs.com/en/guide/routing.html
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

const router = Router();

router.use((req, res, next) => {
  // console.log('req', req);
  // console.log('req.body:', req.body);
  // console.log('req.params:', req.params);
  // console.log('req.query:', req.query);
  console.log(`${req.url} Request: ${new Date().toLocaleTimeString()}`);
  // console.log(`${req.method} Request: ${new Date().toLocaleTimeString()}`);
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
