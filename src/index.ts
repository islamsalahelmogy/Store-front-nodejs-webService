import bodyParser from 'body-parser';
import express, { Application } from 'express';
import cors from 'cors';
import loggingInMiddleware from './middlewares/loggingInMiddleware';
import userRoutes from './handlers/userRoutes';
import productRoutes from './handlers/productRoutes';
import orderRoutes from './handlers/orderRoutes';

const app: Application = express();
/**
 * using two middlewares
 * cors
 * loggingInMiddleware
 */
app.use(cors(), bodyParser.json());
app.use(loggingInMiddleware);

userRoutes(app);
orderRoutes(app);
productRoutes(app);

app.listen(process.env.PORT, () => {
  console.log(`App is listening on port ${process.env.PORT}`);
});

export default app;
