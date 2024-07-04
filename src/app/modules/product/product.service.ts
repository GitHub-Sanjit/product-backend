import mongoose from 'mongoose';
import { IProduct } from './product.interface';
import ProductModel from './product.model';


const createProductIntoDB = async (productData: IProduct) => {
  const product = new ProductModel(productData);
  return await product.save();
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

  export const deleteProductFromDB = async (productId: string) => {
    // Convert string to ObjectId
    await ProductModel.findByIdAndDelete(new mongoose.Types.ObjectId(productId));
    return null;
  };

  export const searchProductsInDB = async (searchTerm: string) => {
    const regex = new RegExp(searchTerm, 'i'); // 'i' makes it case-insensitive
  console.log(regex)
    const results = await ProductModel.find({
      $or: [
        { name: regex },
        { description: regex },
        { tags: regex },
      ],
    }).select({
      name: 1,
      description: 1,
      price: 1,
      category: 1,
      tags: 1,
      variants: 1,
      inventory: 1,
    });
  
    return results;
  };

export const ProductServices = {
  createProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  updateProduct,
  deleteProductFromDB,
  searchProductsInDB,
};
