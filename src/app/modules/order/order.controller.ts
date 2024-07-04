import { Request, Response } from 'express';
import { OrderServices } from './order.service';
import { orderSchema } from './order.schema';

const createOrder = async (req: Request, res: Response) => {
  try {
    // Validate the request body against the order schema
    const validationResult = orderSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationResult.error.errors,
      });
    }
    // If validation is successful, extract the validated data
    const orderData = validationResult.data;
    // Create the order in the database
    const createdOrder = await OrderServices.createOrderIntoDB(orderData);
    // Send a success response with the created order
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
    // Send an error response if an exception occurs
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
    console.log(email)

    if (email) {
      const orders = await OrderServices.searchOrdersFromDB(email);
      res.status(200).json({
        success: true,
        message: `Orders fetched successfully for user email`,
        data: orders.map(order => ({
          email: order.email,
          productId: order.productId,
          price: order.price,
          quantity: order.quantity,
        })),
      });
    } else {
      const orders = await OrderServices.getAllOrdersFromDB();
      res.status(200).json({
        success: true,
        message: 'Orders fetched Successfully',
        data: orders,
      });
    }
  } catch (error: any) {
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
