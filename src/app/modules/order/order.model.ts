import { Schema, model } from 'mongoose';
import { IOrder } from './order.interface';

const orderSchema = new Schema({
  email: { type: String, required: true },
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

export const OrderModel = model<IOrder>('Order', orderSchema);

// const ProductModel = model<IProduct>('Product', productSchema);

// export default ProductModel;