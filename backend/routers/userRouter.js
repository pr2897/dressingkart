const express = require('express');
const expressAsyncHandler = require('express-async-handler');

const data = require('../data');
const User = require('../models/userModel');

const router = express.Router();

router.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  })
);

router.get('/', async (req, res) => {
  res.send({ data });
});
module.exports = router;
