import 'reflect-metadata';
import 'dotenv/config';
import cors from 'cors';
import { errors } from 'celebrate';
import 'express-async-errors';
import express, { Request, Response, NextFunction } from 'express';
import routes from './routes';
import AppError from '../../errors/AppError';

import '../../container';
import '../typeorm';

const app = express();
app.use(cors());
app.use(express.json());

app.use(routes);
app.use(errors());

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
);

app.listen(3333, () => {
  console.log('Server started at port 3333!!😉');
});
