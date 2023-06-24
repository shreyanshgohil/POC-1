import MongoDBSession from 'connect-mongodb-session';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import { userRoutes, companiesRoutes, reportRoutes } from './routes';
// initialization
config();
const app = express();
const MongoDbStore = MongoDBSession(session);
app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser());

const store = new MongoDbStore({
  uri: process.env.MONGO_URL!,
  collection: 'sessions',
});

app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    store,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // Session expiration time (1 day)
    },
  })
);

// Routes configuration
app.use('/user', userRoutes);
app.use('/report', reportRoutes);
app.use('/company', companiesRoutes);

mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log('connected to db');
  app.listen(process.env.PORT, () => {
    console.log(`Server is started on port ${process.env.PORT}`);
  });
});
