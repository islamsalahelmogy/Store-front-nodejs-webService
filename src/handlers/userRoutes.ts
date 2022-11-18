import { Application, Request, Response } from 'express';
import { UserStore } from '../models/users';
import { authToken } from '../middlewares/verifyTokenMiddleware';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const secret = process.env.TOKEN_SECRET;

const store_obj = new UserStore();

const index = async (_req: Request, res: Response): Promise<void> => {
  const users = await store_obj.getAll();
  res.status(200).json(users);
};

const show = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const retrieved_users = await store_obj.show(parseInt(id));
    res.status(200).json(retrieved_users);
  } catch (error) {
    res.status(500).json(error);
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  const { first_name, last_name, password } = req.body;
  try {
    const user = await store_obj.create({ first_name, last_name, password });
    const token = jwt.sign({ id: user }, secret as unknown as string);

    res.status(200).json(token);
  } catch (error) {
    res.status(400).json(error);
  }
};

const destroy = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    await store_obj.delete(parseInt(id));
    res.status(200).json({ success: ` ${id} user deleted` });
  } catch (error) {
    res.status(500).json(error);
  }
};

const userRoutes = (app: Application) => {
  app.get('/users', authToken, index);
  app.get('/users/:id', authToken, show);
  app.post('/users/signup', create);
  app.delete('/users/:id', authToken, destroy);
};

export default userRoutes;
