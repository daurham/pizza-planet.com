import { Response } from 'express';
import prisma from '../database';

export const getPizza = async (res: Response) => {
  try {
    const data = await prisma.pizza.findMany();
    res.send(data);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const postPizza = async (
  name: string,
  calories: number,
  popularity: number,
  price: string,
  instructions: string,
  notes: string,
  img: string,
  toppings: string,
  res: Response
) => {
  try {
    const success = await prisma.pizza.create({
      data: {
        name,
        popularity,
        price,
        calories,
        instructions,
        notes,
        img,
        toppings,
      },
    });
    res.send(success);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const deletePizza = async (name: string, res: Response) => {
  try {
    const success = await prisma.pizza.delete({
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

export const updatePizza = async (
  name: string,
  calories: number,
  popularity: number,
  price: string,
  instructions: string,
  notes: string,
  img: string,
  toppings: string,
  res: Response
) => {
  try {
    const success = await prisma.pizza.update({
      where: {
        name,
      },
      data: {
        calories,
        popularity,
        price,
        instructions,
        notes,
        toppings,
        img,
      },
    });
    res.send(success);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
