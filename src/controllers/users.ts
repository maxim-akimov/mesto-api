import { Request, Response } from 'express';
import User from '../models/user';

const users = {
  getUser: (req: Request, res: Response) => {
    return '';
  },

  getUsers: (req: Request, res: Response) => {
    return '';
  },

  createUser: (req: Request, res: Response) => {
    const { name, about, avatar } = req.body;

    return User.create({ name, about, avatar })
      .then((user) => res.send(user))
      .catch((err) => res.status(400).send(err));
  },
};

export default users;
