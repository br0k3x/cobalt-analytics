const analyticsService = require('../services/analytics.service');

exports.getSummary = async (req, res, next) => {
  try {
    const { instanceId } = req.params;
    const summary = await analyticsService.getSummary(instanceId);
    res.json(summary);
  } catch (error) {
    next(error);
  }
};

exports.getByDateRange = async (req, res, next) => {
  try {
    const { instanceId } = req.params;
    const { startDate, endDate } = req.query;
    const data = await analyticsService.getByDateRange(startDate, endDate, instanceId);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

exports.getTopMetrics = async (req, res, next) => {
  try {
    const { instanceId } = req.params;
    const { limit = 10, metric } = req.query;
    const data = await analyticsService.getTopMetrics(metric, parseInt(limit), instanceId);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

exports.getRealtime = async (req, res, next) => {
  try {
    const { instanceId } = req.params;
    const data = await analyticsService.getRealtime(instanceId);
    res.json(data);
  } catch (error) {
    next(error);
  }
};
