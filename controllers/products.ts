import { Request, Response } from "express";
import Product from "../model/products";
import { ProductJoiSchema } from "../middleware/validator";
import asyncHandler from "express-async-handler";

const createProduct = asyncHandler(
async (req: Request, res: Response): Promise<void> => {
  await ProductJoiSchema.validateAsync(req.body);
  let product = new Product({ ...req.body, userId: req.user.id });
  try {
    product = await product.save();
    res.send({product: product, message: "Product created successfully"});
  } catch (error) {
    res.status(500).send(error);
  }
});

const getProducts = asyncHandler(
async (req: Request, res: Response): Promise<void> => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  try {
    const products = await Product.find()
      .skip((page - 1) * limit)
      .limit(limit);
    res.send({products: products, page: page, limit: limit});
  } catch (error) {
    res.status(500).send(error);
  }
});

const getProduct = asyncHandler(
async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    if (!product) {
      res.status(404).send("The product with the given ID was not found.");
    }
    res.status(201).send({product: product});
  } catch (error) {
    res.status(500).send(error);
  }
});

const updateProduct = asyncHandler(
 async (req: Request, res: Response): Promise<void> => {
  const body = req.body;
  await ProductJoiSchema.validateAsync(body);
  const id = req.params.id;
    const findProduct = await Product.findById({_id:id});
    if (!findProduct) {
       res.status(400).json({message:"The product with the given ID was not found."});
       return;
    }
    if (findProduct.userId != req.user.id){
      res.status(401).json("You are not authorized to update this product");
      return;
    }
      const product = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
      });
     res.status(201).json({
        updated_product: product,
        message: "Product has been updated successfully",
      });
  } )

const deleteProduct = asyncHandler(
async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  try {
    const findProduct = await Product.findById(id);
    if (!findProduct){
      res.status(404).json({message:"The product with the given ID was not found."});
      return;
    }
    if (findProduct.userId != req.user.id){
      res.status(401).json({message: "You are not authorized to delete this product"});
      return;
  }
      const product = await Product.findByIdAndDelete(id);
      res
        .status(200)
        .send({
          deleted_product: product,
          message: "This Product has been deleted successfully",
        });
  } catch (error) {
    res.status(500).send(error);
  }
});

export { createProduct, getProducts, getProduct, updateProduct, deleteProduct };
