import { OrderModel } from './order.model';
import { Order } from './order.interface';

export const createOrder = async (orderData: Order) => {
  const newOrder = new OrderModel(orderData);
  await newOrder.save();
  return newOrder.toObject(); // Convert to plain JavaScript object
};

export const OrderServices = {
  createOrder,
  // Other methods...
};
