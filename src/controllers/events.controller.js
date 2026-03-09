const eventsService = require('../services/events.service');
const instancesService = require('../services/instances.service');

exports.trackEvent = async (req, res, next) => {
  try {
    const { instanceId } = req.params;
    const eventData = { ...req.body, instanceId };
    const result = await eventsService.trackEvent(eventData);
    
    // update the instance's stats
    await instancesService.recordEvent(instanceId);
    
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

exports.batchTrack = async (req, res, next) => {
  try {
    const { instanceId } = req.params;
    const { events } = req.body;
    const result = await eventsService.batchTrack(events, instanceId);
    
    // update the instance's stats
    await instancesService.recordEvent(instanceId);
    
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

exports.getByType = async (req, res, next) => {
  try {
    const { instanceId, eventType } = req.params;
    const { limit = 100 } = req.query;
    const events = await eventsService.getByType(eventType, parseInt(limit), instanceId);
    res.json(events);
  } catch (error) {
    next(error);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const { instanceId } = req.params;
    const { limit = 100, offset = 0 } = req.query;
    const events = await eventsService.getAll(parseInt(limit), parseInt(offset), instanceId);
    res.json(events);
  } catch (error) {
    next(error);
  }
};

exports.getAllGlobal = async (req, res, next) => {
  try {
    const { limit = 100, offset = 0 } = req.query;
    const events = await eventsService.getAll(parseInt(limit), parseInt(offset));
    res.json(events);
  } catch (error) {
    next(error);
  }
};
