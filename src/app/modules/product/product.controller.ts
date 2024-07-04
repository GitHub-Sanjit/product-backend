import { Request, Response } from 'express';
import { ProductServices } from './product.service';

const createProduct = async (req: Request, res: Response) => {
  try {
    const { product : productData } = req.body;
    const result = await ProductServices.createProductIntoDB(productData);

    res.status(200).json({
      success: true,
      message: 'product is created successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};


const getAllProducts = async (req: Request, res: Response) => {
    try {
      const result = await ProductServices.getAllProductFromDB()
  
      res.status(200).json({
        success: true,
        message: 'Products are retrieved successfully!',
        data: result,
      })
    } catch (error) {
        console.log(error);
    }
  }

export const ProductControllers = {
  createProduct,
  getAllProducts,
};
