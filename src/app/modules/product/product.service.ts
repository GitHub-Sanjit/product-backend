import { IProduct } from './product.interface';
import ProductModel from './product.model';


const createProductIntoDB = async (productData: IProduct) => {
  const product = new ProductModel(productData);
  return await product.save();
};

const getAllProductsFromDB = async () => {
  return await ProductModel.find();
};

const searchProductsFromDB = async (searchTerm: string) => {
  return await ProductModel.find({
    name: { $regex: searchTerm, $options: 'i' },
  });
};

const getProductByIdFromDB = async (productId: string) => {
  return await ProductModel.findById({ _id: productId });
};


const updateProductIntoDB = async (
  productId: string,
  productData: IProduct,
) => {
  return await ProductModel.findByIdAndUpdate(productId, productData, {
    new: true,
  });
};


const deleteProductFromDB = async (productId: string) => {
  return await ProductModel.findByIdAndDelete({ _id: productId });
};

  export const searchProductsInDB = async (searchTerm: string) => {
    const regex = new RegExp(searchTerm, 'i'); // 'i' makes it case-insensitive
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


  // Function to check inventory
  const checkInventory = async (productId: string, orderQuantity: number) => {
    const product = await ProductModel.findById(productId).exec();
    if (!product) {
      throw new Error('Product not found');
    }
    if (product.inventory.quantity < orderQuantity) {
      const error: any = new Error('Insufficient quantity available in inventory');
      error.code = 'INSUFFICIENT_STOCK';
      throw error;
    }
    return product;
  };

// Function to update inventory after order creation
const updateInventory = async (productId: string, orderQuantity: number) => {
  const product = await ProductModel.findById(productId).exec();
  if (!product) {
    throw new Error('Product not found');
  }

  product.inventory.quantity -= orderQuantity;
  product.inventory.inStock = product.inventory.quantity > 0;

  await product.save();
  return product;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  searchProductsFromDB,
  getProductByIdFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
  checkInventory,
  updateInventory,
  // searchProductsInDB,
};
