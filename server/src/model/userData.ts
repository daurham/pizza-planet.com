import { Response } from 'express';
import prisma from '../database';

export const findUser = async (email: string, res: Response) => {
  try {
    console.log('finding email:', email);
    // TODO: TEST with true and fake users
    const data = await prisma.user.findFirstOrThrow({
      where: {
        email,
      },
    });
    console.log('findU: valid user-- SUCCESS', data);
    res.send(data);
  } catch (error) {
    console.log('findU: valid user-- ERROR');
    console.error(error);
    res.sendStatus(500);
  }
};
export const authenticateUser = async (email: string, password: string, res: Response) => {
  try {
    // TODO: TEST with true and fake users
    const data = await prisma.user.findFirstOrThrow({
      where: {
        email,
        password,
      },
    });
    console.log('authU: valid user-- SUCCESS:', data);
    res.send(data);
  } catch (error) {
    console.log('authU: valid user-- ERROR');
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
