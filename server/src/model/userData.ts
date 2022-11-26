import { Response } from 'express';
import prisma from '../database';

export const findUser = async (email: string, res: Response) => {
  try {
    const data = await prisma.user.findFirstOrThrow({
      where: {
        email,
      },
    });
    res.send(data);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
export const authenticateUser = async (email: string, password: string, res: Response) => {
  try {
    const data = await prisma.user.findFirstOrThrow({
      where: {
        email,
        password,
      },
    });
    res.send(data);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
export const postUser = async (
  email: string,
  password: string,
  username: string,
  role: string,
  res: Response
) => {
  try {
    const success = await prisma.user.create({
      data: {
        email,
        password,
        username,
        role,
      },
    });
    res.send(success);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
