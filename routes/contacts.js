const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');

router.get('/', contactsController.getAll);
router.get('/:id', contactsController.getSingle);

// Create new contact
router.post('/', contactsController.createContact);

// Update contact in database
router.put('/:id', contactsController.updateContact);

// Delete contact from database
router.delete('/:id', contactsController.deleteContact);

module.exports = router;