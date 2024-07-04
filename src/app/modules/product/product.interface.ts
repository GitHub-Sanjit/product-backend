import mongoose, { Model } from "mongoose";

// Define the structure for a Variant
export type Variant = {
  type: string; // e.g., "Color"
  value: string; // e.g., "Midnight Blue"
};

// Define the structure for Inventory
export type Inventory = {
  quantity: number; // e.g., 50
  inStock: boolean; // e.g., true
};

// Define the structure for the main Product
export type Product = {
  name: string; // e.g., "iPhone 13"
  description: string; // e.g., "A sleek and powerful smartphone with cutting-edge features."
  price: number; // e.g., 999
  category: string; // e.g., "Electronics"
  tags: string[]; // e.g., ["smartphone", "Apple", "iOS"]
  variants: Variant[]; // List of variants
  inventory: Inventory; // Inventory information
};

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
interface ProductModel extends Model<Product> {
    // eslint-disable-next-line no-unused-vars
    isProductExist(productId: string | mongoose.Types.ObjectId): Promise<boolean>;
  }
