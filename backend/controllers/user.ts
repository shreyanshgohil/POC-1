import { Request, Response } from 'express';
import { User } from '../models';
import jwt from 'jsonwebtoken';
import { RequestWithLocals } from '../middleware/global';
/**
 * for create read  a single user in users collection
 * @param {Request} req
 * @param {Response} res
 * @return  {void}
 */
const createUserHandler = async (req: Request, res: Response) => {
  try {
    await User.create(req.body);
    res.status(200).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Some error is occurred' });
  }
};

// For get a single user
const getUserHandler = (req: Request, res: Response) => {};

// For update the user
const updateUserHandler = (req: Request, res: Response) => {};

// For delete a user
const deleteUserHandler = (req: Request, res: Response) => {};

// For login
const loginUserHandler = (req: RequestWithLocals, res: Response) => {
  const { body, locals } = req;
  const accessToken = jwt.sign(body, process.env.ACCESS_TOKEN!);
  if (locals && locals?.isAuthenticated) {
    req.session.jwtToken = accessToken;
    return res.status(200).json({
      message: 'Please enter the email and password',
      jwt: accessToken,
    });
  } else {
    return res
      .status(403)
      .json({ message: 'Please enter the email and password', jwt: null });
  }
};

export {
  createUserHandler,
  getUserHandler,
  updateUserHandler,
  deleteUserHandler,
  loginUserHandler,
};
