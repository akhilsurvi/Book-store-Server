const client = require('../config/db');
const { ObjectId } = require('mongodb');
const bookCollections = client.db("bookInventory").collection("books");

exports.uploadBook = async (req, res) => {
  const data = req.body;
  const result = await bookCollections.insertOne(data);
  res.send(result);
};

exports.getAllBooks = async (req, res) => {
  const query = req.query?.category ? { category: req.query.category } : {};
  const result = await bookCollections.find(query).toArray();
  res.send(result);
};

exports.getBookById = async (req, res) => {
  const id = req.params.id;
  const result = await bookCollections.findOne({ _id: new ObjectId(id) });
  res.send(result);
};

exports.updateBook = async (req, res) => {
  const id = req.params.id;
  const updateBookData = req.body;
  const filter = { _id: new ObjectId(id) };
  const updateDoc = { $set: { ...updateBookData } };
  const options = { upsert: true };
  const result = await bookCollections.updateOne(filter, updateDoc, options);
  res.send(result);
};

exports.deleteBook = async (req, res) => {
  const id = req.params.id;
  const result = await bookCollections.deleteOne({ _id: new ObjectId(id) });
  res.send(result);
};
