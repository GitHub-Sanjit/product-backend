// import mongoose, { Schema } from 'mongoose';
// import { Inventory, Product, Variant } from './product.interface';

// // Define the structure for a Variant
// const VariantSchema = new Schema<Variant>({
//   type: { type: String, required: true },
//   value: { type: String, required: true }
// });

// // Define the structure for Inventory
// const InventorySchema = new Schema<Inventory>({
//   quantity: { type: Number, required: true },
//   inStock: { type: Boolean, required: true }
// });

// // Define the structure for the main Product
// const ProductSchema = new Schema<Product>({
//   name: { type: String, required: true },
//   description: { type: String, required: true },
//   price: { type: Number, required: true },
//   category: { type: String, required: true },
//   tags: { type: [String], required: true },
//   variants: { type: [VariantSchema], required: true },
//   inventory: { type: InventorySchema, required: true }
// });

// // Create the Mongoose model
// export const ProductModel = mongoose.model<Product>('Product', ProductSchema);
