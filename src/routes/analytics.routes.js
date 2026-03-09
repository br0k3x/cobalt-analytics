const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analytics.controller');
const validateInstance = require('../middleware/validateInstance');

// Per-instance analytics
router.get('/:instanceId/summary', validateInstance, analyticsController.getSummary);
router.get('/:instanceId/range', validateInstance, analyticsController.getByDateRange);
router.get('/:instanceId/top', validateInstance, analyticsController.getTopMetrics);
router.get('/:instanceId/realtime', validateInstance, analyticsController.getRealtime);

// Global analytics (all instances)
router.get('/summary', analyticsController.getSummary);
router.get('/range', analyticsController.getByDateRange);
router.get('/top', analyticsController.getTopMetrics);
router.get('/realtime', analyticsController.getRealtime);

module.exports = router;
