import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { TOKEN_SECRET } = process.env;
const authToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    if (authorization) {
      const token = authorization.split(' ')[1];
      jwt.verify(token, TOKEN_SECRET as unknown as string);
    } else throw new Error(`Authorization token needed`);

    next();
  } catch (error) {
    res.status(401).json(`${error}`);
  }
};

export { authToken };
