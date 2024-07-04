import { ObjectId } from "mongoose";

// Defing the structure for Order
export type Order = {
    email:string;
    productId:ObjectId;
    price:number;
    quantity:number;
}