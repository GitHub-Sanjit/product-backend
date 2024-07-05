import { Schema, model } from 'mongoose';
import { IProduct } from './product.interface';

const variantSchema = new Schema({
  type: { type: String, required: true },
  value: { type: String, required: true },
},{_id:false});

const inventorySchema = new Schema({
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
},{_id:false});

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true },
  variants: { type: [variantSchema], required: true },
  inventory: { type: inventorySchema, required: true },
});

// Transform the output to remove the _id field
productSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret._id; // Remove _id from JSON response
    delete ret.__v; // Optionally remove __v if not needed
    return ret;
  }
});

productSchema.set('toObject', {
  transform: (doc, ret) => {
    delete ret._id; // Remove _id from object response
    delete ret.__v; // Remove __v from object response
    return ret;
  }
});

const ProductModel = model<IProduct>('Product', productSchema);

export default ProductModel;