import { Schema, model } from 'mongoose';
import { IOrder } from './order.interface';

const orderSchema = new Schema({
  email: { type: String, required: true },
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

// Transform the output to remove the _id field
orderSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret._id; // Remove _id from JSON response
    delete ret.__v; // Optionally remove __v if not needed
    return ret;
  }
});

orderSchema.set('toObject', {
  transform: (doc, ret) => {
    delete ret._id; // Remove _id from object response
    delete ret.__v; // Remove __v from object response
    return ret;
  }
});

export const OrderModel = model<IOrder>('Order', orderSchema);

// const ProductModel = model<IProduct>('Product', productSchema);

// export default ProductModel;