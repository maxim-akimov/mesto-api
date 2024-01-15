import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import { HttpError } from 'http-errors';
import usersRouter from './routes/users';
import cardsRouter from './routes/cards';

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use((req: Request, res: Response, next: NextFunction) => {
  req.user = {
    _id: '65a4d4be0ae75f48873dbba5',
  };

  next();
});

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use((err: HttpError, req: Request, res: Response) => res
  .status(err.status || StatusCodes.INTERNAL_SERVER_ERROR)
  .send({ message: err.message || 'Ошибка сервера' }));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
