import { Router } from 'express';
import {
  createUserHandler,
  deleteUserHandler,
  getUserHandler,
  loginUserHandler,
  logoutHandler,
  updateUserHandler,
} from '../controllers/user';
import {
  authenticateUser,
  comparePassword,
  passwordHashingHandler,
} from '../middleware/userAuthentication';

// Inits
const userRoutes = Router();

// For get single user from the users collection
userRoutes.get('/get-user', authenticateUser, getUserHandler);

// For create a single user in user collection
userRoutes.post('/register', passwordHashingHandler, createUserHandler);

// For update the user in user collection
userRoutes.put('/update-user', updateUserHandler);

// For do hard delete in user collection
userRoutes.delete('/delete-user', deleteUserHandler);

// For do login
userRoutes.post('/login', comparePassword, loginUserHandler);

// For do login
userRoutes.post('/logout', logoutHandler);
export default userRoutes;
