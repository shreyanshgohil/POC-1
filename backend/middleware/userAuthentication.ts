import { compare, genSalt, hash } from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import { User } from '../models';
import { RequestWithLocals } from './global';

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
      return res
        .status(403)
        .json({ message: 'Please enter the email and password', jwt: null });
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

const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    // jwt.verify()
  } catch (err) {
    console.log(err);
  }
};

export { authenticateUser, comparePassword, passwordHashingHandler };
