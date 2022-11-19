// https://expressjs.com/en/guide/routing.html
import { Router } from 'express';
// import {
//   deleteMovieData,
//   getMovieData,
//   postMovieData,
//   checkUserData,
//   postUserData,
//   updateMovieData,
//   getFoodData,
//   postFoodData,
//   deleteFoodData,
//   updateFoodData,
// } from '../controller';

const router = Router();

router.use((req, res, next) => {
  // console.log('req', req);
  // console.log('req.body', req.body);
  // console.log('req.p', req.params);
  console.log(`${req.method} Request: ${new Date().toLocaleTimeString()}`);
  next();
});

// router.get('/movie', getMovieData);
// router.post('/movie', postMovieData);
// router.delete('/movie', deleteMovieData);
// router.patch('/movie', updateMovieData);

// router.post('/user/Auth', checkUserData);
// router.post('/user', postUserData);

// router.get('/food', getFoodData);
// router.post('/food', postFoodData);
// router.delete('/food', deleteFoodData);
// router.patch('/food', updateFoodData);

export default router;
