import { Request, Response } from 'express';
import { getTopping, postTopping, deleteTopping, updateTopping } from '../model';

export const getToppingData = (req: Request, res: Response) => {
  getTopping(res);
};
export const postToppingData = (req: Request, res: Response) => {
  const { name, price, pricingMeasurement, img } = req.body;
  postTopping(name, price, pricingMeasurement, img, res);
};
export const deleteToppingData = (req: Request, res: Response) => {
  const { name } = req.body;
  deleteTopping(name, res);
};
export const updateToppingData = (req: Request, res: Response) => {
  const { name, price, pricingMeasurement, img } = req.body;
  updateTopping(name, price, pricingMeasurement, img, res);
};
