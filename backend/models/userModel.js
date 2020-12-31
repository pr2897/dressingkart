const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'A user must have a name!'] },
    email: {
      type: String,
      required: [true, 'A user must have a email!'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'A user must have a password!'],
    },
    isAdmin: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
