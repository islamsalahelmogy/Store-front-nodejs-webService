import { Application, Request, Response } from 'express';
import { OrderStore } from '../models/orders';
import { authToken } from '../middlewares/verifyTokenMiddleware';

const order = new OrderStore();

const index = async (_req: Request, res: Response) => {
  const orderes = await order.getAll();
  res.status(200).json(orderes);
};

const show = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const retrieved_order = await order.show(id);
    res.status(200).json(retrieved_order);
  } catch (error) {
    res.status(500).json(error);
  }
};

const showUserOrders = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user_orders = await order.getUserOrders(id);
    res.status(200).json(user_orders);
  } catch (error) {
    res.status(500).json(error);
  }
};

const create = async (req: Request, res: Response) => {
  const { user_id, status } = req.body;
  try {
    const created_order = await order.create(user_id);
    res.status(200).json(created_order);
  } catch (error) {
    res.status(500).json(error);
  }
};

const addProduct = async (req: Request, res: Response) => {
  const order_id: number = parseInt(req.params.id);
  const { product_id, quantity } = req.body;
  try {
    const added_product = await order.addProduct(
      order_id,
      product_id,
      quantity
    );
    res.status(200).json(added_product);
  } catch (error) {
    res.status(500).json(error);
  }
};

const destroy = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await order.delete(id);
    res.status(200).json({ success: `${id} order deleted` });
  } catch (error) {
    res.status(500).json(error);
  }
};

const orderRoutes = (app: Application) => {
  app.get('/orders', authToken, index);
  app.get('/orders/:id', authToken, show);
  app.post('/orders', authToken, create);
  app.post('/orders/:id/product', authToken, addProduct);
  app.get('/orders/user/:id', authToken, showUserOrders);
  app.delete('/orders/:id', authToken, destroy);
};

export default orderRoutes;
