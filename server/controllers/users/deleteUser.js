const User = require('../../models/User');

const deleteUser = async (req, res) => {
  if (req.body.userId == req.params.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      return res.status(200).json('Account has been deleted successfully!');
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  return res.status(403).json('You can delete only your account!');
};

module.exports = deleteUser;
