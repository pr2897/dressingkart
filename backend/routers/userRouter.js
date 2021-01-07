const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

const User = require('../models/userModel');
const { generateToken } = require('../utils');

const router = express.Router();

router.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    const createdUsers = await User.insertMany({});
    res.send({ createdUsers });
  })
);

router.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        return res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
      }
    }
    res.status(401).send({ message: 'Invalid email or password' });
  })
);

router.post(
  '/register',
  expressAsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const user = new User({
      name,
      email,
      password: bcrypt.hashSync(password, 8),
    });
    const createdUser = await user.save();
    res.send({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      token: generateToken(createdUser),
    });
  })
);

module.exports = router;
