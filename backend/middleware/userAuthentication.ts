import { compare, genSalt, hash } from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import { User } from '../models';
import { RequestWithLocals } from '../types/global';
import {
  authenticateAccessToken,
  authenticateRefreshToken,
} from '../utils/utils';

// For generate the hashed password
const passwordHashingHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password } = req.body;
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);
    req.body.password = hashedPassword;
    next();
  } catch (error) {
    console.log(error);
  }
};

// For check the user password
const comparePassword = async (
  req: RequestWithLocals,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(403).json({
        message: 'Please enter the email and password',
        refreshToken: null,
        accessToken: null,
      });
    }
    const user = await User.findOne({ email });
    const isAuthenticated = await compare(password, user?.password!);
    req.locals = {
      isAuthenticated,
    };
    next();
  } catch (error) {
    console.log(error);
  }
};

// middle ware for authenticate an user
const authenticateUser = async (
  req: RequestWithLocals,
  res: Response,
  next: NextFunction
) => {
  try {
    const { accessToken } = req.cookies;
    const { refreshToken } = req.session;
    const { isAuthenticated, email } = authenticateAccessToken(accessToken);
    if (isAuthenticated!) {
      req.locals = { email };
      next();
    } else {
      const { email, newAccessToken } = authenticateRefreshToken(refreshToken);
      if (newAccessToken!) {
        req.locals = { email };
        res.cookie('accessToken', newAccessToken, {
          httpOnly: true,
          maxAge: 60 * 60 * 1000,
        });
        next();
      } else {
        res
          .status(403)
          .json({ message: 'Please do login to access the data', user: null });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

export { authenticateUser, comparePassword, passwordHashingHandler };
