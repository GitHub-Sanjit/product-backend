import { Request, Response } from 'express';
import { OrderServices } from './order.service';

const createOrder = async (req: Request, res: Response) => {
  try {
    const { email, productId, price, quantity } = req.body;

    const newOrder = await OrderServices.createOrder({
      email,
      productId,
      price,
      quantity,
    });

    res.status(201).json({
      success: true,
      message: 'Order created successfully!',
      data: newOrder,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    });
  }
};

export const OrderControllers = {
  createOrder,
  // Other methods...
};
