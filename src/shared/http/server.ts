import 'reflect-metadata';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import '@shared/typeorm';
import uploadConfig from '@config/upload';
import ratelimiter from '@shared/http/middlewares/rateLimiter';

const app = express();

app.use(cors());
app.use(express.json());

app.use(ratelimiter);

app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use(errors());

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      // instanceof - significa que ele veio da nossa classe
      return response
        .status(error.statusCode)
        .json({ status: 'error', message: error.message });
    }
    return response
      .status(500)
      .json({ status: 'error', message: 'Internal server error' });
  },
); // tratamento de erro

app.listen(3333, () => {
  console.log('servidor rodando na porta 3333');
});
