import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { ProductRoutes } from './app/modules/product/product.routes';
import { OrderRoutes } from './app/modules/order/order.routes';
import { notFoundHandler } from './app/middleware/notFound';

const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/products', ProductRoutes);
app.use('/api/orders', OrderRoutes);


app.use(notFoundHandler);

// Error handling middleware
app.use((err: any, req: Request, res: Response) => {
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
  });
});

app.get('/', (req: Request, res: Response) => {
  res.send(`Server health is good and running well`);
});

export default app;
