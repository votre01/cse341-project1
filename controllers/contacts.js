const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

/*
const getAll = async (req, res) => {
  //#swagger.tags=['Contacts']
  const result = await mongodb.getDatabase().db().collection('contacts').find();
  result.toArray().then((contacts) => {
    res.setHeader('Content-type', 'application/json');
    res.status(200).json(contacts);
  });
};

*/


const getAll = (req, res) => {
  mongodb
    .getDatabase()
    .db()
    .collection('contacts')
    .find()
    .toArray((err, lists) => {
      if (err) {
        res.status(400).json({ message: err });
      }
    })
    .then((contacts) => {
      res.setHeader('Content-Type', 'application/json'),
      res.status(200).json(contacts)
    });
};


/*const getSingle = async (req, res) => {
  //#swagger.tags=['Contacts']
  const contactId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('contacts').find({_id: contactId});
  result.toArray().then((contacts) => {
    res.setHeader('Content-type', 'application/json');
    res.status(200).json(contacts)[0];
  })  
}
*/

const getSingle = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to find a contact.');
  }
  const userId = new ObjectId(req.params.id);
  mongodb
    .getDatabase()
    .db()
    .collection('contacts')
    .find({ _id: userId })
    .toArray((err, result) => {
      if (err) {
        res.status(400).json({ message: err });
      }      
    })
    .then(contacts => {
      res.setHeader('Content-Type', 'application/json'),
      res.status(200).json(contacts[0])
    });
};

const createContact = async (req, res) => {
  //#swagger.tags=['Contacts']
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
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
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
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