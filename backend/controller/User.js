const { User } = require("../model/User");

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.user;
    console.log("updateId " + id);
    console.log(req.body);
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

exports.fetchUserById = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);
    res.status(201).json(user);
  } catch (err) {
    res.status(401).json(err);
  }
};

exports.fetchAllUsersInfo = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(201).json(users);
  } catch (err) {
    console.log(err);
    res.status(401).json(err);
  }
};
