import { Request, Response } from 'express';
import { User } from '../models';
import jwt from 'jsonwebtoken';
import { RequestWithLocals } from '../types/global';
import { generateAccessToken } from '../utils/utils';
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
    console.log(error);
    res.status(500).json({ message: 'Some error is occurred' });
  }
};

// For get a single user
const getUserHandler = async (req: RequestWithLocals, res: Response) => {
  try {
    const user = await User.findOne(
      { email: req.locals.email },
      { password: 0 }
    );
    res.status(200).json({ message: 'User found successfully', user });
  } catch (error) {
    res
      .status(403)
      .json({ message: 'Please do login to access the data', user: null });
  }
};

// For update the user
const updateUserHandler = (req: Request, res: Response) => {};

// For delete a user
const deleteUserHandler = (req: Request, res: Response) => {};

// For login
const loginUserHandler = (req: RequestWithLocals, res: Response) => {
  const { body, locals } = req;
  const refreshToken = jwt.sign(body, process.env.REFRESH_TOKEN!);
  const accessToken = generateAccessToken(body);
  if (locals && locals?.isAuthenticated) {
    req.session.refreshToken = refreshToken;
    return res
      .status(200)
      .cookie('accessToken', accessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      })
      .json({
        message: 'Please enter the email and password',
        refreshToken: refreshToken,
        accessToken: accessToken,
      });
  } else {
    return res.status(403).json({
      message: 'Please enter the email and password',
      refreshToken: null,
      accessToken: null,
    });
  }
};

export {
  createUserHandler,
  getUserHandler,
  updateUserHandler,
  deleteUserHandler,
  loginUserHandler,
};
