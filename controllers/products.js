"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProduct = exports.getProducts = exports.createProduct = void 0;
const products_1 = __importDefault(require("../model/products"));
const validator_1 = require("../middleware/validator");
const createProduct = async (req, res) => {
    await validator_1.ProductJoiSchema.validateAsync(req.body);
    let product = new products_1.default({ ...req.body, userId: req.user.id });
    try {
        product = await product.save();
        res.send(product);
    }
    catch (error) {
        res.status(500).send(error);
    }
};
exports.createProduct = createProduct;
const getProducts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    try {
        const products = await products_1.default.find()
            .skip((page - 1) * limit)
            .limit(limit);
        res.send(products);
    }
    catch (error) {
        res.status(500).send(error);
    }
};
exports.getProducts = getProducts;
const getProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await products_1.default.findById(id);
        if (!product) {
            res.status(404).send("The product with the given ID was not found.");
        }
        res.send(product);
    }
    catch (error) {
        res.status(500).send(error);
    }
};
exports.getProduct = getProduct;
const updateProduct = async (req, res) => {
    await validator_1.ProductJoiSchema.validateAsync(req.body);
    const id = req.params.id;
    try {
        const findProduct = await products_1.default.findById(id);
        if (!findProduct)
            res.status(404).send("The product with the given ID was not found.");
        if (findProduct.userId != req.user.id)
            res.status(401).json("You are not authorized to update this product");
        else {
            const product = await products_1.default.findByIdAndUpdate(id, req.body, {
                new: true,
            });
            res.send({
                updated_product: product,
                message: "Product has been updated successfully",
            });
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const findProduct = await products_1.default.findById(id);
        if (!findProduct)
            res.status(404).end("The product with the given ID was not found.");
        if (findProduct.userId != req.user.id)
            res.status(401).send("You are not authorized to delete this product");
        else {
            const product = await products_1.default.findByIdAndDelete(id);
            res
                .status(200)
                .send({
                deleted_product: product,
                message: "This Product has been deleted successfully",
            });
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
};
exports.deleteProduct = deleteProduct;
