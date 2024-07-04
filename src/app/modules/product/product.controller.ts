import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import mongoose from 'mongoose';

const createProduct = async (req: Request, res: Response) => {
  try {
    const { product: productData } = req.body;
    const result = await ProductServices.createProductIntoDB(productData);

    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getAllProductFromDB();

    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const isValidObjectId = mongoose.Types.ObjectId.isValid(productId);

    if (!isValidObjectId) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Product ID',
        error: {
          code: 400,
          description: 'Invalid Product ID format.',
        },
      });
    } else {
      const result = await ProductServices.getSingleProductFromDB(productId);
      res.status(200).json({
        success: true,
        message: 'Product fetched successfully!',
        data: result,
      });
    }
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
      error: {
        code: 400,
        description: 'Something went wrong',
      },
    });
  }
};


const updateProduct = async (req: Request, res: Response) => {
    try {
        const productId = req.params.productId;
        const isValidObjectId = mongoose.Types.ObjectId.isValid(productId);
      if (!isValidObjectId) {
        res.status(404).json({
          success: false,
          message: 'product not found',
          error: {
            code: 404,
            description: 'product not found!',
          },
        })
      } else {
        const productData = req.body
        // console.log(productData)
        const result = await ProductServices.updateProduct(productId, productData)
        console.log(result)
        res.status(200).json({
          success: true,
          message: 'product updated successfully!',
          data: result,
        })
      }
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Something went wrong',
        error: error,
      })
    }
  }

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
};
