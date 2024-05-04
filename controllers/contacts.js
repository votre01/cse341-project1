const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Contacts']
  const result = await mongodb.getDatabase().db().collection('contacts').find();
  result.toArray().then((users) => {
    res.setHeader('Content-type', 'application/json');
    res.status(200).json(users);
  })
}

const getSingle = async (req, res) => {
  //#swagger.tags=['Contacts']
  const contactId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('contacts').find({_id: contactId});
  result.toArray().then((users) => {
    res.setHeader('Content-type', 'application/json');
    res.status(200).json(users)[0];
  })  
}

const createContact = async (req, res) => {
  //#swagger.tags=['Contacts']
  const contact = {
    email: req.body.email,
    username: req.body.username,
    name: req.body.name,
    ipaddress: req.body.ipaddress,
  };
  const response = await mongodb.getDatabase().db().collection('contacts').insertOne(contact);
  if (response.acknowledged > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || "Some error occurred while creating the contact");
  }
}

const updateContact = async (req, res) => {
  //#swagger.tags=['Contacts']
  const userId = new ObjectId(req.params.id);
  const contact = {
    email: req.body.email,
    username: req.body.username,
    name: req.body.name,
    ipaddress: req.body.ipaddress,
  };
  const response = await mongodb.getDatabase().db().collection('contacts').replaceOne(
  {_id: userId}, contact);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || "Some error occurred while updating the conatct");
  }
}

const deleteContact = async (req, res) => {
  //#swagger.tags=['Contacts']
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDatabase().db().collection('contacts').deleteOne({_id: userId});
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || "Some error occurred while deleting the contact");
  }
}

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
}