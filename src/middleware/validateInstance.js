const instancesStore = require('../data/instancesStore');

const validateInstance = (req, res, next) => {
  const { instanceId } = req.params;

  if (!instanceId) {
    return res.status(400).json({
      error: { message: 'instance ID is required' }
    });
  }

  if (!/^[a-f0-9]{16}$/i.test(instanceId)) {
    return res.status(400).json({
      error: { message: 'invalid instance ID format' }
    });
  }

  if (!instancesStore.exists(instanceId)) {
    return res.status(404).json({
      error: { message: 'instance not found. Register at POST /api/instances/register' }
    });
  }

  next();
};

module.exports = validateInstance;
