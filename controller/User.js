const { User } = require("../model/User");

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.user;
    console.log("updateId " + id);
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    console.log(user);
    res.status(201).json(user);
  } catch (err) {
    res.status(401).json(err);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.user;
    await User.findByIdAndDelete(id);
    res.status(201).json("User deleted");
  } catch (err) {
    res.status(401).json(err);
  }
};
