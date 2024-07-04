import { z } from 'zod';

// Define the Zod schema
export const orderSchema = z.object({
  email: z.string().email(), // Validate that email is a non-empty string and a valid email format
  productId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId'), // Validate that productId is a valid ObjectId string
  price: z.number().positive(), // Validate that price is a positive number
  quantity: z.number().positive().int(), // Validate that quantity is a positive integer
});