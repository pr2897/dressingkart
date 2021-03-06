const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const Product = require('../models/productModel');

const productRouter = express.Router();

// productRouter.get(
//   '/seed',
//   expressAsyncHandler(async (req, res) => {
//     const createdProducts = await Product.insertMany(data.products);
//     res.send({ createdProducts });
//   })
// );

productRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send({ products });
  })
);

productRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) res.send(product);
    else return res.status(404).send({ message: 'Product not found' });
  })
);

module.exports = productRouter;
