import { ObjectId } from 'mongoose';
import express from "express";

declare global {
  namespace Express {
    interface Request {
      user: {
        _id: string | ObjectId;
      };
    }
  }
}
