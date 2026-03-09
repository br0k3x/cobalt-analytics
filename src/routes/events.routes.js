const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/events.controller');
const validateInstance = require('../middleware/validateInstance');

// Track a new event (requires instance ID)
router.post('/:instanceId/track', validateInstance, eventsController.trackEvent);

// Batch track events (requires instance ID)
router.post('/:instanceId/batch', validateInstance, eventsController.batchTrack);

// Get events by type for an instance
router.get('/:instanceId/type/:eventType', validateInstance, eventsController.getByType);

// Get all events for an instance
router.get('/:instanceId', validateInstance, eventsController.getAll);

// Global routes (all instances - admin only)
router.get('/', eventsController.getAllGlobal);

module.exports = router;
