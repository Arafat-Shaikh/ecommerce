const { User } = require("../model/User");

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.user;
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
    let modifiedUser = [];
    for (let user of users) {
      const { email, role, addresses } = user;
      modifiedUser.push({
        email: email,
        role: role,
        addresses: addresses,
      });
      console.log(modifiedUser);
    }
    res.status(201).json(modifiedUser);
  } catch (err) {
    console.log(err);
    res.status(401).json(err);
  }
};

exports.updateAdminUser = async (req, res) => {
  try {
    const { email, ...rest } = req.body;
    const user = await User.findOneAndUpdate({ email: req.body.email }, rest, {
      new: true,
    });
    console.log(user);
    res.status(201).json({ email: user.email, role: user.role });
  } catch (err) {
    console.log(err);
    res.status(401).json(err);
  }
};

exports.adminDeleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ email: req.body.email });
    const { email, role, addresses } = user;
    let modifiedUser = {
      email: email,
      role: role,
      addresses: addresses,
    };

    res.status(201).json(modifiedUser);
  } catch (err) {
    console.log(err);
    res.status(401).json(err);
  }
};
