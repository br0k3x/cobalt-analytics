const instancesService = require('../services/instances.service');

exports.register = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const instance = await instancesService.register({ name, description });
    res.status(201).json({
      success: true,
      message: 'instance registered successfully',
      instance,
      trackingUrl: `${req.protocol}://${req.get('host')}/api/events/${instance.id}/track`
    });
  } catch (error) {
    next(error);
  }
};

exports.getInstance = async (req, res, next) => {
  try {
    const { instanceId } = req.params;
    const instance = await instancesService.getById(instanceId);
    
    if (!instance) {
      return res.status(404).json({
        error: { message: 'instance not found' }
      });
    }
    
    res.json(instance);
  } catch (error) {
    next(error);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const instances = await instancesService.getAll();
    res.json({
      count: instances.length,
      instances
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteInstance = async (req, res, next) => {
  try {
    const { instanceId } = req.params;
    const deleted = await instancesService.delete(instanceId);
    
    if (!deleted) {
      return res.status(404).json({
        error: { message: 'instance not found' }
      });
    }
    
    res.json({ success: true, message: 'instance deleted' });
  } catch (error) {
    next(error);
  }
};
