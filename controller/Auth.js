const { User } = require("../model/User");

exports.signupUser = async (req, res) => {
  try {
    console.log(req.body);
    const user = new User(req.body);
    const doc = await user.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(401).json(err);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const encryptedPassword = Buffer.from(password);
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json("Invalid User");
    }
    console.log("enc " + typeof encryptedPassword);
    console.log("str " + typeof user.password);
    if (Number(encryptedPassword) === Number(user.password)) {
      res.status(201).json("succesful");
    } else {
      res.status(401).json("Invalid User");
    }
  } catch (err) {
    res.status(401).json(err);
  }
};
