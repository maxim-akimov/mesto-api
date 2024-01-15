import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Card from '../models/card';
import BAD_REQUEST_ERROR from '../helpers/bad-request-error';

const createError = require('http-errors');

const cards = {
  getCard: (req: Request, res: Response, next: NextFunction) => Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw createError(StatusCodes.NOT_FOUND, 'Карточка не найдена');
      }
      res.send({ data: card });
    })
    .catch((err) => next(err)),

  getCards: (req: Request, res: Response, next: NextFunction) => Card.find({})
    .then((card) => {
      if (!card) {
        throw createError(StatusCodes.NOT_FOUND, 'Карточки не найдены');
      }
      res.send({ data: card });
    })
    .catch((err) => next(err)),

  createCard: (req: Request, res: Response, next: NextFunction) => {
    const user = req.user._id;
    const { name, link } = req.body;

    return Card.create({ name, link, owner: user })
      .then((card) => res.send(card))
      .catch(() => next(BAD_REQUEST_ERROR));
  },

  deleteCard: (req: Request, res: Response, next: NextFunction) => Card
    .findByIdAndDelete(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw createError(StatusCodes.NOT_FOUND, 'Карточка не найдена');
      }
      res.send({ data: card });
    })
    .catch((err) => next(err)),

  insertLike: (req: Request, res: Response, next: NextFunction) => Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $addToSet: {
        likes: req.user._id,
      },
    },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw createError(StatusCodes.NOT_FOUND, 'Карточка не найдена');
      }
      res.send(card);
    })
    .catch(() => next(BAD_REQUEST_ERROR)),

  deleteLike: (req: Request, res: Response, next: NextFunction) => Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $pull: {
        likes: req.user._id,
      },
    },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw createError(StatusCodes.NOT_FOUND, 'Карточка не найдена');
      }
      res.send(card);
    })
    .catch(() => next(BAD_REQUEST_ERROR)),
};

export default cards;
