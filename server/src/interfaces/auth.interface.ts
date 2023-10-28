import { Request } from 'express';

export interface DataStoredInToken {
  userId: string;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUserId extends Request {
  userId: string;
}
