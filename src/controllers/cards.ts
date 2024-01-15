import { Request, Response } from 'express';
import Card from '../models/card';

const cards = {
  getCard: (req: Request, res: Response) => {
    return '';
  },

  getCards: (req: Request, res: Response) => {
    return '';
  },

  createCard: (req: Request, res: Response) => {
    const { name, link } = req.body;

    return Card.create({ name, link })
      .then((card) => res.send(card))
      .catch((err) => res.status(400).send(err));
  },

  deleteCard: (req: Request, res: Response) => {
    return '';
  },
};

export default cards;
