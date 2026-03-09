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

exports.getSummary = async (instanceId = null) => {
  const where = instanceId ? { instanceId } : {};
  const events = await Event.findAll({ where, limit: 10000 });
  const total = await Event.count({ where });
  const eventsByType = {};
  const eventsByDay = {};
  for (const event of events) {
    eventsByType[event.type] = (eventsByType[event.type] || 0) + 1;
    const day = event.timestamp.split('T')[0];
    eventsByDay[day] = (eventsByDay[day] || 0) + 1;
  }
  return {
    instanceId,
    totalEvents: total,
    uniqueTypes: Object.keys(eventsByType).length,
    eventsByType,
    eventsByDay,
    lastUpdated: new Date().toISOString()
  };
};

exports.getByDateRange = async (startDate, endDate, instanceId = null) => {
  const where = instanceId ? { instanceId } : {};
  const events = await Event.findAll({ where, limit: 10000 });
  const start = new Date(startDate);
  const end = new Date(endDate);
  const filtered = events.filter(event => {
    const eventDate = new Date(event.timestamp);
    return eventDate >= start && eventDate <= end;
  });
  const eventsByType = {};
  for (const event of filtered) {
    eventsByType[event.type] = (eventsByType[event.type] || 0) + 1;
  }
  return {
    instanceId,
    startDate,
    endDate,
    totalEvents: filtered.length,
    eventsByType,
    events: filtered.slice(0, 100)
  };
};

exports.getTopMetrics = async (metric = 'events', limit = 10, instanceId = null) => {
  const query = instanceId ? { instanceId } : {};
  const events = await Event.find(query).limit(10000);
  let metrics = {};
  switch (metric) {
    case 'users':
      for (const event of events) {
        if (event.userId) {
          metrics[event.userId] = (metrics[event.userId] || 0) + 1;
        }
      }
      break;
    case 'pages':
      for (const event of events) {
        if (event.properties && event.properties.page) {
          metrics[event.properties.page] = (metrics[event.properties.page] || 0) + 1;
        }
      }
      break;
    case 'events':
    default:
      for (const event of events) {
        const key = `${event.type}:${event.name || 'unnamed'}`;
        metrics[key] = (metrics[key] || 0) + 1;
      }
  }
  const sorted = Object.entries(metrics)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([name, count]) => ({ name, count }));
  return {
    instanceId,
    metric,
    limit,
    results: sorted
  };
};

exports.getRealtime = async (instanceId = null) => {
  const query = instanceId ? { instanceId } : {};
  const events = await Event.find(query).sort({ timestamp: -1 }).limit(1000);
  const total = await Event.countDocuments(query);
  const now = new Date();
  const oneMinuteAgo = new Date(now - 60000);
  const fiveMinutesAgo = new Date(now - 300000);
  const oneHourAgo = new Date(now - 3600000);
  const lastMinute = events.filter(e => new Date(e.timestamp) >= oneMinuteAgo).length;
  const lastFiveMinutes = events.filter(e => new Date(e.timestamp) >= fiveMinutesAgo).length;
  const lastHour = events.filter(e => new Date(e.timestamp) >= oneHourAgo).length;
  const activeSessions = new Set(
    events
      .filter(e => new Date(e.timestamp) >= fiveMinutesAgo && e.sessionId)
      .map(e => e.sessionId)
  ).size;
  return {
    instanceId,
    timestamp: now.toISOString(),
    totalEvents: total,
    lastMinute,
    lastFiveMinutes,
    lastHour,
    activeSessions,
    eventsPerMinute: lastFiveMinutes / 5
  };
};
