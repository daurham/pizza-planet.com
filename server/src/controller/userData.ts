import { Request, Response } from 'express';
import { findUser, authenticateUser, postUser } from '../model';

/* A request is made to authenticate the user */
export const authenticateUserLogin = (req: Request, res: Response) => {
  const { email, password } = req.body;
  authenticateUser(email, password, res);
};

/* After authenticating, a "GET" Request is made to get the users info */
export const logIntoUser = (req: Request, res: Response) => {
  // USE a query, although its not protected
  const email = typeof req.query.email === 'string' ? req.query.email : '';
  findUser(email, res);
};

export const postUserData = (req: Request, res: Response) => {
  const { username, email, password, role } = req.body;
  postUser(email, password, username, role, res);
};
