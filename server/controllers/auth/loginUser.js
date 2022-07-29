const User = require('../../models/User');
const bcrypt = require('bcrypt');

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      return res.status(404).json('User not found');
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(400).json('Wrong password');
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = loginUser;
