import mongoose from "mongoose";
import Product from "../models/productModel.js";

export const getProducts = async (req, res) => {
    try {
        const product = await Product.find({});
        res.status(200).json({ success: true, data: product })
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error!" });
    }
}

export const createManyProducts = async (req, res) => {
    const products = req.body;

    if (!Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ success: false, message: "Please provide an array of products." });
    }

    const invalidProducts = products.filter(
        (p) => !p.name || !p.price || !p.image
    );

    if (invalidProducts.length > 0) {
        return res.status(400).json({ success: false, message: "One or more products are missing required fields." });
    }

    try {
        const savedProducts = await Product.insertMany(products);
        res.status(200).json({ success: true, data: savedProducts });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: "Failed to insert products." });
    }
};

export const createProduct = async (req, res) => {
    const product = req.body;

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "Please provide all required fields." });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(200).json({ success: true, data: newProduct });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: "Service error." });
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid product ID" });
    }
    try {
        const updateProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        res.status(200).json({ success: true, data: updateProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error!" });
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid product ID" });
    }
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted successfully deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error!" });
    }

}