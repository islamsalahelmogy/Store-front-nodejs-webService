import { Application, Request, Response } from 'express';
import { authToken } from '../middlewares/verifyTokenMiddleware';
import { ProductStore } from '../models/products';

const product = new ProductStore();

const index = async (_req: Request, res: Response) => {
  const productsFinded = await product.getAll();
  res.status(200).json(productsFinded);
};

const showByCategory = async (_req: Request, res: Response) => {
  const { name } = _req.params;
  try {
    const products = await product.getProductByCategory(name);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};

const show = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const retrieved_product = await product.show(parseInt(id));
    res.status(200).json(retrieved_product);
  } catch (error) {
    res.status(500).json(error);
  }
};

const create = async (req: Request, res: Response) => {
  const { name, price, category } = req.body;
  try {
    const created_product = await product.create({
      name,
      category,
      price,
    });
    res.status(200).json(created_product);
  } catch (error) {
    res.status(400).json(error);
  }
};

const destroy = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await product.delete(parseInt(id));
    res.status(200).json({ success: ` ${id} product deleted` });
  } catch (error) {
    res.status(500).json(error);
  }
};

const productRoutes = (app: Application) => {
  app.get('/products', index);
  app.get('/products/category/:name', showByCategory);
  app.get('/products/:id', show);
  app.post('/products', authToken, create);
  app.delete('/products/:id', authToken, destroy);
};

export default productRoutes;
