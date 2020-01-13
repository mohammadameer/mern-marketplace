import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Name is required"
  },
  description: {
    type: String,
    trim: true
  },
  image: {
    data: Buffer,
    contentType: String
  },
  category: String,
  quantity: {
    type: Number,
    required: "Quantity is required"
  },
  price: {
    type: Number,
    required: "Price is required"
  },
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop"
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: Date
});

export default mongoose.model("Product", ProductSchema);
