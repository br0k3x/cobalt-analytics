const { v4: uuidv4 } = require('uuid');
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Event = sequelize.define('Event', {
  id: {
    type: DataTypes.STRING,
    unique: true,
    primaryKey: true
  },
  instanceId: DataTypes.STRING,
  type: DataTypes.STRING,
  name: DataTypes.STRING,
  properties: DataTypes.JSON,
  userId: DataTypes.STRING,
  sessionId: DataTypes.STRING,
  timestamp: DataTypes.STRING,
  metadata: DataTypes.JSON
}, {
  tableName: 'events',
  timestamps: false
});

exports.trackEvent = async (eventData) => {
  const event = await Event.create({
    id: uuidv4(),
    instanceId: eventData.instanceId,
    type: eventData.type || 'custom',
    name: eventData.name,
    properties: eventData.properties || {},
    userId: eventData.userId || null,
    sessionId: eventData.sessionId || null,
    timestamp: new Date().toISOString(),
    metadata: {
      userAgent: eventData.userAgent || null,
      ip: eventData.ip || null,
      referrer: eventData.referrer || null
    }
  });
  return {
    success: true,
    eventId: event.id,
    instanceId: event.instanceId,
    timestamp: event.timestamp
  };
};

exports.batchTrack = async (events, instanceId) => {
  const results = [];
  for (const eventData of events) {
    const result = await exports.trackEvent({ ...eventData, instanceId });
    results.push(result);
  }
  return {
    success: true,
    processed: results.length,
    instanceId,
    events: results
  };
};

exports.getByType = async (eventType, limit = 100, instanceId = null) => {
  const query = { type: eventType };
  if (instanceId) query.instanceId = instanceId;
  const events = await Event.find(query).sort({ timestamp: -1 }).limit(limit);
  return {
    type: eventType,
    instanceId,
    count: events.length,
    events
  };
};

exports.getAll = async (limit = 100, offset = 0, instanceId = null) => {
  const query = instanceId ? { instanceId } : {};
  const events = await Event.find(query).sort({ timestamp: -1 }).skip(offset).limit(limit);
  const total = await Event.countDocuments(query);
  return {
    total,
    limit,
    offset,
    instanceId,
    count: events.length,
    events
  };
};
