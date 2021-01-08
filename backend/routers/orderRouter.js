const express = require('express');
const expressAsyncHandler = require('express-async-handler');

const { isAuth } = require('../utils');

const orderRouter = express.Router();

orderRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.body.orderItems.length === 0) {
      res.status(400).send({ message: 'Cart is Empty!' });
    } else {
      const order = new order({ ...req.body, user: req.user._id });
      const createdOrder = await order.save();
      res
        .status(201)
        .send({ message: 'New Order Created!', order: createdOrder });
    }
  })
);

module.exports = orderRouter;
