import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import User from '../models/user';
import BAD_REQUEST_ERROR from '../helpers/bad-request-error';

const createError = require('http-errors');

const users = {
  getUser: (req: Request, res: Response, next: NextFunction) => User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw createError(StatusCodes.NOT_FOUND, 'Пользователь не найден');
      }
      res.send({ data: user });
    })
    .catch((err) => next(err)),

  getUsers: (req: Request, res: Response, next: NextFunction) => User.find({})
    .then((user) => {
      if (!user) {
        throw createError(StatusCodes.NOT_FOUND, 'Пользователи не найдены');
      }
      res.send({ data: user });
    })
    .catch((err) => next(err)),

  createUser: (req: Request, res: Response, next: NextFunction) => {
    const { name, about, avatar } = req.body;

    return User.create({ name, about, avatar })
      .then((user) => res.send(user))
      .catch(() => next(BAD_REQUEST_ERROR));
  },

  updateUser: (req: Request, res: Response, next: NextFunction) => {
    const { name, about } = req.body;

    return User.findByIdAndUpdate(
      req.user._id,
      {
        name, about,
      },
      { new: true },
    )
      .then((user) => {
        if (!user) {
          throw createError(StatusCodes.NOT_FOUND, 'Пользователь не найден');
        }
        res.send({ data: user });
      })
      .catch(() => next(BAD_REQUEST_ERROR));
  },

  updateUserAvatar: (req: Request, res: Response, next: NextFunction) => User.findByIdAndUpdate(
    req.user._id,
    {
      avatar: req.body.avatar,
    },
    { new: true },
  )
    .then((user) => {
      if (!user) {
        throw createError(StatusCodes.NOT_FOUND, 'Пользователи не найдены');
      }
      res.send({ data: user });
    })
    .catch(() => next(BAD_REQUEST_ERROR)),
};

export default users;
