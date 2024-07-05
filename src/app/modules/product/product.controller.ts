import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import { productSchema } from './product.schema';
import { IProduct } from './product.interface';

const createProduct = async (req: Request, res: Response) => {
  try {
    const validationResult = productSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json(validationResult.error);
    }

    const productData = validationResult.data;
    const product = await ProductServices.createProductIntoDB(productData);

    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: product,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
      error: {
        code: 400,
        description: 'Failed to Create Product',
      },
    });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm;
    if (searchTerm) {
      const products = await ProductServices.searchProductsFromDB(
        searchTerm as string,
      );
      res.status(200).json({
        success: true,
        message: `Products matching search term ${searchTerm} fetched successfully!`,
        data: products,
      });
    } else {
      const products = await ProductServices.getAllProductsFromDB();
      res.status(200).json({
        success: true,
        message: 'Products fetched successfully',
        data: products,
      });
    }
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
      error: {
        code: 400,
        description: 'Failed to get Product',
      },
    });
  }
};

const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await ProductServices.getProductByIdFromDB(
      req.params.productId,
    );

    if (product) {
      res.status(200).json({
        success: true,
        message: 'Product fetched successfully',
        data: product.toJSON(),
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Product not ound',
        data: product,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: {
        code: 400,
        description: 'Failed to get Product',
      },
    });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const validationResult = productSchema.partial().safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json(validationResult.error);
    }

    const productData = validationResult.data;
    const product = await ProductServices.updateProductIntoDB(
      req.params.productId,
      productData as IProduct,
    );
    if (!product) {
      res.status(200).json({
        success: true,
        message: 'Product not found',
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Product updated successfully',
        data: product,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: {
        code: 400,
        description: 'Failed to update Product',
      },
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await ProductServices.deleteProductFromDB(
      req.params.productId,
    );
    if (!product) {
      res.status(200).json({
        success: true,
        message: 'Product not found',
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Product deleted successfully',
        data:null,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: {
        code: 500,
        description: 'Failed to delete Product',
      },
    });
  }
};

// const searchProducts = async (req: Request, res: Response) => {
//   try {
//     const searchTerm = req.query.searchTerm?.toString() || '';

//     const results = await ProductServices.searchProductsInDB(searchTerm);

//     res.status(200).json({
//       success: true,
//       message: `Products matching search term '${searchTerm}' fetched successfully!`,
//       data: results,
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Something went wrong',
//       error: error,
//     });
//   }
// };

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  // searchProducts,
};
