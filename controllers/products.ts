import { Request, Response } from "express";
import Product from "../model/products";
import { ProductJoiSchema } from "../middleware/validator";
const createProduct = async (req: Request, res: Response): Promise<void> => {
  await ProductJoiSchema.validateAsync(req.body);
  let product = new Product({ ...req.body, userId: req.user.id });
  try {
    product = await product.save();
    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getProducts = async (req: Request, res: Response): Promise<void> => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  try {
    const products = await Product.find()
      .skip((page - 1) * limit)
      .limit(limit);
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getProduct = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    if (!product) {
      res.status(404).send("The product with the given ID was not found.");
    }
    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateProduct = async (req: Request, res: Response): Promise<void> => {
  await ProductJoiSchema.validateAsync(req.body);
  const id = req.params.id;
  try {
    const findProduct = await Product.findById(id);
    if (!findProduct)
      res.status(404).send("The product with the given ID was not found.");
    if (findProduct.userId != req.user.id)
      res.status(401).json("You are not authorized to update this product");
    else {
      const product = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.send({
        updated_product: product,
        message: "Product has been updated successfully",
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  try {
    const findProduct = await Product.findById(id);
    if (!findProduct)
      res.status(404).end("The product with the given ID was not found.");
    if (findProduct.userId != req.user.id)
      res.status(401).send("You are not authorized to delete this product");
    else {
      const product = await Product.findByIdAndDelete(id);
      res
        .status(200)
        .send({
          deleted_product: product,
          message: "This Product has been deleted successfully",
        });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
export { createProduct, getProducts, getProduct, updateProduct, deleteProduct };
