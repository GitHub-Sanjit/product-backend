import mongoose from 'mongoose';
import { Product } from './product.interface';
import { ProductModel } from './product.model';

const createProductIntoDB = async (product: Product) => {
  const result = await ProductModel.create(product);
  return result;
};

const getAllProductFromDB = async () => {
  const result = await ProductModel.find();
  return result;
};

const getSingleProductFromDB = async (_id:string) => {
    const result = await ProductModel.findOne({ _id })
    return result
  }


  const updateProduct = async (productId: string, productData: Product) => {
    console.log(productData)
    const result = await ProductModel.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(productId) }, // Use _id for querying
      { $set: productData },
      { new: true },
    ).select({
      _id: 0,
      name: 1,
      description : 1,
      price : 1,
      category : 1,
      tags : 1,
      variants : 1,
      inventory : 1,
    })
    return result
  }

export const ProductServices = {
  createProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  updateProduct,
};
