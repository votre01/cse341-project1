const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');
const validation = require('../middleware/validate');

router.get('/', contactsController.getAll);
router.get('/:id', contactsController.getSingle);

// Create new contact
router.post('/', validation.saveContact, contactsController.createContact);

// Update contact in database
router.put('/:id', validation.saveContact, contactsController.updateContact);

// Delete contact from database
router.delete('/:id', contactsController.deleteContact);

module.exports = router;