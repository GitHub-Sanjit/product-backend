import { Request, Response } from 'express';
import { OrderServices } from './order.service';
import { orderSchema } from './order.schema';
import { ProductServices } from '../product/product.service';

const createOrder = async (req: Request, res: Response) => {
  try {
    const validationResult = orderSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationResult.error.errors,
      });
    }

    const orderData = validationResult.data;

    // Check inventory
    await ProductServices.checkInventory(
      orderData.productId,
      orderData.quantity,
    );

    // Create the order in the database
    const createdOrder = await OrderServices.createOrderIntoDB(orderData);

    // Update inventory
    await ProductServices.updateInventory(
      orderData.productId,
      orderData.quantity,
    );

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: {
        email: createdOrder.email,
        productId: createdOrder.productId,
        price: createdOrder.price,
        quantity: createdOrder.quantity,
      },
    });
  } catch (error: any) {
    if (error.code === 'INSUFFICIENT_STOCK') {
      return res.status(400).json({
        success: false,
        message: 'Insufficient quantity available in inventory',
      });
    }
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to Create Order',
      error: {
        code: 400,
        description: 'Failed to Create Order',
      },
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string;
    if (email) {
      const orders = await OrderServices.searchOrdersFromDB(email);
      if (orders.length===0) {
        const error: any = new Error('Order not found');
        error.code = 'ORDER_NOT_FOUND';
        throw error;
      }
      res.status(200).json({
        success: true,
        message: `Orders fetched successfully for user email!`,
        data: orders.map((order) => ({
          email: order.email,
          productId: order.productId,
          price: order.price,
          quantity: order.quantity,
        })),
      });
    } else {
      const orders = await OrderServices.getAllOrdersFromDB();
      if (orders.length===0) {
        const error: any = new Error('Order not found');
        error.code = 'ORDER_NOT_FOUND';
        throw error;
      }
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully!',
        data: orders,
      });
    }
  } catch (error: any) {
    if (error.code === 'ORDER_NOT_FOUND') {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to get Orders',
      error: {
        code: 400,
        description: 'Failed to get Orders',
      },
    });
  }
};

export const OrderControllers = {
  createOrder,
  getAllOrders,
  // Other methods...
};
