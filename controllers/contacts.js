const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDatabase().db().collection('contacts').find();
  result.toArray().then((users) => {
    res.setHeader('Content-type', 'application/json');
    res.status(200).json(users);
  })
}


const getSingle = async (req, res) => {
  const contactId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('contacts').find({_id: contactId});
  result.toArray().then((users) => {
    res.setHeader('Content-type', 'application/json');
    res.status(200).json(users)[0];
  })  
}

module.exports = {
  getAll,
  getSingle
}