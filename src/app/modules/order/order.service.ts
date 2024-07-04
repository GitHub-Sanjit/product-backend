import { IOrder } from './order.interface';
import { OrderModel } from './order.model';

const createOrderIntoDB = async (orderData: IOrder) => {
  // Create a new order instance
  const order = new OrderModel(orderData);

  // Save the order to the database
  await order.save();

  // Return the saved order
  return order;
};

const getAllOrdersFromDB = async () => {
  const orders = await OrderModel.find().exec();
  return orders;
};

// Function to search orders in the database based on searchTerm
const searchOrdersFromDB = async (email: string) => {
  const orders = await OrderModel.find({ email }).exec();
  // return await OrderModel.find({
  //   email: { $regex: email, $options: 'i' },
  // });
  return orders;
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
  searchOrdersFromDB,
  // Other methods...
};
