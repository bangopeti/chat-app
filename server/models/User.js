const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      minimum: 3,
      maximum: 20,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    profilePicture: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      max: 150,
    },
    city: {
      type: String,
      max: 25,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
