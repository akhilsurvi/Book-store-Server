const jwt = require('jsonwebtoken');
const client = require('../config/db');
const userCollections = client.db("userDB").collection("users");
const bcrypt = require('bcrypt');
require('dotenv').config();

exports.signUp = async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { email, password: hashedPassword };
  const result = await userCollections.insertOne(user);
  res.send(result);
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await userCollections.findOne({ email });

  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.send({ token });
  } else {
    res.status(401).send('Invalid email or password');
  }
};
