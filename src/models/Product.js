import mongoose from "mongoose";

const { model, Schema } = mongoose;

const Product = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  imgURL: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  versionKey: false
});

export default model('products', Product);