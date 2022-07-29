const bcrypt = require('bcrypt');
const User = require('../../models/User');

const updateUser = async (req, res) => {
  if (req.body.userId == req.params.id) {
    if (req.body.password) {
      try {
        //checks if the new password matches the old password in the database. If yes, returns status code 400
        const user = await User.findById(req.body.userId);
        const isPasswordUnchanged = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (isPasswordUnchanged) {
          return res
            .status(400)
            .json('New password cannot match old password!');
        }

        //creates the new password's hash
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (error) {
        return res.status(500).json(error);
      }
    }
    try {
      //Updates the database with the request body data
      await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      return res.status(200).json('Account has been updated!');
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  return res
    .status(403)
    .json('You are authorized to update only your account!');
};

module.exports = updateUser;
