const express = require('express');
const router = express.Router();
const instancesController = require('../controllers/instances.controller');

// Register a new instance (get tracking ID)
router.post('/register', instancesController.register);

// Get instance info
router.get('/:instanceId', instancesController.getInstance);

// Get all instances
router.get('/', instancesController.getAll);

// Delete an instance
router.delete('/:instanceId', instancesController.deleteInstance);

module.exports = router;
