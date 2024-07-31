const User = require('../models/userModel');

exports.postSignup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });
    await newUser.save();
    req.session.userId = newUser._id; // Set the userId in the session
    res.redirect('/food');
  } catch (err) {
    console.error('Error signing up user:', err);
    res.status(500).send('Server error');
  }
};

exports.postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && await user.comparePassword(password)) {
      req.session.userId = user._id; // Set the userId in the session
      res.redirect('/food');
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (err) {
    console.error('Error logging in user:', err);
    res.status(500).send('Server error');
  }
};
