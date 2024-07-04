import mongoose, { Schema } from "mongoose";
import { Order } from "./order.interface";

// Create the Order schema
const OrderSchema = new Schema<Order>({
    email: {
      type: String,
      required: true,
    },
    productId: {
      type: mongoose.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, 'Price cannot be negative'],
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1'],
    }
  });
  
  // Create and export the Order model
  export const OrderModel = mongoose.model<Order>('Order', OrderSchema);