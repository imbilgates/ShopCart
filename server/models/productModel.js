import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: "string",
        required: true
    },
    price: {
        type: "number",
        required: true
    },
    image: {
        type: "string",
        required: true
    },
}, { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

export default Product;