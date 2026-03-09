const { v4: uuidv4 } = require('uuid');
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Instance = sequelize.define('Instance', {
  id: {
    type: DataTypes.STRING(16),
    unique: true,
    primaryKey: true
  },
  name: DataTypes.STRING,
  description: DataTypes.STRING,
  createdAt: DataTypes.STRING,
  lastEventAt: DataTypes.STRING,
  eventCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'instances',
  timestamps: false
});

exports.register = async (data) => {
  const id = uuidv4().replace(/-/g, '').slice(0, 8);
  const instance = await Instance.create({
    id,
    name: data.name || 'unnamed instance',
    description: data.description || '',
    createdAt: new Date().toISOString(),
    lastEventAt: null,
    eventCount: 0
  });
  return instance;
};

exports.getById = async (id) => {
  return Instance.findOne({ where: { id } });
};

exports.exists = async (id) => {
  const instance = await Instance.findOne({ where: { id } });
  return !!instance;
};

exports.recordEvent = async (id) => {
  await Instance.increment('eventCount', { by: 1, where: { id } });
  await Instance.update({ lastEventAt: new Date().toISOString() }, { where: { id } });
};

exports.getAll = async () => {
  return Instance.find({});
};

exports.delete = async (id) => {
  return Instance.deleteOne({ id });
};
