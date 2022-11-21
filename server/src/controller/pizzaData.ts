import { Request, Response } from 'express';
import  { getPizza, postPizza, deletePizza, updatePizza } from '../model'

export const getPizzaData = (req: Request, res: Response) => {
  getPizza(res);
};
export const postPizzaData = (req: Request, res: Response) => {
  const { name, calories, popularity, price, instructions, notes, img } = req.body;
  postPizza(name, calories, popularity, price, instructions, notes, img, res);
};
export const deletePizzaData = (req: Request, res: Response) => {
  const { name } = req.body;
  deletePizza(name, res);
};
export const updatePizzaData = (req: Request, res: Response) => {
  const { name, calories, popularity, price, instructions, notes, img } = req.body;
  updatePizza(name, calories, popularity, price, instructions, notes, img, res);
};