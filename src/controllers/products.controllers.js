import Product from '../models/Product.js';

export const createProduct = async (req, res) => {
  const { name, category, price, imgURL } = req.body;
  const errors = [];
  
  if (!name) errors.push(({ message: 'Please insert a name.' }));
  if (!category) errors.push(({ message: 'Please insert a category.' }));
  if (!price) errors.push(({ message: 'Please insert a price.' }));
  if (!img) errors.push(({ message: 'Please insert an image.' }));
  
  if (errors.length > 0) return res.json({
    errors,
    name,
    category,
    price,
    imgURL
  });
  
  try {
    const newProduct = new Product({ name, category, price, imgURL });
    const savedProduct = await newProduct.save();
    if (!savedProduct) return res.status(500).json({ error: 'Something went wrong.' });
    res.status(201).json(savedProduct);
  } catch (error) {
    console.log(error.stack);
    return res.status(500).json({ error: 'Something went wrong.' });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products) return res.json([]);
    else res.json(products);
  } catch (error) {
    console.log(error.stack);
    return res.status(500).json({ error: 'Something went wrong.' });
  }
};

export const getProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) return res.json({});
    else return res.json(product);
  } catch (error) {
    console.log(error.stack);
    return res.status(500).json({ error: 'Something went wrong.' });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, {
      new: true
    });
    return res.json(updatedProduct);
  } catch (error) {
    console.log(error.stack);
    return res.status(500).json({ error: 'Something went wrong.' });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    return res.json(deletedProduct);
  } catch (error) {
    console.log(error.stack);
    return res.status(500).json({ error: 'Something went wrong.' });
  }
};
