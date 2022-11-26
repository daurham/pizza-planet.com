import { Response } from 'express';
import prisma from '../database';

export const getTopping = async (res: Response) => {
  try {
    const data = await prisma.topping.findMany();
    res.send(data);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const postTopping = async (
  name: string,
  price: string,
  pricingMeasurement: string,
  img: string,
  res: Response
) => {
  try {
    const success = await prisma.topping.create({
      data: {
        name,
        price,
        pricingMeasurement,
        img,
      },
    });
    res.send(success);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const deleteTopping = async (name: string, res: Response) => {
  try {
    const success = await prisma.topping.delete({
      where: {
        name,
      },
    });
    res.send(success);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const updateTopping = async (
  name: string,
  price: string,
  pricingMeasurement: string,
  img: string,
  res: Response
) => {
  try {
    const success = await prisma.topping.update({
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
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
